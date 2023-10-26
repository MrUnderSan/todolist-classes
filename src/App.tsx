import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './store/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from './store/tasks-reducer';
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, TodolistType} from './store/todolists-reducer';


function App() {

    const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)
    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)

    const dispatch = useDispatch()

    const changeTaskStatus = (todolistID: string, id: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, id, newIsDone))
    }

    const removeTask = (todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }



    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>

            <div className='todolist-wrapper'>
                {todolists.map(tl => {
                    const changeStatusHandler = (id: string, newIsDone: boolean) => changeTaskStatus(tl.id, id, newIsDone)
                    // вариант без передачи todolistId в Todolist

                    return (
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={tasks[tl.id]}
                            changeTaskStatus={changeStatusHandler}
                            removeTask={removeTask} // вариант с передачей todolistId в Todolist
                            removeTodolist={removeTodolist}
                            addTask={addTask}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    )
                })}
            </div>

        </div>
    );
}

export default App;