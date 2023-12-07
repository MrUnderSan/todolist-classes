import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {LinearLoader} from './components/LinearLoader/LinearLoader';
import {GlobalError} from './components/GlobalError/GlobalError';
import {Login} from './components/Login/Login';
import {Route, Routes} from 'react-router-dom';
import {TodolistsList} from './components/TodolistsList/TodolistsList';
import {authMe, logout} from './store/auth-reducer';
import {Loader} from './components/Loader/Loader';
import {Button} from './Button';

function App() {

    const appStatus = useAppSelector(state => state.app.appStatus)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const login = useAppSelector(state => state.auth.login)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, []);

    const handleLogout = () => {
        dispatch(logout())
    }

    if (!isInitialized) {
        return <Loader />
    }

    return (
        <div className="App">
            {appStatus === 'loading' && <LinearLoader />}
            <div>
                {login && <div>{login} - <Button name={'logout'} callback={handleLogout} /></div>}
            </div>
            <GlobalError />
            <Routes>
                <Route path={''} element={<TodolistsList />} />
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'*'} element={<h2>Unknown page</h2>} />
            </Routes>
        </div>
    );
}

export default App;