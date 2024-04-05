import { configureStore } from "@reduxjs/toolkit";
import productSlicer from "../action/productSlicer";

export let store = configureStore({
    reducer:productSlicer
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;