import React, {FC, useEffect} from 'react'
import {AddItemForm} from 'shared/ui/components/addItemForm/AddItemForm';
import {todolistsThunk, TodolistType} from 'entities/todolist/model/todolistsSlice';
import {Todolist} from 'widgets/todolist/Todolist';
import {useSelector} from 'react-redux';
import {RootStateType} from 'app/store/store';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'shared/hook';

export const TodolistsList: FC = () => {

    const dispatch = useAppDispatch()
    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(todolistsThunk.fetchTodolists())
    }, []);

    const addTodolist = (title: string) => {
        dispatch(todolistsThunk.addTodo(title))
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