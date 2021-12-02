import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function GotoStaff() {
    return (    

      <ButtonWrap>
          <LinkWrap to="/staff">
            <OrderButtonWrap>직원으로 입장</OrderButtonWrap>
          </LinkWrap>
      </ButtonWrap>  
            
    );
};

const LinkWrap = styled(Link)`
  width: 100px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;

const OrderButtonWrap = styled.div`
  background-color: white;
  color: #C4C4C4;
  padding: 10px 0;
  margin-top: 0px;
  text-decoration: underline;
`;
