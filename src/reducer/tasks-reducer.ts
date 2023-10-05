import {TasksType} from '../App';

const REMOVE_TASK = 'REMOVE-TASK' as const

type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>

type ActionsType = addTaskACType | removeTaskACType

export const TasksReducer = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask = {id: crypto.randomUUID(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]: [state[action.payload.todolistID], newTask]}
        case REMOVE_TASK:
            return  {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.id)}
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

export const removeTaskAC = (todolistID: string, id: number) => {
    return {
        type: REMOVE_TASK,
        payload: {
            todolistID,
            id
        }
    }
}