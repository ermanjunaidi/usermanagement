import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    image?: string
    isNew?: boolean
}

const initialState: User[] = []

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (_, action: PayloadAction<User[]>) => action.payload,
        addUser: (state, action: PayloadAction<User>) => {
            state.unshift({ ...action.payload, isNew: true })
        },
    },
})

export const { setUsers, addUser } = userSlice.actions
export default userSlice.reducer
