import {v1} from 'uuid';
import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

const REMOVE_TASK = 'REMOVE-TASK' as const

type ActionsType =
    addTaskACType
    | removeTaskACType
    | changeTaskTitleACType
    | changeTaskStatusACType
    | RemoveTodolistACType
    | AddTodolistACType


const initState: TasksType = {}

export const tasksReducer = (state = initState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]: [...state[action.payload.todolistID], newTask]}
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

type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>