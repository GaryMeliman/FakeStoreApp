import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    token: string;
}

const initialState: UserState = {
    token: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: UserState, action: PayloadAction<UserState>) {
            state.token = action.payload.token;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;