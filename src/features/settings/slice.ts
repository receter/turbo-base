import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Settings } from "./types";

// Define a type for the slice state
interface SettingsState {
  settings: Settings;
}

// Define the initial state using that type
const initialState: SettingsState = {
  settings: { test: "123" },
};

const slice = createSlice({
  name: "settings",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload;
    },
  },
});

export const { setTest } = slice.actions;
export default slice;
