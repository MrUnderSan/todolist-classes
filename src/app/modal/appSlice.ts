import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AppStatusType = 'idle' | 'loading'

const slice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        appStatus: 'idle' as AppStatusType,
        appError: null as null | string
    },
    reducers: {
        changeInitializedStatus: (state) => {
            state.isInitialized = true
        },
        changeAppStatus: (state, action: PayloadAction<{appStatus: AppStatusType}>) => {
            state.appStatus = action.payload.appStatus
        },
        changeAppError: (state, action: PayloadAction<{appError: string | null}>) => {
            state.appError = action.payload.appError
        },
    }
})

export const appSlice = slice.reducer
export const appActions = slice.actions