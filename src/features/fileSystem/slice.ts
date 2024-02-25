import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type FileSystemType = "dropbox";

export interface FileSystemState {
  type: FileSystemType | null;
  readyState: "initializing" | null;
}

const initialState: FileSystemState = {
  type: null,
  readyState: null,
};

const slice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<FileSystemType>) => {
      state.type = action.payload;
      state.readyState = "initializing";
    },
  },
});

// export actions
export const { initialize } = slice.actions;

// export slice
export default slice;
