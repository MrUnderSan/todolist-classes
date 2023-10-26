import {v1} from 'uuid';

export type TodolistType = {
    id: string
    title: string
    filter: string
}

type ActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType

const initState: TodolistType[] = []

export const todolistReducer = (state = initState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t=> t.id !== action.payload.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [newTodolist,...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t=> t.id === action.payload.id ? {...t, title: action.payload.title} : t)
        default:
            return state

    }
}

export const removeTodolistAC = (id: string) => {
  return {
      type: 'REMOVE-TODOLIST',
      payload: {
          id
      }
  } as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const addTodolistAC = (title: string) => {
  return {
      type: 'ADD-TODOLIST',
      payload: {
          id: v1(),
          title
      }
  } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        payload: {
            id,
            title
        }
    }
}

export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>