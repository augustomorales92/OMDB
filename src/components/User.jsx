
import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { Link,useHistory} from 'react-router-dom';
//----------------------------------------------------
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//-----------------------------------------------------
import { log, success, error } from "../utils/logs";
import { UserContext } from "../index";



// STYLES FUNCTION ----------------------------------
const useStyles = makeStyles((theme) => ({
  
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.elfinanciero.com.mx/uploads/2020/08/25/7695ea769f1598378727_standard_desktop_medium_retina.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
//-----------------------------------------------------




export default function User () {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const classes = useStyles();
  
  const [favs, setfavs] = useState([]);
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);


const click = (id)=>{
    
    
     return  axios
      .delete(`/api/favorites/${id}`)
      .then((res) => res.data  )
      .then(()=> history.push("/user"))
       .catch(({ response }) => {
         setLoading(false);
         error(response.status, response.statusText);
        })
    
   }
  
  //---------------------------------------------
  useEffect(() => {
    log("user attempt...");
    axios
      .get(`/api/user/`)
      .then((res) => res.data)
      .then((img) => {
        setImage(img);
        setLoading(false);
        success(
          `Hello and, again, welcome.`
        );
      })
      .catch(({ response }) => {
        setLoading(false);
        error(response.status, response.statusText);
      });
  }, []);

  //-----------------------------------------------
  useEffect(() => {
    log("aca vienen las pelis favs...");
    axios
      .get("/api/favorites")
      .then((res) => setfavs(res.data))
       .catch(({ response }) => {
         setLoading(false);
         error(response.status, response.statusText);
       });
  }, []);

  //-----------------------------------------------

  

if (loading) return null;
  
if (image) {
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            
            <Typography component="h1" variant="h5">
              Bienvenido {user.email.split('@')[0]}, esta es tu casa
              <hr style = {{backgroud:'white',}}/>

            </Typography>
            <Box mt={5} />
            <Typography component="h1" variant="h5">
              Tus favoritos son: 
            </Typography>
            <Box mt={5} />
            <Typography component="h5" variant="h5">
              {favs.map((pelis)=>{
               return <li key ={pelis.id}>
                <Link to={`/movie/${pelis.movieId}` }  style={{textDecoration:'none',color:'2E3B55 !important'}}>
                {pelis.title}  
                </Link>
                <Button color="inherit" className={classes.search} onClick ={()=>click(pelis.id)} > remove </Button>
              </li>
              })}
              
            </Typography>
            
          </div>
        </Grid>
      </Grid>
    );
  } 


  return (
    <>
      <p className="text-red-600 text-6xl">404 Not Found</p>
    </>
  );
};










