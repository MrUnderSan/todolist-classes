import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './store/store';
import {addTodolistAC, TodolistType} from './store/todolists-reducer';


function App() {

    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)

    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

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