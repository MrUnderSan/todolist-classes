import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todolistReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';


const RootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof RootReducer>

export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>

export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType, RootStateType, unknown, AnyAction>