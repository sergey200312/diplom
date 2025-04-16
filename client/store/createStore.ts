import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import modalReducer from './features/modalSlice'
import { baseApi } from "./api/baseApi";


export const createStore = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(baseApi.middleware),
    
})

export type RootState = ReturnType<typeof createStore.getState>;
export type AppDispatch = typeof createStore.dispatch;