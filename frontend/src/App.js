import React from "react";
import { Route } from "react-router-dom";
import Manager from "../src/pages/Manager";
import Main from "../src/pages/Main";

const App = () => {
  return (
    <div>
      <Route path="/main" component={Main} />
      <Route path="/manager" component={Manager} />
    </div>
  );
};

export default App;
