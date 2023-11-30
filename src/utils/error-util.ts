import {isAxiosError} from 'axios';
import {changeAppErrorAC} from '../store/app-reducer';
import {Dispatch} from 'redux';

export const handleServerError = (e: unknown, dispatch: Dispatch) => {
    if (isAxiosError<ErrorType>(e)) {
        const error = e.response ? e.response.data.messages[0] : e.message
        dispatch(changeAppErrorAC(error))
    } else {
        dispatch(changeAppErrorAC((e as Error).message))
    }
}

export type ErrorType = {
    "statusCode": number,
    "messages": string[],
    "error": string
}