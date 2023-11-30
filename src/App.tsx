import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {useSelector} from 'react-redux';
import {RootStateType} from './store/store';
import {addTodolistAC, fetchTodolists, TodolistType} from './store/todolists-reducer';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {LinearLoader} from './components/LinearLoader/LinearLoader';
import {GlobalError} from './components/GlobalError/GlobalError';


function App() {

    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)

    const appStatus = useAppSelector(state => state.app.appStatus)

    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    useEffect(() => {
        dispatch(fetchTodolists())
    }, []);

    const renderedTodolist = todolists.map(tl => {
        return (
                <Todolist
                    key={tl.id}
                    todolist={tl}
                />
        )
    })

    return (
        <div className="App">
            {appStatus === 'loading' && <LinearLoader />}
            <AddItemForm addItem={addTodolist}/>
            <div className="todolist-wrapper">
                {renderedTodolist}
            </div>
            <GlobalError />
        </div>
    );
}

export default App;