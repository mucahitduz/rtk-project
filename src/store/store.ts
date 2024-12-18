import rootReducer from "../reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default store;
