
type AppStatusType = 'idle' | 'loading'

type ActionsType = ChangeAppStatusACType | ChangeAppErrorACType | ReturnType<typeof changeInitializedStatusAC>

type StateType = {
    isInitialized: boolean
    appStatus: AppStatusType
    appError: null | string
}

const initState: StateType = {
    isInitialized: false,
    appStatus: 'idle',
    appError: null
}


export const appReducer = (state = initState, action: ActionsType): StateType => {
    switch (action.type) {
        case 'APP/CHANGE-STATUS':
            return {...state, appStatus: action.status}
        case 'APP/CHANGE-ERROR':
            return {...state, appError: action.error}
        case 'APP/CHANGE-INITIALIZED':
            return {...state, isInitialized: true}
        default:
            return state
    }
}

export const changeInitializedStatusAC = () => ({
    type: 'APP/CHANGE-INITIALIZED'
} as const)

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