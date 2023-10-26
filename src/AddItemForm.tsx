import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

type PropsType = {
    addItem: (value: string) => void
}

export const AddItemForm = (props: PropsType) => {

    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addTask = () => {
        if(value.trim()) {
            props.addItem(value.trim())
            setValue('')
        } else {
            setError('text is empty')
        }

    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addTask()
        }
    }

    const onBlurHandler = () => {
        if(!value.trim()) {
            setError('text is empty')
        }
    }


    return (
        <div className={'addItemForm'}>
            <input
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                onBlur={onBlurHandler}
                style={error ? {border: '1px solid red'} : undefined}
            />
            <Button name='+' callback={addTask} />
            {error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    );
};