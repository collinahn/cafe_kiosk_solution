import React from "react";
import Title from "../components/Start/Title";
import Hello from "../components/Start/Hello";
import OrderButton from "../components/Start/OrderButton";
import GotoManager from "../components/Start/GotoManager";
import GotoStaff from "../components/Start/GotoStaff";

const Start = () => {

    return (
        <>
            <Title />
            <Hello />
            <OrderButton />
            <GotoManager />   
            <GotoStaff />            
        </>
    );
};

export default Start;