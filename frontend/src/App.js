import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import "./index.css";

import Header from "./components/Header";
import Main from "./components/Main";
import ServiceInfo from "./components/ServiceInfo";
import AboutUs from "./components/AboutUs";


function App() {
  return (
    <Router>
      <Route exact path='/' component={Main} />
      <Route path='/serviceinfo' component={ServiceInfo} />
      <Route path='/aboutus' component={AboutUs} />
    </Router>

  );
}

export default App;
