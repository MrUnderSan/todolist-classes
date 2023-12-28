import React, {FC} from 'react'
import {Button} from 'shared/ui/components/button/Button';
import {useDispatch} from 'react-redux';
import {FilterValuesType} from 'entities/todolist/model/todolistsSlice';

type PropsType = {
    todolistId: string
}

export const TodolistButtons: FC<PropsType> = ({todolistId}) => {

    const dispatch = useDispatch()

    const changeTodolistFilter = (filter: FilterValuesType) => {
        // dispatch(changeFilterAC(todolistId, filter))
    }

    return (
        <div className={'button-wrapper'} >
            <Button name={'All'} callback={()=>changeTodolistFilter('all')} className={'filter-button'}/>
            <Button name={'Active'} callback={()=>changeTodolistFilter('active')} className={'filter-button'}/>
            <Button name={'Completed'} callback={()=>changeTodolistFilter('completed')} className={'filter-button'}/>
        </div>
    )
}