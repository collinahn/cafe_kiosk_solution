import React from "react";
import ManagerTitle from "../components/Login/ManagerTitle";
import ManagerLogin from "../components/Login/ManagerLogin";
import ManagerButton from "../components/Login/ManagerButton";
import GotoStart from "../components/Login/GotoStart";

const Login = () => {

    return (
        <>
            <ManagerTitle />
            <ManagerLogin />
            <ManagerButton />
            <GotoStart />
                     
        </>
    );
};

export default Login;