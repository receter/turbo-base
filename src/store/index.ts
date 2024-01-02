import { configureStore } from "@reduxjs/toolkit";

import { createReducerManager } from "./reducerManager";

const staticReducers = {
  // none yet
};

export const reducerManager = createReducerManager(staticReducers);

const store = configureStore({
  reducer: reducerManager.reduce,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
