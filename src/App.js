import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Enter from "./Enter";
import ChatRoom from "./ChatRoom";

function App() {
  // prompt("Введите логин");
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Enter} />
        <Route path="/chat-room/:id" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;
