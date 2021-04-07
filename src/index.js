import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Main from './containers/Main'
import {Provider} from 'react-redux'
import store from './state/store'


export const UserContext = React.createContext();
const Root = () => {
  const [user, setUser] = React.useState({});
  
  return(
<React.StrictMode>
  <Provider store ={store}>
    <BrowserRouter>
    <UserContext.Provider value={{ user, setUser }} >
        <Main />
      </UserContext.Provider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
)};

export default render(<Root />, document.getElementById("root"));
