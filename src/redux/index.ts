import { configureStore } from "@reduxjs/toolkit";
import { loadFromLocalStorage, saveToLocalStorage } from "../localStorage/localStorage";
import rootReducer from "./slice";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

// localStorage.clear()

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
