import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {

    const todolist1 = '1'
    const todolist2 = '2'

    const [todolists, srtTodolists] = useState(
        [
            {id: todolist1, title: 'Todolist 1', filter: 'all'},
            {id: todolist2, title: 'Todolist 2', filter: 'all'}
        ]
    )

    const [tasks, setTasks] = useState<any>(
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

    const changeTaskStatus = (id: number, isDone: boolean) => {
        // setTasks(tasks.map(el => el.id === id
        //     ? {...el, isDone: !isDone}
        //     : el))
    }

    const removeTask = (id: number) => {
        // setTasks(tasks.filter(t=>t.id !== id))
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                return (
                    <Todolist
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}/>
                )
            })}
        </div>
    );
}

export default App;