import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    moviesName: [],
    moviesResult: [],
  },
  reducers: {
    addGptMovieResult: (state, action) => {
      state.moviesName = action.payload.moviesName;
      state.moviesResult = action.payload.moviesResult;
    },
  },
});

export const { addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
