import { settingsSlice } from "./settings/slice";
import { userSlice } from "./user/slice";

export type FeatureReducer =
  | typeof settingsSlice.reducer
  | typeof userSlice.reducer;
