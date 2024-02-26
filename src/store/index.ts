import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createReducerManager } from "./reducerManager";
import { RootStateFeatures } from "../features/featureManger";

const initialReducers = {
  // none yet

  // Global (App) reducers would go here

  // Store needs at least one reducer, so adding a dummy one
  reducerManager: (state = 0) => state,
};

export const reducerManager = createReducerManager(initialReducers);

// Create the saga middleware
export const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: reducerManager.reduce,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;

type RootStateInitial = ReturnType<typeof store.getState>;

export type RootState = RootStateInitial & RootStateFeatures;
export type AppDispatch = typeof store.dispatch;

export default store;
