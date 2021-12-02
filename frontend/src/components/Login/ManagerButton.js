import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//import { useState } from 'react';

export default function ManagerButton() {
  return (
    <LinkWrap to="/main">
      <LoginButtonWrap>입장하기</LoginButtonWrap>
    </LinkWrap>
  );
}

const LinkWrap = styled(Link)`
  width: 290px;
  text-decoration: none;
`;

const LoginButtonWrap = styled.div`
  background-color: black;
  color: white;
  padding: 12px 0;
  border-radius: 40px;
  margin: 40px 50px 0 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;
