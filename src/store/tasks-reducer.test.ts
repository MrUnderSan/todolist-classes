import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from './tasks-reducer';

const todolist1 = '1'
const todolist2 = '2'
let tasks: TasksType

beforeEach(()=> {
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

test('task should be added', ()=> {

    const action = addTaskAC(todolist2, '123')

    const endState = tasksReducer(tasks, action)

    expect(tasks[todolist2][2].title).toBe('123')
    expect(tasks[todolist1].length).toBe(3)
    expect(endState[todolist2].length).toBe(2)
})

test('correct task should be removed', ()=> {

    const action = removeTaskAC(todolist2, '1')

    const endState = tasksReducer(tasks, action)

    expect(tasks[todolist2].length).toBe(2)
    expect(endState[todolist2].length).toBe(1)
})

test('correct task name should be changed', ()=> {

    const action = changeTaskTitleAC(todolist2, '1', 'New title')

    const endState = tasksReducer(tasks, action)

    expect(tasks[todolist2][0].title).toBe('To eat')
    expect(endState[todolist2][0].title).toBe('New title')
})

test('correct task status should be changed', ()=> {

    const action = changeTaskStatusAC(todolist2, '1', false)

    const endState = tasksReducer(tasks, action)

    expect(tasks[todolist2][0].isDone).toBeTruthy()
    expect(endState[todolist2][0].isDone).toBeFalsy()
})