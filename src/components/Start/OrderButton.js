import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function OderButton() {
    return (
           
          <LinkWrap to="/">
            <OrderButtonWrap>주문하러 가기</OrderButtonWrap>
          </LinkWrap>    
    );
  }

const LinkWrap = styled(Link)`
  width: 290px;
  text-decoration: none;
`;

const OrderButtonWrap = styled.div`
  background-color: black;
  color: white;
  padding: 12px 0;
  border-radius: 40px;
  margin: 40px 60px 0 60px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;