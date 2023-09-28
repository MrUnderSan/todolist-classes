import React, {KeyboardEvent, ChangeEvent, FC, useState} from 'react';
import {Task} from './Task';
import {TaskType} from './App';
import {Button} from './Button';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './components/EditableSpan';

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    changeTaskStatus: (id: number, isDone: boolean) => void
    removeTask: (todolistID: string, id: number) => void
    removeTodolist: (todolistID: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: number, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist: FC<PropsType> = (props) => {


    const removeTodolistHandler =() => {
        props.removeTodolist(props.todolistId)
    }

    const addTask = (value: string) => {
        props.addTask(props.todolistId, value)
    }

    const changeTaskTitleHandler = (taskId: number, title: string) => {
        props.changeTaskTitle(props.todolistId, taskId, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }

    return (
        <div>
            <button onClick={removeTodolistHandler}>x</button>
            <EditableSpan title={props.title} callback={changeTodolistTitleHandler} />
            <AddItemForm addItem={addTask}/>
            {props.tasks.map((ts) => {
                const removeTaskHandler = (id: number) => props.removeTask(props.todolistId, id)
                // вариант с передачей todolistId в Todolist

                return (
                    <Task
                        key={ts.id}
                        task={ts}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={removeTaskHandler}
                        changeTaskTitle={changeTaskTitleHandler}
                    />
                )
            })}

        </div>
    );
};