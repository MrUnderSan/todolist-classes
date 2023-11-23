import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {useSelector} from 'react-redux';
import {RootStateType} from './store/store';
import {addTodolistAC, fetchTodolists, TodolistType} from './store/todolists-reducer';
import {useAppDispatch} from './store/hooks';


function App() {

    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)

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
            <AddItemForm addItem={addTodolist}/>
            <div className="todolist-wrapper">
                {renderedTodolist}
            </div>

        </div>
    );
}

export default App;