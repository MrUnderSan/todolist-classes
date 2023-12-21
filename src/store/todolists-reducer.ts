import {todolistApi, TodolistResponseType} from '../api/todolist-api';
import {handleServerAppError, handleServerError} from '../utils/error-util';
import {appActions} from './app-reducer';
import {createSlice} from '@reduxjs/toolkit';
import {createAppAsyncThunk} from '../utils/createAppAsyncThunk';

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
        resetTodolist: () => {
            return []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.map(t => ({...t, filter: 'all'}))
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const todo = state.find(tl => tl.id === action.payload.id)
                if (todo) todo.title = action.payload.title
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                const newTodo: TodolistType = {...action.payload, filter: 'all'}
                state.unshift(newTodo)
            })
            .addCase(removeTodo.fulfilled, (state, action)=> {
                const index = state.findIndex(todo => todo.id === action.payload)
                if (index !== -1) state.splice(index, 1)
            })
    }
})

const fetchTodolists = createAppAsyncThunk<TodolistResponseType[]>(
    'todolists/fetchTodolists',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(appActions.changeAppStatus({appStatus: 'loading'}))
        try {
            const res = await todolistApi.fetchTodos()
            return res.data
        } catch (e) {
            handleServerError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.changeAppStatus({appStatus: 'idle'}))
        }
    }
)

const updateTodolistTitle = createAppAsyncThunk<{ id: string, title: string }, { id: string, title: string }>(
    'todolists/updateTodolistTitle',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            const res = await todolistApi.updateTitle(arg.id, arg.title)
            if (res.data.resultCode === 0) {
                return arg
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }

        } catch (e) {
            handleServerError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)

const addTodo = createAppAsyncThunk<TodolistResponseType, string>(
    'todolists/addTodo',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(appActions.changeAppStatus({appStatus: 'loading'}))
        try {
            const res = await todolistApi.addTodo(arg)
            if (res.data.resultCode === 0) {
                return res.data.data.item
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }

        } catch (e) {
            handleServerError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(appActions.changeAppStatus({appStatus: 'idle'}))
        }
    }
)

const removeTodo = createAppAsyncThunk<string, string>(
    'todolists/removeTodo',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            const res = await todolistApi.removeTodo(arg)
            if (res.data.resultCode === 0) {
                return arg
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunk = {fetchTodolists, updateTodolistTitle, addTodo, removeTodo}