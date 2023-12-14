import {isAxiosError} from 'axios';
import {Dispatch} from 'redux';
import {appActions} from '../store/app-reducer';

export const handleServerError = (e: unknown, dispatch: Dispatch) => {
    if (isAxiosError<ErrorType>(e)) {
        const error = e.response ? e.response.data.messages[0] : e.message
        dispatch(appActions.changeAppError({appError: error}))
    }
    else {
        dispatch(appActions.changeAppError({appError: ((e as Error).message)}))
    }
}

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(appActions.changeAppError({appError: data.messages[0]}))
    } else {
        dispatch(appActions.changeAppError({appError: 'Unknown error'}))
    }
}

export type ErrorType = {
    "statusCode": number,
    "messages": string[],
    "error": string
}

type ResponseType<D = {}> = {
    data: D
    fieldsErrors?: string[]
    messages: string[]
    resultCode: number
}