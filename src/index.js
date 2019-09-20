import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/statistics" component={App} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
