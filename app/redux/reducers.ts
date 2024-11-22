import { combineReducers } from '@reduxjs/toolkit';
import dialogSlice from './dialogSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
    dialog: dialogSlice,
    user: userSlice
});

export default rootReducer;
