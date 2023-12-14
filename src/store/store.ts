import {AnyAction, combineReducers} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {ThunkAction} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {configureStore} from '@reduxjs/toolkit'
import {AuthReducer} from './auth-reducer';

export const store = configureStore({
    reducer: {
        todolists: todolistsReducer,
        tasks: tasksReducer,
        app: appReducer,
        auth: AuthReducer
    }
})

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatchType = typeof store.dispatch

// export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>

export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType, RootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store;