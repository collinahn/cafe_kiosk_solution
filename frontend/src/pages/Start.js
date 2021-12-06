import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GotoManager from "../components/Start/GotoManager";
import GotoStaff from "../components/Start/GotoStaff";
import Logo from "../assets/image/Logo.svg";

export default function Start() {
  return (
    <>
      <TitleWrap>
        <img
          style={{ width: "48px", height: "50px", margin: "18px 10px 15px 0" }}
          src={Logo}
          id="Logo"
          alt="Logo"
        />
        <NameWrap>ABC COFFEE</NameWrap>
      </TitleWrap>
      <HelloMsg>어서오세요!</HelloMsg>
      <LinkWrap to="/main">
        <OrderButtonWrap>주문하러 가기</OrderButtonWrap>
      </LinkWrap>
      <GotoManager />
      <GotoStaff />
    </>
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

const HelloMsg = styled.p`
  font-size: 33px;
  font-weight: bold;
  margin: 75px 0 10px 15px;
  color: black;
  text-align: center;
`;

const TitleWrap = styled.div`
  margin-top: 130px;
  display: flex;
  justify-content: center;
`;

const NameWrap = styled.p`
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 36px;
  font-weight: bold;
  margin: 18px 0 10px 0;
  color: #493e3e;
`;
