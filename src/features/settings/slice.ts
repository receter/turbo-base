import { createSlice } from "@reduxjs/toolkit";
import { Settings } from "./types";

// Define a type for the slice state
interface SettingsState {
  settings: Settings;
}

// Define the initial state using that type
const initialState: SettingsState = {
  settings: { test: "123" },
};

export const settingsSlice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.settings = action.payload;
    },
  },
});

export const { setTest } = settingsSlice.actions;
