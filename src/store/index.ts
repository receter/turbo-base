import { configureStore } from "@reduxjs/toolkit";
import { createReducerManager } from "./reducerManager";
import { RootStateFeatures } from "../features/featureManger";

const initialReducers = {
  // none yet

  // Global (App) reducers would go here

  // Store needs at least one reducer, so adding a dummy one
  reducerManager: (state = 0) => state,
};

export const reducerManager = createReducerManager(initialReducers);

const store = configureStore({
  reducer: reducerManager.reduce,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;

type RootStateInitial = ReturnType<typeof store.getState>;

export type RootState = RootStateInitial & RootStateFeatures;
export type AppDispatch = typeof store.dispatch;

export default store;
