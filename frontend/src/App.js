import React from "react";
import { Route } from "react-router-dom";
import test1 from "./components/test1";
import test2 from "./components/test2";
import "./App.css";
import Ordered from "./pages/Ordered";
import Ready from "./pages/Ready";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={test1} />
      <Route path="/Ordered" component={Ordered} />
      <Route path="/Ready" component={Ready} />
      <Route path="/test" component={test2} />
    </div>
  );
};

export default App;
