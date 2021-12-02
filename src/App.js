import React from "react";
import { Route } from "react-router-dom";
import test1 from "./components/test1";
import "./App.css";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Complete from "./pages/Complete";
import Order from "./pages/Order";



const App = () => {
  return (
    <div>
            
      <Route exact path="/" component={test1} />
      <Route path="/start" component={Start} />
      <Route path="/login" component={Login} />
      <Route path="/complete" component={Complete} />
      <Route path="/order" component={Order} />


    </div>
  );
};

export default App;
