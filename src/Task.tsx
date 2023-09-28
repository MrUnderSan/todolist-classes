import React, {FC} from 'react';
import {TaskType} from './App';
import {Button} from './Button';
import {EditableSpan} from './components/EditableSpan';

type PropsType = {
    task: TaskType
    changeTaskStatus: (id: number, isDone: boolean) => void
    removeTask: (id: number) => void
    changeTaskTitle: (id: number, title: string) => void
}


export const Task: FC<PropsType> = (props) => {

    const removeTaskHandler = () => props.removeTask(props.task.id)

    const changeTitleHandler = (title: string) => {
        props.changeTaskTitle(props.task.id, title)
    }

    return (
        <div key={props.task.id}>

            <input type={'checkbox'} checked={props.task.isDone}
                   onChange={(e) => props.changeTaskStatus(props.task.id, e.currentTarget.checked)}/>
            {/*<span>{props.task.title}</span>*/}
            <EditableSpan title={props.task.title} callback={changeTitleHandler}/>
            <Button name={'x'} callback={removeTaskHandler}/>
        </div>
    );
};

