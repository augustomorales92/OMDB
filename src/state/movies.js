
import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

let popularMovies = [];

export const getMoviesRequest = createAsyncThunk("MOVIES", () => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=4620455e1c3ab4ab640f78e163013622&language=en-US&page=1`
    )
    .then((res) => res.data)
    .then((firstPage) => {
      popularMovies = firstPage.results;
      return axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=4620455e1c3ab4ab640f78e163013622&language=en-US&page=2`
      );
    })
    .then((res) => res.data)
    .then((secondPage) => {
      return (popularMovies = [...popularMovies, ...secondPage.results]);
    });
});

const moviesReducer = createReducer([], {
  [getMoviesRequest.fulfilled]: (state, action) => action.payload,
});

export default moviesReducer;