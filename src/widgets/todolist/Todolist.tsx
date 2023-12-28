import React, {FC, useEffect} from 'react';
import {Task} from 'entities/todolist/ui/Task';
import {AddItemForm} from 'shared/ui/components/addItemForm/AddItemForm';
import {EditableSpan} from 'shared/ui/components/editableSpan/EditableSpan';
import {TodolistButtons} from 'features/todolistButtons/TodolistButtons';
import {useSelector} from 'react-redux';
import {RootStateType} from 'app/store/store';
import {FilterValuesType, todolistsThunk, TodolistType} from 'entities/todolist/model/todolistsSlice';
import {useAppDispatch} from 'shared/hook';
import {createTask, getTasksTC, TaskType} from 'entities/todolist';


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