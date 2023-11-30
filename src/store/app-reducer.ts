
type AppStatusType = 'idle' | 'loading'

type ActionsType = ChangeAppStatusACType | ChangeAppErrorACType

type StateType = {
    appStatus: AppStatusType
    appError: null | string
}

const initState: StateType = {
    appStatus: 'idle',
    appError: null
}


export const appReducer = (state = initState, action: ActionsType): StateType => {
    switch (action.type) {
        case 'APP/CHANGE-STATUS':
            return {...state, appStatus: action.status}
        case 'APP/CHANGE-ERROR':
            return {...state, appError: action.error}
        default:
            return state
    }
}

export const changeAppStatusAC = (status: AppStatusType) => {
    return {
        type: 'APP/CHANGE-STATUS' as const,
        status
    }
}

export const changeAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/CHANGE-ERROR' as const,
        error
    }
}


type ChangeAppStatusACType = ReturnType<typeof changeAppStatusAC>
type ChangeAppErrorACType = ReturnType<typeof changeAppErrorAC>