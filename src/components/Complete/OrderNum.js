import React from "react";
import styled from "styled-components";

const Ordernum = styled.p`
  display: flex;
  justify-content: center; 
  font-size: 13px;
  font-weight: bold;
  margin: 15px 0 10px 0;
  color: black;
`;

const OrderNum = () => {
    return (
      
        <Ordernum>주문 순번 : </Ordernum>
      
    );
};
  
export default OrderNum;