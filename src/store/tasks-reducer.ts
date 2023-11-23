import {v1} from 'uuid';
import {AddTodolistACType, RemoveTodolistACType, SetTodolistACType} from './todolists-reducer';
import {ModelTaskType, taskApi, TaskResponseType} from '../api/task-api';
import {AppThunk, RootStateType} from './store';

export type TaskType = TaskResponseType & {
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

const REMOVE_TASK = 'REMOVE-TASK' as const

type ActionsType =
    | addTaskACType
    | removeTaskACType
    | changeTaskTitleACType
    | changeTaskStatusACType
    | RemoveTodolistACType
    | AddTodolistACType
    | SetTodolistACType
    | setTaskACType
    | UpdateTaskACType

const initState: TasksType = {}

export const tasksReducer = (state = initState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TODOLIST': {
            return action.todolists.reduce((stateCopy, tl) => {
                // stateCopy[tl.id] = []
                // return stateCopy
                return {...stateCopy, [tl.id]: []}
            }, {...state})

            // const stateCopy = {...state}
            // action.todolists.forEach(tl => stateCopy[tl.id] = [])
            // return stateCopy
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks.map(t => ({...t, isDone: false}))}
        }
        // case 'ADD-TASK':
        //     const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
        //     return {...state, [action.payload.todolistID]: [...state[action.payload.todolistID], newTask]}
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, ...action.payload.task}
                        : t)
            }
        }
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.id)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId]
                        .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            }
        case 'REMOVE-TODOLIST':
            // const id = action.payload.id
            // const {id: [], ...rest} = state
            // return rest
            //
            // const { [action.payload.id]: [], ...rest } = Object.assign({}, state);
            // return rest

            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        case 'ADD-TODOLIST':
            return {...state, [action.payload.id]: []}
        default:
            return state
    }
}

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK' as const,
        payload: {
            todolistID,
            title
        }
    }
}

export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: REMOVE_TASK,
        payload: {
            todolistID,
            id
        }
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        payload: {
            todolistId,
            taskId,
            title
        }
    }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS' as const,
        payload: {
            todolistId,
            taskId,
            isDone
        }
    }
}

export const updateTaskAC = (todolistId: string, taskId: string, task: TaskResponseType) => {
    return {
        type: 'UPDATE-TASK' as const,
        payload: {
            todolistId,
            taskId,
            task
        }
    }
}


const setTasksAC = (todolistId: string, tasks: TaskResponseType[]) => {
    return {
        type: 'SET-TASKS',
        todolistId,
        tasks
    } as const
}

export const getTasksTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        const res = await taskApi.getTask(todolistId)
        dispatch(setTasksAC(todolistId, res.data.items))
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
        dispatch(updateTaskAC(todolistId, taskId, response.data.data.item))
    } catch (e) {
        console.warn(e)
    }
}


type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type setTaskACType = ReturnType<typeof setTasksAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>