import React, {ChangeEvent, FC} from 'react';
import {Button} from 'shared/ui/components/button/Button';
import {EditableSpan} from 'shared/ui/components/editableSpan/EditableSpan';
import {useAppDispatch} from 'shared/hook';
import {tasksThunk, TaskType} from 'entities/todolist/model';


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

