import {Dispatch} from 'redux';
import {ResponseType} from './errorHandlerTypes';

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>, changeAppError: (error: {
    appError: string
}) => any) => {
    if (data.messages.length) {
        //dispatch(appActions.changeAppError({appError: data.messages[0]}))
        dispatch(changeAppError({appError: data.messages[0]}))
} else {
        dispatch(changeAppError({appError: 'Unknown error'}))
    }
}
