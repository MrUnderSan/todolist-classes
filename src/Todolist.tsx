import React, {FC, useEffect} from 'react';
import {Task} from './Task';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {createTask, getTasksTC, TaskType} from './store/tasks-reducer';
import {TodolistButtons} from './components/TodolistButtons';
import {useSelector} from 'react-redux';
import {RootStateType} from './store/store';
import {FilterValuesType, todolistsThunk, TodolistType} from './store/todolists-reducer';
import {useAppDispatch} from './store/hooks';

type PropsType = {
    todolist: TodolistType
}

export const Todolist: FC<PropsType> = ({todolist}) => {

    const {id, title, filter} = todolist

    let tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[id])

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(id))
    }, []);

    const removeTodolistHandler = () => {
        dispatch(todolistsThunk.removeTodo(id))
    }

    const addTask = (value: string) => {
        dispatch(createTask(id, value))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(todolistsThunk.updateTodolistTitle({id, title}))
    }

    const getTasksForRender = (tasks: TaskType[], filter: FilterValuesType) => {
        switch (filter) {
            case ('active'):
                return tasks.filter(t => !t.isDone)
            case ('completed'):
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const tasksForTodolist = getTasksForRender(tasks, filter)

    const renderedTasks = tasksForTodolist.map((ts) => {
        return (
            <Task
                key={ts.id}
                todolistId={id}
                task={ts}
            />
        )
    })

    return (
        <div className="todoList">
            <button onClick={removeTodolistHandler}>x</button>
            <EditableSpan title={title} callback={changeTodolistTitleHandler}/>
            <AddItemForm addItem={addTask}/>
            {renderedTasks}
            <TodolistButtons todolistId={id}/>
        </div>
    );
}