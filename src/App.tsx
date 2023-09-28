import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: string
}

type TasksType = {
    [key: string] : TaskType[]
}

function App() {

    const todolist1 = '1'
    const todolist2 = '2'

    const [todolists, setTodolists] = useState<TodolistType[]>(
        [
            {id: todolist1, title: 'Todolist 1', filter: 'all'},
            {id: todolist2, title: 'Todolist 2', filter: 'all'}
        ]
    )

    const [tasks, setTasks] = useState<TasksType>(
        {
            [todolist1]: [
                {id: 1, title: 'To eat', isDone: true},
                {id: 2, title: 'To sleep', isDone: true},
                {id: 3, title: 'To drink', isDone: false},
            ],
            [todolist2]: [
                {id: 1, title: 'To eat', isDone: true},
                {id: 2, title: 'To sleep', isDone: true},
            ]
        }
    )

    const changeTaskStatus = (todolistID: string, id: number, newIsDone: boolean) => {

        // const changedTasks = tasks[todolistID].map(tl=> tl.id === id ? {...tl, isDone: isDone} : tl)
        // setTasks({...tasks, [todolistID]: changeTL})

        setTasks({...tasks, [todolistID] : tasks[todolistID].map(t => t.id === id ? {...t, isDone: newIsDone} : t)})
    }

    const removeTask = (todolistID: string, id: number) => {

        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t=> t.id !== id)})
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(t=>t.id !== todolistID))

        delete tasks[todolistID]

        // const newTasks = {...tasks}
        // delete newTasks[todolistID]
        // setTasks(newTasks)
        // на размышление
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: new Date().getTime(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskTitle = (todolistId: string, taskId: number, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=> t.id === taskId ? {...t, title} : t)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title} : t))
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                const changeStatusHandler = (id: number, newIsDone: boolean) => changeTaskStatus(tl.id, id, newIsDone)
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
    );
}

export default App;