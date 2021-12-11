import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Manager from "../src/pages/Manager";
import Main from "../src/pages/Main";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Complete from "./pages/Complete";
import Order from "./pages/Order";
import Staff from "./pages/Staff";
import AuthRoute from "./components/Auth/AuthRoute";
import StaffLogin from "./pages/StaffLogin";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <Route exact path="/main" component={Main} />
      <AuthRoute
        version={1}
        isLogin={isLogin}
        exact
        path="/manager"
        component={Manager}
      />
      <Route exact path="/start" component={Start} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/complete" component={Complete} />
      <Route path="/order" component={Order} />
      <Route exact path="/StaffLogin" component={StaffLogin} />
      <AuthRoute
        version={2}
        isLogin={isLogin}
        exact
        path="/Staff"
        component={Staff}
      />
    </div>
  );
}
