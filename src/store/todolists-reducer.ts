import {todolistApi, TodolistResponseType} from '../api/todolist-api';
import {AppThunk} from './store';
import {handleServerAppError, handleServerError} from '../utils/error-util';
import {appActions} from './app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistType[],
    reducers: {
        setTodolists: (state, action: PayloadAction<{todolists: TodolistResponseType[]}>) => {
            // action.payload.todolists.forEach(tl => state.push({...tl, filter: 'all'}))
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        },
        addTodolist: (state, action: PayloadAction<{todolists: TodolistResponseType}>) => {
            const newTodo: TodolistType = {...action.payload.todolists, filter: 'all'}
            state.unshift(newTodo)
        },
        removeTodolist: (state, action: PayloadAction<{id: string}>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index >= 0) {
                state.splice(index, 1)
            }
        },
        changeTodolistTitle: (state, action: PayloadAction<{id: string, title: string}>) => {
            const todo = state.find(tl => tl.id === action.payload.id)
            if (todo) todo.title = action.payload.title
        },
        changeTodolistFilter: (state, action: PayloadAction<{id: string, filter: FilterValuesType}>) => {
            const todo = state.find(tl => tl.id === action.payload.id)
            if (todo) todo.filter = action.payload.filter
        },
        resetTodolist: () => {
            return []
        }

    },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

export const updateTodolistTitle = (id: string, title: string): AppThunk => async (dispatch) => {
    try {
        const res = await todolistApi.updateTitle(id, title)
        if (res.data.resultCode === 0) {
            dispatch(todolistsActions.changeTodolistTitle({id, title}))

        } else {
            handleServerError(res, dispatch)
        }
    } catch (e) {
        handleServerError(e, dispatch)
    }
}

export const fetchTodolists = (): AppThunk => async (dispatch) => {
    dispatch(appActions.changeAppStatus({appStatus: 'loading'}))

    try {
        const res = await todolistApi.fetchTodos()
        dispatch(todolistsActions.setTodolists({todolists: res.data}))
    } catch (e) {
        handleServerError(e, dispatch)
    }
    dispatch(appActions.changeAppStatus({appStatus: 'idle'}))
}

export const addTodo = (title: string): AppThunk => async (dispatch) => {
    dispatch(appActions.changeAppStatus({appStatus: 'loading'}))
    try {
        const res = await todolistApi.addTodo(title)

        if (res.data.resultCode === 0) {
            dispatch(todolistsActions.addTodolist({todolists: res.data.data.item}))
        } else {
            handleServerAppError(dispatch, res.data)
        }

    } catch (e) {
        handleServerError(e, dispatch)
    }
    dispatch(appActions.changeAppStatus({appStatus: 'idle'}))
}