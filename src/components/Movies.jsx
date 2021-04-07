import React from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Link} from 'react-router-dom';

import {getSearchMoviesRequest} from '../state/searchMovie'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background:'black'
  },
  paper: {
    height: 140,
    width: 100,
   },
  control: {
    padding: theme.spacing(2),
  },
}));


export default function SpacingGrid({match}) {
 
const classes = useStyles();
let queryMovie = useSelector((state)=> state.searchMovie)
queryMovie = queryMovie.results;
  
const dispatch = useDispatch();
const movie = match.params.id
  
  React.useEffect(()=>{
    dispatch(getSearchMoviesRequest(movie))
  },[dispatch,queryMovie])

return (
      
    <Grid container className={classes.root} >
    <h1 style={{color:'white',fontFamily:'monospace'}}>Your search : </h1>
    
    <Grid item xs={12} >
    <hr style = {{backgroud:'white'}}/>
      <Grid container justify="center" spacing={3} >
        
        {queryMovie && queryMovie.map((movie) => (
           <Grid key={movie.id} item  >
             <Link to={`/movie/${movie.id}` } >
            <img className = {classes.paper} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path }`} style = {{margin: '10% auto',width: '150px' , height: '210px'}} />
            </Link>
      
          </Grid>
        ))}
    </Grid>
  </Grid>
  </Grid>
    
  );
}
