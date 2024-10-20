import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    currentMovieIndex: 0,
  },
  reducers: {
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setCurrentMovieIndex: (state, action) => {
      state.currentMovieIndex = action.payload;
    },
  },
});

export const {
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  setCurrentMovieIndex,
} = movieSlice.actions;

export default movieSlice.reducer;
