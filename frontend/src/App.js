import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import "./index.css";

import Header from "./components/Header";
import Main from "./components/Main";
import ServiceInfo from "./components/ServiceInfo";


function App() {
  return (
    <Router>
      <Route exact path='/' component={Main} />
      <Route path='/serviceinfo' component={ServiceInfo} />
    </Router>

  );
}

export default App;
