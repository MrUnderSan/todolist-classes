import React, {FC} from 'react'
import {Button} from '../Button';
import {useDispatch} from 'react-redux';
import {changeFilterAC, FilterValuesType} from '../store/todolists-reducer';

type PropsType = {
    todolistId: string
}

export const TodolistButtons: FC<PropsType> = ({todolistId}) => {

    console.log('TodolistButtons')

    const dispatch = useDispatch()

    const changeTodolistFilter = (filter: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, filter))
    }

    return (
        <div className={'button-wrapper'} >
            <Button name={'All'} callback={()=>changeTodolistFilter('all')} className={'filter-button'}/>
            <Button name={'Active'} callback={()=>changeTodolistFilter('active')} className={'filter-button'}/>
            <Button name={'Completed'} callback={()=>changeTodolistFilter('completed')} className={'filter-button'}/>
        </div>
    )
}