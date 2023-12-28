import React, {useEffect} from 'react';
import 'app/App.css';
import {Login} from 'pages/Login/Login';
import {Route, Routes} from 'react-router-dom';
import {TodolistsList} from 'pages/TodolistsList/TodolistsList';
import {authMe, logout} from 'features/auth/modal/authSlice';
import {Button} from 'shared/ui/components/button/Button';
import {LinearLoader, Loader} from 'shared/ui/components';
import {GlobalError} from 'widgets';
import {useAppDispatch, useAppSelector} from 'shared/hook';


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
                    {appStatus === 'loading' && <LinearLoader/>}
                    <div>
                        {login && <div>{login} - <Button name={'logout'} callback={handleLogout}/></div>}
                    </div>
                    <GlobalError/>
                    <Routes>
                        <Route path={''} element={<TodolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'*'} element={<h2>Unknown page</h2>}/>
                    </Routes>
                </div>

    );
}

export default App;