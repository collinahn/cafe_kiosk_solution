import React from "react";
import styled from "styled-components";

const HelloMsg = styled.p`
  display: flex;
  justify-content: center; 
  font-size: 33px;
  font-weight: bold;
  margin: 75px 0 10px 15px;
  color: black;
`;

const Hello = () => {
    return (
      
        <HelloMsg>어서오세요!</HelloMsg>
      
    );
};
  
export default Hello;