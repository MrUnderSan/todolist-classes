import React, {FC} from 'react';
import {Task} from './Task';
import {TaskType} from './App';

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    changeTaskStatus: (id: number, isDone: boolean) => void
    removeTask: (todolistID: string, id: number) => void
    removeTodolist: (todolistID: string) => void
}

export const Todolist: FC<PropsType> = (props) => {

    const removeTodolistHandler =() => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div>
            <h3>
                {props.title}
            </h3>
            <button onClick={removeTodolistHandler}>x</button>
            {props.tasks.map((ts) => {
                const removeTaskHandler = (id: number) => props.removeTask(props.todolistId, id)
                // вариант с передачей todolistId в Todolist

                return (
                    <Task
                        key={ts.id}
                        task={ts}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={removeTaskHandler}
                    />
                )
            })}

        </div>
    );
};