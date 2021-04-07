import React, { useContext } from "react";
import { Link,useHistory } from 'react-router-dom';
import axios from "axios";

import { UserContext } from "../index";
import { log, success, error } from "../utils/logs";

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));





export default function Header() {

  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [ value, setValue ] = React.useState("")

  const handleLogout = async () => {
    log("logout attempt...");
    try {
      await axios.post("/api/logout");
      setUser({});
      success("logged out");
      history.push("/");
    } catch ({ response }) {
      error(response.status, response.statusText);
    }
  };

  const classes = useStyles();
 
  const Pair = ({ children }) => (
  
    <div className="flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
      {children}
    </div>
  );
  
  
  
  const EmptyButton = ({ children }) => (
    <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    className={classes.search}>
      {children}
    </Button>
  );
  
  
  
  
  const RoundButton = ({ children, onClick = () => {} }) => (
    <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    className={classes.search}
    onClick={onClick} 
  >
    {children}
  </Button>


      
  
  );
  

const enter = (e)=> {
   if(e.keyCode == '13'){ 
history.push(`/movies/${value}`)
setValue("")
  } }

  
  
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#2E3B55',margin:'0 auto', padding:'1em' }}>
        <Toolbar>
          
          <Typography variant="h3" className={classes.title} style ={{color:'white'}}>
          <Link to ='/' style={{textDecoration:'none'}}>
         
          <Button color="inherit" className={classes.search} style ={{color : 'white'}}> OMDB</Button>
            </Link> 
          </Typography>
          
       
          
            <Button 
            className={classes.search} 
            style={{color:'white'}}
            onClick={()=> {
              history.push(`/movies/${value}`)
              setValue("")
          }}
            > <SearchIcon /> 
            </Button>
              
           
              
              
          <div className={classes.search} style={{marginRight:'20px'}}>
             
            <InputBase
              fullWidth
               onKeyDown= {(e)=>enter(e)} 
               value={value}
               onChange={(e)=>setValue(e.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            
          
          </div>
          {user.id ? (
  <Pair>
    
     <Link to = '/user'>
     <EmptyButton ><AccountBoxIcon /> </EmptyButton>
      </Link>
    <RoundButton onClick={handleLogout} >Logout</RoundButton>
  </Pair>
) : (
  <Pair>
     <Link to = '/login' style={{textDecoration:'none'}}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.search}
            
          >
            Log In
          </Button>
          </Link>
  </Pair>
)}

          
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}





