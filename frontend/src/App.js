import React from "react";
import { Route } from "react-router-dom";
import test1 from "./components/test1";
import test2 from "./components/test2";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={test1} />
      <Route path="/test" component={test2} />
    </div>
  );
};

export default App;
