import React, {useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {appActions} from '../../store/app-reducer';


export const GlobalError = () => {

    const error = useAppSelector(state => state.app.appError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        error && toast.error(error)
        dispatch(appActions.changeAppError({appError: null}))

    }, [error]);

    return (
        <div>
            <ToastContainer position="bottom-center" autoClose={3000} theme="colored"/>
        </div>
    );
}