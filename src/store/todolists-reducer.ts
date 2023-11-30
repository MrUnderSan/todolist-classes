import {v1} from 'uuid';
import {todolistApi, TodolistResponseType} from '../api/todolist-api';
import {AppThunk} from './store';
import {changeAppStatusAC} from './app-reducer';
import {handleServerError} from '../utils/error-util';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType | SetTodolistACType

const initState: TodolistType[] = []

export const todolistReducer = (state = initState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'SET-TODOLIST':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(t=> t.id !== action.payload.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [newTodolist,...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
        }
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t =>
                t.id === action.payload.todolistId ? {...t, filter: action.payload.filter} : t)
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

export const updateTodolistTitle = (id: string, title: string): AppThunk => async (dispatch) => {
    try {
        const res = await todolistApi.updateTitle(id, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(id, title))
        } else {
            handleServerError(res.data, dispatch)
        }
    } catch (e) {
        handleServerError(e, dispatch)
    }
}

export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        payload: {
            todolistId,
            filter
        }
    }
}

export type ChangeTodolistFilterACType = ReturnType<typeof changeFilterAC>

export const SetTodolistAC = (todolists: TodolistResponseType[]) => {
    return {
        type: 'SET-TODOLIST',
        todolists
    } as const
}

export type SetTodolistACType = ReturnType<typeof SetTodolistAC>

export const fetchTodolists = (): AppThunk => async (dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    try {
        const res =  await todolistApi.fetchTodos()
        dispatch(SetTodolistAC(res.data))
    } catch (e) {
        console.warn(e)

    }
    dispatch(changeAppStatusAC('idle'))
}