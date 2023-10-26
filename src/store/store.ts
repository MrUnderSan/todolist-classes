import {combineReducers, legacy_createStore} from 'redux';
import {todolistReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


const RootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(RootReducer)

export type RootStateType = ReturnType<typeof RootReducer>