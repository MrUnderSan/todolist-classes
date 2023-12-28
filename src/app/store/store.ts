import {AnyAction} from 'redux';
import {todolistsSlice} from 'entities/todolist/model/todolistsSlice';
import {ThunkAction} from 'redux-thunk';
import {appSlice} from 'app/modal/appSlice';
import {configureStore} from '@reduxjs/toolkit'
import {AuthSlice} from 'features/auth/modal/authSlice';
import {tasksReducer} from 'entities/todolist';

export const store = configureStore({
    reducer: {
        app: appSlice,
        auth: AuthSlice,
        todolists: todolistsSlice,
        tasks: tasksReducer,
    }
})

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatchType = typeof store.dispatch

// export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>

export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType, RootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store;