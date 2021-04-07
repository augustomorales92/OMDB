import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import moviesReducer from './movies'
import {singleMovieReducer} from './singleMovie'
import {searchMovieReducer} from './searchMovie'
import {favReducer} from './favorite'




const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
      movies : moviesReducer,
      singleMovies: singleMovieReducer,
      searchMovie: searchMovieReducer,
      favorite: favReducer,
      
  },
});




export default store;
