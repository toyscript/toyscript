import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import "./index.css";

import Main from "./components/Main";
import ServiceInfo from "./components/ServiceInfo";
import AboutUs from "./components/AboutUs";
import ControlledTabs from "./components/Contents";


function App() {
  return (
    <Router>
      <Route exact path='/' component={Main} />
      <Route path='/serviceinfo' component={ServiceInfo} />
      <Route path='/aboutus' component={AboutUs} />
      <Route path='/result/:movieId' component={ControlledTabs} />
    </Router>

  );
}

export default App;
