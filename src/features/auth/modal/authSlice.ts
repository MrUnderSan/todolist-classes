import {AppThunk} from 'app/store/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/modal/appSlice';
import {todolistsActions} from 'entities/todolist/model/todolistsSlice';
import {handleServerAppError, handleServerError} from 'shared/lib';
import {AuthApi, LoginDataType} from 'features/auth/api/authApi';

type StateType = {
    isLoggedIn: boolean
    userId: number | null
    login: string | null
}

const initialState: StateType = {
    isLoggedIn: false,
    userId: null,
    login: null
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{userId: number}>) => {
            state.isLoggedIn = true
            state.userId = action.payload.userId
        },
        authMe: (state, action: PayloadAction<{isLoggedIn: boolean, userId: number | null, login: string | null}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.userId = action.payload.userId
            state.login = action.payload.login
        }
    },
})

export const AuthSlice = slice.reducer
export const AuthActions = slice.actions


export const authMe = (): AppThunk => async (dispatch) => {
    dispatch(appActions.changeAppStatus({appStatus: 'loading'}))
    try {
        const res = await AuthApi.authMe()
        if (res.data.resultCode === 0) {
            dispatch(AuthActions.authMe({isLoggedIn: true, userId: res.data.data.id, login: res.data.data.login}))
        } else {
            handleServerAppError(dispatch, res.data, appActions.changeAppError)
        }
    } catch (e) {
        handleServerError(e, dispatch, appActions.changeAppError)
    } finally {
        dispatch(appActions.changeAppStatus({appStatus: 'idle'}))
        dispatch(appActions.changeInitializedStatus())
    }
}

export const login = (data: LoginDataType): AppThunk => async (dispatch) => {
    dispatch(appActions.changeAppStatus({appStatus: 'loading'}))
    try {
        const res = await AuthApi.login(data)
        if (res.data.resultCode === 0) {
            dispatch(authMe())
        } else {
            handleServerAppError(dispatch, res.data, appActions.changeAppError)
        }
    } catch (e) {
        handleServerError(e, dispatch, appActions.changeAppError)
    } finally {
        dispatch(appActions.changeAppStatus({appStatus: 'idle'}))
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    dispatch(appActions.changeAppStatus({appStatus: 'loading'}))
    try {
        const res = await AuthApi.logout()
        if (res.data.resultCode === 0) {
            dispatch(AuthActions.authMe({isLoggedIn: false, userId: null, login: null}))
            dispatch(todolistsActions.resetTodolist())
        } else {
            handleServerAppError(dispatch, res.data, appActions.changeAppError)
        }
    } catch (e) {
        handleServerError(e, dispatch, appActions.changeAppError)
    } finally {
        dispatch(appActions.changeAppStatus({appStatus: 'idle'}))
        dispatch(appActions.changeInitializedStatus())
    }
}