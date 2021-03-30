import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/login';
import SignUp from './components/sign-up';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/home";

function App() {

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );

}

export default App;
