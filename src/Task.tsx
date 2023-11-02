import React, {ChangeEvent, FC} from 'react';
import {Button} from './Button';
import {EditableSpan} from './components/EditableSpan';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from './store/tasks-reducer';
import {useDispatch} from 'react-redux';

type PropsType = {
    todolistId: string
    task: TaskType
}

export const Task: FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(props.todolistId, props.task.id))
    }

    const changeTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, title))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistId, props.task.id, e.currentTarget.checked))
    }

    return (
        <div key={props.task.id} className={'task'}>

            <input type={'checkbox'} checked={props.task.isDone}
                   onChange={changeTaskStatus}/>
            <EditableSpan title={props.task.title} callback={changeTitleHandler}/>
            <Button name={'x'} callback={removeTaskHandler}/>
        </div>
    );
};

