import {removeTodolistAC, TodolistType} from './todolists-reducer';
import {tasksReducer, TasksType} from './tasks-reducer';

const todolist1 = '1'
const todolist2 = '2'

let todolists: TodolistType[]
let tasks: TasksType

beforeEach(()=>{
    todolists = [
        {id: todolist1, title: 'Todolist 1', filter: 'all'},
        {id: todolist2, title: 'Todolist 2', filter: 'all'}
    ]

    tasks = {
        [todolist1]: [
            {id: '1', title: 'To eat', isDone: true,
                description: 'string',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'},
            {id: '2', title: 'To sleep', isDone: true,
                description: 'string',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'},
            {id: '3', title: 'To drink', isDone: false,
                description: 'string',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'},
        ],
        [todolist2]: [
            {id: '1', title: 'To eat', isDone: true,
                description: 'string',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'},
            {id: '2', title: 'To sleep', isDone: true,
                description: 'string',
                status: 0,
                priority: 0,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'},
        ]
    }
})


test('correct tasks in correct todolist should be removed', ()=> {

    const endState = tasksReducer(tasks, removeTodolistAC(todolist1))

    expect(Object.keys(tasks).length).toBe(2)
    expect(Object.keys(endState).length).toBe(1)

    expect(tasks[todolist1].length).toBe(3)

})