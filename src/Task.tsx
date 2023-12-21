import React, {ChangeEvent, FC} from 'react';
import {Button} from './Button';
import {EditableSpan} from './components/EditableSpan';
import {tasksThunk, TaskType} from './store/tasks-reducer';
import {useAppDispatch} from './store/hooks';

type PropsType = {
    todolistId: string
    task: TaskType
}

export const Task: FC<PropsType> = (props) => {

    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        //dispatch(removeTaskAC(props.todolistId, props.task.id))
    }

    const changeTitleHandler = (title: string) => {
        dispatch(tasksThunk.updateTask({todolistId: props.todolistId, taskId: props.task.id, model: {title}}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(tasksThunk.updateTask({todolistId: props.todolistId, taskId: props.task.id, model: {status: e.currentTarget.checked ? 2 : 0}}))
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

