import { createReducer,createAction,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'




/* export const sendLoginRequest = createAsyncThunk("SEND_LOGIN_REQUEST", () => {
    return  axios
     .post("/api/login")
     .then(x => x.data )
     
     }) */

export const addToFavorite = createAsyncThunk("ADD_TO_FAVORITE", (movieId) => {
    return axios.
    get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=4620455e1c3ab4ab640f78e163013622&language=en-US`
    )
    .then(res => res.data)
    
 }
) 

/* export const removeFromFavorite = createAsyncThunk("REMOVE_FROM_FAVORITE",(flightId,thunkAPI) => {
    const {user} = thunkAPI.getState()
    return axios
      .delete(`/api/favorites?userId=${user._id}&flightId=${flightId}`)
      .then((res) => res.data)
      
  }) 
 */

export const favReducer = createReducer([], {
    /* [sendLoginRequest.fulfilled]: (state,action) => action.payload, */
    [addToFavorite.fulfilled]: (state,action) => action.payload,
    /* [removeFromFavorite.fulfilled]: (state,action) => action.payload,  */
   
});



  

   