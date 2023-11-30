import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activeEdit = () => {
        setIsEdit(true)
    }

    const changeTitle = () => {
        props.callback(title)
        setIsEdit(false)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeTitle()
        }
    }

    return (
        isEdit
            ? <input value={title} onChange={onChangeHandler} onBlur={changeTitle} autoFocus
                     onKeyDown={onKeyDownHandler}/>
            : <span onDoubleClick={activeEdit}>{props.title}</span>
    )
}