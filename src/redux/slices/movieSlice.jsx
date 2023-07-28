import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  movies: [],
  infoMovie: {},
};
// setup reduxtoolkit
export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    renderTableMovies: (state, action) => {
      state.movies = action.payload;
    },
    getInfoMovie: (state,action) => {
      state.infoMovie = action.payload
    },
   
  },
});

export const { renderTableMovies, getInfoMovie, setInfoMovie } = moviesSlice.actions;

// export const
export default moviesSlice.reducer;
