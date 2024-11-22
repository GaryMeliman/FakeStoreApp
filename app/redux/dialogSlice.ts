import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DialogState {
    title: string;
    details: string;
}

const initialState: DialogState = {
    title: "",
    details: ""
};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setDialog(state: DialogState, action: PayloadAction<DialogState>) {
            state.details = action.payload.details;
            state.title = action.payload.title;
        },
    },
});

export const { setDialog } = dialogSlice.actions;
export default dialogSlice.reducer;