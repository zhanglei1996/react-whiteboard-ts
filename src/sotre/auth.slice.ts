import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { User } from "../types/user";

interface State {
    user: User | null
}

const initialState: State = {
    user: {
        name: 'zhanglei'
    }
}

export const authSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        setUser(state: State, action) {
            state.user = action.payload
        }
    }
})

export const selectUser = (state: RootState) => state.auth.user

export const { setUser } = authSlice.actions
