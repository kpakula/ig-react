import "./App.css";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import WrongPage from "./components/WrongPage";
import Profile from "./components/profile/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/profile" exact component={Profile} />
          <Route component={WrongPage} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
