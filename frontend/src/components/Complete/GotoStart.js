import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function GotoStart() {
    return (
   
          <LinkWrap to="/start">
            <RestartButtonWrap>처음으로 이동하기</RestartButtonWrap>
          </LinkWrap>
    );
  }

const LinkWrap = styled(Link)`
  width: 120px;
  text-decoration: none;
`;

const RestartButtonWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  color: black;
  padding: 3.5px 0;
  border-radius: 40px;
  margin-top: 40px;
  margin-left: 130px;
  margin-right: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;