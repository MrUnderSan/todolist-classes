import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer,
    TodolistType
} from './todolists-reducer';

const todolist1 = '1'
const todolist2 = '2'

let todolists: TodolistType[]

beforeEach(()=>{
    todolists = [
        {id: todolist1, title: 'Todolist 1', filter: 'all'},
        {id: todolist2, title: 'Todolist 2', filter: 'all'}
    ]
})

test('correct todolist should be deleted', ()=> {

    const endState = todolistReducer(todolists, removeTodolistAC(todolist2))

    expect(todolists.length).toBe(2)
    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('Todolist 1')
})

test('correct todolist should be added', ()=> {

    const endState = todolistReducer(todolists, addTodolistAC('New todolist'))

    expect(todolists.length).toBe(2)
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New todolist')
})

test('correct todolist title should be changed', ()=> {

    const endState = todolistReducer(todolists, changeTodolistTitleAC(todolist1, 'Changed title'))

    expect(endState[0].title).toBe('Changed title')
    expect(todolists[0].title).toBe('Todolist 1')
    expect(endState[1].title).toBe('Todolist 2')

})