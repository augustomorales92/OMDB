import React,{useContext} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'

import { success, error } from "../utils/logs";
import { UserContext } from "../index";
import {getSingleMoviesRequest} from '../state/singleMovie'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
    background:'	#282828'
  },
  image: {
    width: 512,
    height: 512,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));



export default function SingleMovie({match}) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { user } = useContext(UserContext);
  const history = useHistory();



const singleMovie = useSelector(state => state.singleMovies)
console.log(singleMovie)
React.useEffect(()=>{
dispatch(getSingleMoviesRequest(match.params.id))
},[])

const click = async ()=>{
  if(!user.id) alert('you have to be logged in')
 
  else try {
    // POST user credentials
    await axios.post(`/api/favorites/${user.id}`, {
      title: singleMovie.title,
      img: singleMovie.poster_path,
      movieId: singleMovie.id,
      userId: user.id
    });
    success(`new movie added`);
    // Redirect to login!
    history.push("/user");
  } catch ({ response }) {
    // something's not right...
    error(response.status, response.statusText);
  }
   }

return (
    <div className={classes.root} style={{background:'black'}}>
      <Paper className={classes.paper} >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              
              <img className={classes.img} alt="complex" src={`https://image.tmdb.org/t/p/w500/${singleMovie.poster_path }`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container style={{color:'white'}} >
            <Grid item xs container direction="column" spacing={1}>
              <br />
              <br />
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" >
                  <h2>{singleMovie.title}</h2>
                  
                </Typography>
                <hr style = {{backgroud:'white',}}/>
                <Typography variant="body2" gutterBottom style ={{fontStyle: 'oblique'}}>
                 <h4> {singleMovie.overview} </h4>
                </Typography>
                
              </Grid>
              <Grid item >
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"> <Button
                type="submit"
                style ={{background:'transparent',display:'block',margin:'auto'}}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.search}
                onClick={click}
                >
                add to favorites
              </Button> </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}




