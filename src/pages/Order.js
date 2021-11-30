import React from "react";
import Header from "../components/common/Header";
import TopBar from "../components/Order/TopBar";
import Set from "../components/Order/Set";
import BottomBtn from "../components/Order/BottomBtn";

const Order = () => {

    return (
        <>
            <Header /> 
            <TopBar /> 
            <Set />       
            <BottomBtn />  
            
        </>
    );
};

export default Order;