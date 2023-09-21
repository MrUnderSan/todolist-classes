import React, {FC} from 'react';
import {TaskType} from './App';
import {Button} from './Button';

type PropsType = {
    task: TaskType
    changeTaskStatus: (id: number, isDone: boolean) => void
    removeTask: (id: number) => void
}

export const Task: FC<PropsType> = (props) => {

    const removeTaskHandler = () => props.removeTask(props.task.id)
    return (
        <div key={props.task.id}>

            <input type={'checkbox'} checked={props.task.isDone}
                   onChange={(e) => props.changeTaskStatus(props.task.id, e.currentTarget.checked)}/>
            <span>{props.task.title}</span>
            <Button name={'x'} callback={removeTaskHandler}/>
        </div>
    );
};