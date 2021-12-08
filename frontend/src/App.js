import React from "react";
import { Route } from "react-router-dom";
import Manager from "../src/pages/Manager";
import Main from "../src/pages/Main";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Complete from "./pages/Complete";
import Order from "./pages/Order";
import Staff from "./pages/Staff";
import Ready from "./pages/Ready";
import AuthRoute from "./components/Auth/AuthRoute";
import StaffLogin from "./pages/StaffLogin";

export default function App() {
  return (
    <div>
      <Route path="/main" component={Main} />
      <Route path="/manager" component={Manager} />
      <Route exact path="/start" component={Start} />
      <Route exact path="/login" component={Login} />
      <Route path="/complete" component={Complete} />
      <Route path="/order" component={Order} />
      <Route exact path="/StaffLogin" component={StaffLogin} />
      <Route path="/Staff" component={Staff} />
      <Route path="/Ready" component={Ready} />
    </div>
  );
}
