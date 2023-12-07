import {AppThunk} from './store';
import {changeAppStatusAC, changeInitializedStatusAC} from './app-reducer';
import {AuthApi, LoginDataType} from '../api/auth-api';
import {handleServerAppError, handleServerError} from '../utils/error-util';
import {setTasksAC} from './tasks-reducer';
import {resetTodos, SetTodolistAC} from './todolists-reducer';

type StateType = {
    isLoggedIn: boolean
    userId: number | null
    login: string | null
}

const initState: StateType = {
    isLoggedIn: false,
    userId: null,
    login: null
}

export const authReducer = (state = initState, action: ActionsType): StateType => {
    switch (action.type) {
        case 'AUTH/LOGIN':
            return {...state, isLoggedIn: true, userId: action.userId}
        case 'AUTH/AUTH-ME':
            return {...state,  isLoggedIn: action.isLoggedIn, login: action.login, userId: action.userId}
        default:
            return state
    }
}



const loginAC = (userId: number) => ({
    type: 'AUTH/LOGIN',
    userId
} as const)

const authMeAC = (isLoggedIn: boolean, userId: number | null, login: string | null) => ({
    type: 'AUTH/AUTH-ME',
    isLoggedIn,
    userId,
    login
} as const)

export const authMe = (): AppThunk => async (dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    try {
        const res = await AuthApi.authMe()
        if (res.data.resultCode === 0) {
            dispatch(authMeAC(true, res.data.data.id, res.data.data.login))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerError(e, dispatch)
    } finally {
        dispatch(changeAppStatusAC('idle'))
        dispatch(changeInitializedStatusAC())
    }
}

export const login = (data: LoginDataType): AppThunk => async (dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    try {
        const res = await AuthApi.login(data)
        if (res.data.resultCode === 0) {
            dispatch(authMe())
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerError(e, dispatch)
    } finally {
        dispatch(changeAppStatusAC('idle'))
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    try {
        const res = await AuthApi.logout()
        if (res.data.resultCode === 0) {
            dispatch(authMeAC(false, null, null))
            dispatch(resetTodos())
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerError(e, dispatch)
    } finally {
        dispatch(changeAppStatusAC('idle'))
        dispatch(changeInitializedStatusAC())
    }
}

type ActionsType = ReturnType<typeof loginAC> | ReturnType<typeof authMeAC>