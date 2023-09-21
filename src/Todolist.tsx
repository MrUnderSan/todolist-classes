import React, {FC} from 'react';
import {Task} from './Task';
import {TaskType} from './App';

type PropsType = {
    title: string
    tasks: TaskType[]
    changeTaskStatus: (id: number, isDone: boolean) => void
    removeTask: (id: number) => void
}

export const Todolist: FC<PropsType> = (props) => {
    return (
        <div>
            <h3>
                {props.title}
            </h3>

            {props.tasks.map((ts) => {
                return (
                    <Task key={ts.id} task={ts} changeTaskStatus={props.changeTaskStatus}
                          removeTask={props.removeTask}/>
                )
            })}

        </div>
    );
};