import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Manager from "../src/pages/Manager";
import Main from "../src/pages/Main";
import Start from "./pages/Start";
import LoginPage from "./pages/Login";
import Complete from "./pages/Complete";
import Order from "./pages/Order";
import Ordered from "./pages/Ordered";
import Ready from "./pages/Ready";
import AuthRoute from "./components/Auth/AuthRoute";
import StaffLogin from "./pages/StaffLogin";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {}, []);

  const loginCallBack = (login) => {
    setIsLogin(login);
  };

  return (
    <div>
      <Route path="/main" component={Main} />
      <Route path="/manager" component={Manager} />
      <Route exact path="/start" component={Start} />
      <Route
        path="/login"
        render={(props) => (
          <LoginPage {...props} loginCallBack={loginCallBack} />
        )}
      />
      <Route path="/complete" component={Complete} />
      <Route path="/order" component={Order} />
      <Route path="/StaffLogin" component={StaffLogin} />
      <Route path="/Ordered" component={Ordered} />
      <Route path="/Ready" component={Ready} />
    </div>
  );
}
