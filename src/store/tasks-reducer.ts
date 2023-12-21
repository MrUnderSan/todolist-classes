import {ModelTaskType, taskApi, TaskResponseType} from '../api/task-api';
import {AppThunk} from './store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {handleServerAppError, handleServerError} from '../utils/error-util';
import {todolistsThunk} from './todolists-reducer';
import {createAppAsyncThunk} from '../utils/createAppAsyncThunk';

export type TaskType = TaskResponseType & {
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksType,
    reducers: {
        setTasks: (state, action: PayloadAction<{ todolistId: string, tasks: TaskResponseType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, isDone: t.status === 2}))
            // action.payload.tasks.forEach(t =>  state[action.payload.todolistId].push({...t, isDone: t.status === 2}))
        },
        addTask: (state, action: PayloadAction<{ todolistID: string, task: TaskResponseType }>) => {
            state[action.payload.todolistID].unshift({...action.payload.task, isDone: action.payload.task.status === 2})
        },
        removeTask: (state, action: PayloadAction<{ todolistID: string, taskId: string }>) => {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsThunk.fetchTodolists.fulfilled, (state, action) => {
                action.payload.forEach(tl => state[tl.id] = [])
            })
            .addCase(todolistsThunk.addTodo.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(todolistsThunk.removeTodo.fulfilled, (state, action) => {
                delete state[action.payload]
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(t => t.id === action.payload.id)
                if (index !== -1) {
                    tasks[index] = {...action.payload, isDone: action.payload.status === 2}
                }
            })
    }
})


export const createTask = (todolistID: string, title: string): AppThunk => async (dispatch) => {
    try {
        const res = await taskApi.createTask(todolistID, title)
        if (res.data.resultCode === 0) {
            dispatch(tasksActions.addTask({todolistID, task: res.data.data.item}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerError(e, dispatch)
    }
}

export const getTasksTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        const res = await taskApi.getTask(todolistId)
        dispatch(tasksActions.setTasks({todolistId, tasks: res.data.items}))
    } catch (e) {
        console.warn(e)
    }
}

export type UpdateTaskType = Partial<ModelTaskType>

const updateTask = createAppAsyncThunk<TaskResponseType, { todolistId: string, taskId: string, model: UpdateTaskType }>(
    'tasks/updateTask',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI

        const task = getState().tasks[arg.todolistId].find(t => t.id === arg.taskId)

        if (!task) return rejectWithValue(null)

        const updateModel: ModelTaskType = {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            ...arg.model
        }

        try {
            const response = await taskApi.updateTask({
                todolistId: arg.todolistId,
                taskId: arg.taskId,
                task: updateModel
            })
            if (response.data.resultCode === 0) {
                return response.data.data.item
            } else {
                handleServerAppError(dispatch, response.data)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)


export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunk = {updateTask}