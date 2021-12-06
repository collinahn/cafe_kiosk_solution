import React from "react";
import styled from "styled-components";

const Predtime = styled.p`
  display: flex;
  justify-content: center; 
  font-size: 13px;
  font-weight: bold;
  margin: 15px 0 10px 0;
  color: black;
`;

const PredTime = () => {
    return (
      
        <Predtime>예상대기시간 : </Predtime>
      
    );
};
  
export default PredTime;