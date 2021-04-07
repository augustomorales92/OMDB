import React from 'react';
import { Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
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



    

export default function Body() {
  const movies = useSelector(state => state.movies);
  /* const dispatch = useDispatch(); */
  const classes = useStyles();
  /* let [movies,setMovies] = React.useState([]) */
  const [bodyMovies,setBodyMovies] = React.useState([])
  
  
  React.useEffect(()=>{
    let selection = movies;
    setBodyMovies(selection)
  },[movies])

  
 

  return (
      
    <Grid container className={classes.root} >
      <h1 style={{color:'white',fontFamily:'monospace', textAlign:'center', margin:'10px auto'}}>Popular Movies Selection of the week</h1>
      
      <Grid item xs={12} >
        <Grid container justify="center" spacing={3} >
          
          {bodyMovies.map((movie) => (
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






