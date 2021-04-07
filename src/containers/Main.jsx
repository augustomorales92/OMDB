import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {useDispatch} from 'react-redux'
import axios from 'axios'

import { log, success, error } from "../utils/logs";
import { UserContext } from "../index";
import Header from "./Header";
import Footer from "./Footer";
import Body from "../components/Body"; 
import Login from "../components/Login"
import Register from "../components/Register"
import Password from "../components/Password"
import Movies from "../components/Movies"
import SingleMovie from "../components/SingleMovie"
import User from "../components/User"
import {getMoviesRequest} from '../state/movies'



export default function Main() {

  const dispatch = useDispatch();
  React.useEffect(()=>{
    dispatch(getMoviesRequest())
  },[dispatch])

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    log(`fetching user...`);
    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((user) => {
        success(`found user ${user.mail}`);
        setUser(user);
      })
      .catch(({ response }) => {
        error(response.status, response.statusText);
      });
  }, []);

  


  return (
    <React.Fragment >
      <Header />
      
      <Switch>
          <Route exact path="/" component={Body} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotPassword" component={Password} />
          <Route exact path="/movies/:id" render={({match})=> <Movies match={match}/>} />
          <Route exact path="/movie/:id" render={({match})=> <SingleMovie match={match}/>} />
          <Route exact path="/user" render={()=> <User />} /> 
          <Redirect to="/" />
        </Switch>
      
      <Footer />
    </React.Fragment>
  );
}







