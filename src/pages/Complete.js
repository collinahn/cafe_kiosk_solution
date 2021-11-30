import React from "react";
import Header from "../components/common/Header";
import Message from "../components/Complete/Message";
import OrderNum from "../components/Complete/OrderNum";
import PredTime from "../components/Complete/PredTime";
import GotoStart from "../components/Complete/GotoStart";
import CancelOrder from "../components/Complete/CancelOrder";

const Complete = () => {

    return (
        <>
            
            <Header />
            <Message />
            <OrderNum />
            <PredTime />
            <GotoStart />
            <CancelOrder />
                     
        </>
    );
};

export default Complete;