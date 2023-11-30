import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Redux/Reducers/userReducer";


export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
