import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function GotoManager() {
    return (    

          <LinkWrap to="/login">
            <ManagerButtonWrap>관리자로 입장</ManagerButtonWrap>
          </LinkWrap>         
    );
};

const LinkWrap = styled(Link)`
  width: 100px;
`;

const ManagerButtonWrap = styled.div`
  background-color: white;
  color: #C4C4C4;
  padding: 5px 0;
  margin-top: 10px;
  text-decoration: underline;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;
