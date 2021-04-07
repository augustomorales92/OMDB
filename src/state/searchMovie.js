import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";



export const getSearchMoviesRequest = createAsyncThunk("SEARCH-MOVIE", (movieQuery) => {
   
  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=4620455e1c3ab4ab640f78e163013622&query=${movieQuery}`

    )
    .then((res) => res.data)
    
})
    

export const searchMovieReducer = createReducer([], {
  [getSearchMoviesRequest.fulfilled]: (state, action) => action.payload,
});
