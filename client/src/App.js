import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createContext, useState } from 'react';

import Homepage from "./pages/Homepage";
import Register from './pages/Register';
import Login from './pages/Login'
import Header from './components/Header';

// creating Context
export const AuthContext = createContext({})


function App() {

  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("loggedIn"));
  const [user_id, setUser_id] = useState(window.localStorage.getItem("user_id"));

  const handleLogin = (booleanState, token, user_id) => {

    if (booleanState) {
      setLoggedIn(true);
      window.localStorage.setItem("loggedIn", "loggedIn");
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user_id", user_id);
      setUser_id(user_id)

    } else {
      setLoggedIn(false);
      window.localStorage.removeItem("loggedIn");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_id");
    }
  }


  return (
    <AuthContext.Provider value={{ loggedIn, handleLogin, user_id }} >

      <BrowserRouter>
        <div className="App">

          <Header/>

          <Switch>

            <Route exact path="/" component={Homepage} />

            <Route exact path="/register" component={Register} />
            
            <Route exact path="/login" component={Login} />

          </Switch>

        </div>
      </BrowserRouter >
    </AuthContext.Provider>
  );
}

export default App;