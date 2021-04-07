
import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";



export const getSingleMoviesRequest = createAsyncThunk("SINGLE-MOVIE", (movieId) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=4620455e1c3ab4ab640f78e163013622&language=en-US`
    )
    .then((res) => res.data)
    
})
    

export const singleMovieReducer = createReducer([], {
  [getSingleMoviesRequest.fulfilled]: (state, action) => action.payload,
});

