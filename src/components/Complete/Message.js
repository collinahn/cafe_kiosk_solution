import React from "react";
import styled from "styled-components";
import Check from "../../assets/image/Check.svg";

const Message = () => {
    return (

      <CompleteWrap>
        <CompleteMsg>주문이 완료되었습니다.<br /></CompleteMsg>
        <img
          style={{width: "85px", height: "85px", 
          marginLeft: "150px", marginTop: "50px"}}
          src={Check}
          id="Check"
          alt="Check"
        />
      </CompleteWrap>
        
    );
};
  
export default Message;

const CompleteWrap = styled.div`
  display: flex;
  justify-content: center; 
  flex-direction: column;

`;

const CompleteMsg = styled.p`
  display: flex;
  justify-content: center; 
  font-size: 21px;
  font-weight: bold;
  margin: 100px 0 10px 15px;
  color: black;
`;