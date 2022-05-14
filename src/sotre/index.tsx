import { configureStore } from '@reduxjs/toolkit'
import { boardSlice } from '../pages/Board/store/board.slice'
import { authSlice } from './auth.slice'

const reducers = {
    auth: authSlice.reducer,
    board: boardSlice.reducer
}

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>