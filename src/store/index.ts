import { configureStore } from "@reduxjs/toolkit";

import { createReducerManager } from "./reducerManager";
import { settingsSlice } from '../features/settings/slice';
import { userSlice } from "../features/user/slice";

const staticReducers = {
  // none yet

  // Global (App) reducers would go here

  // Store needs at least one reducer, so adding a dummy one
  reducerManager: (state = 0) => state,
};

export const reducerManager = createReducerManager(staticReducers);

const store = configureStore({
  reducer: reducerManager.reduce,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;

type RootStateStatic = ReturnType<typeof store.getState>;

export type RootState = RootStateStatic & {
  settings?: ReturnType<typeof settingsSlice.reducer>;
  user?: ReturnType<typeof userSlice.reducer>;
};

export type AppDispatch = typeof store.dispatch;

export default store;
