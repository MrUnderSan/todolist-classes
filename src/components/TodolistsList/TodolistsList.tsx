import React, {FC, useEffect} from 'react'
import {AddItemForm} from '../../AddItemForm';
import {addTodo, fetchTodolists, TodolistType} from '../../store/todolists-reducer';
import {Todolist} from '../../Todolist';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../store/store';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {Navigate} from 'react-router-dom';

export const TodolistsList: FC = () => {

    const dispatch = useAppDispatch()
    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(fetchTodolists())
    }, []);

    const addTodolist = (title: string) => {
        dispatch(addTodo(title))
    }

    const renderedTodolist = todolists.map(tl => {
        return (
            <Todolist
                key={tl.id}
                todolist={tl}
            />
        )
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <AddItemForm addItem={addTodolist}/>
            <div className="todolist-wrapper">{renderedTodolist}</div>
        </div>
    )
}