import {Dispatch} from 'redux';
import {isAxiosError} from 'axios';
import {ErrorType} from './errorHandlerTypes';

export const handleServerError = (e: unknown, dispatch: Dispatch, changeAppError: (error: {
    appError: string
}) => any) => {
    if (isAxiosError<ErrorType>(e)) {
        console.log(e)
        const error = e.response?.data?.messages?.length ? e.response.data.messages[0] : e.message

        dispatch(changeAppError({appError: error}))
    }
    else {
        dispatch(changeAppError({appError: ((e as Error).message)}))
    }
}