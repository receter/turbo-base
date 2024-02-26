import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ExampleState {
  name: string | null;
  isRatingFetching: boolean;
  rating: number | null;
}

const initialState: ExampleState = {
  name: null,
  rating: null,
  isRatingFetching: false,
};

const slice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.rating = null;
    },
    ratingRequest: (state) => {
      state.isRatingFetching = true;
    },
    ratingSuccess: (state, action: PayloadAction<number>) => {
      state.isRatingFetching = false;
      state.rating = action.payload;
    },
  },
});

// export actions
export const { setName, ratingRequest, ratingSuccess } = slice.actions;

// export slice
export default slice;
