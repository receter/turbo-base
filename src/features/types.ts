import settingsSlice from "./settings/slice";
import userSlice from "./user/slice";
import fileSystemSlice from "./fileSystem/slice";

export type FeatureReducer =
  | typeof settingsSlice.reducer
  | typeof fileSystemSlice.reducer
  | typeof userSlice.reducer;
