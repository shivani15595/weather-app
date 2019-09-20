import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Statistics from "./components/statistics/Statistics";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/statistics" component={Statistics} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
