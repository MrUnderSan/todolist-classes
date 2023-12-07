import {isAxiosError} from 'axios';
import {changeAppErrorAC} from '../store/app-reducer';
import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolist-api';

export const handleServerError = (e: unknown, dispatch: Dispatch) => {
    if (isAxiosError<ErrorType>(e)) {
        const error = e.response ? e.response.data.messages[0] : e.message
        dispatch(changeAppErrorAC(error))
    }
    else {
        dispatch(changeAppErrorAC((e as Error).message))
    }
}

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(changeAppErrorAC(data.messages[0]))
    } else {
        dispatch(changeAppErrorAC('Unknown error'))
    }
}

export type ErrorType = {
    "statusCode": number,
    "messages": string[],
    "error": string
}