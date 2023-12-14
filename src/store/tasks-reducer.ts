import {ModelTaskType, taskApi, TaskResponseType} from '../api/task-api';
import {AppThunk, RootStateType} from './store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {handleServerAppError, handleServerError} from '../utils/error-util';
import {todolistsActions} from './todolists-reducer';

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
        setTasks: (state, action: PayloadAction<{todolistId: string, tasks: TaskResponseType[]}>) => {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, isDone: t.status === 2}))
            // action.payload.tasks.forEach(t =>  state[action.payload.todolistId].push({...t, isDone: t.status === 2}))
        },
        addTask: (state, action: PayloadAction<{todolistID: string, task: TaskResponseType}>) => {
            state[action.payload.todolistID].unshift({...action.payload.task, isDone: action.payload.task.status === 2})
        },
        removeTask: (state, action: PayloadAction<{todolistID: string, taskId: string}>) => {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        },
        updateTask: (state, action: PayloadAction<{task: TaskResponseType}>) => {
            const tasks = state[action.payload.task.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.task.id)
            tasks[index] = {...action.payload.task, isDone: action.payload.task.status === 2}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach(tl =>  state[tl.id] = [])
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions


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

export type UpdateTaskType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTask = (todolistId: string, taskId: string, updateTask: UpdateTaskType): AppThunk =>
    async (dispatch, getState: () => RootStateType) => {

    const task = getState().tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
        return
    }

    const model: ModelTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...updateTask
    }

    let response
    try {
        response = await taskApi.updateTitle(todolistId, taskId, model)
        dispatch(tasksActions.updateTask({task: response.data.data.item}))

    } catch (e) {
        console.warn(e)
    }
}