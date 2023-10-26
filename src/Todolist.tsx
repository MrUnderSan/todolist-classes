import React, {FC} from 'react';
import {Task} from './Task';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {TaskType} from './store/tasks-reducer';

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    changeTaskStatus: (id: string, isDone: boolean) => void
    removeTask: (todolistID: string, id: string) => void
    removeTodolist: (todolistID: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist: FC<PropsType> = (props) => {


    const removeTodolistHandler =() => {
        props.removeTodolist(props.todolistId)
    }

    const addTask = (value: string) => {
        props.addTask(props.todolistId, value)
    }

    const changeTaskTitleHandler = (taskId: string, title: string) => {
        props.changeTaskTitle(props.todolistId, taskId, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }

    return (
        <div className='todoList'>
            <button onClick={removeTodolistHandler}>x</button>
            <EditableSpan title={props.title} callback={changeTodolistTitleHandler} />
            <AddItemForm addItem={addTask}/>
            {props.tasks.map((ts) => {
                const removeTaskHandler = (id: string) => props.removeTask(props.todolistId, id)
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