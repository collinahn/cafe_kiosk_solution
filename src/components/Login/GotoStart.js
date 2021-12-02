import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function GotoStart() {
    return (    

      <LinkWrap to="/start">
            <ButtonWrap>초기 페이지로 이동</ButtonWrap>
      </LinkWrap> 
            
    );
};

const LinkWrap = styled(Link)`
  width: 140px;
`;

const ButtonWrap = styled.div`
  background-color: white;
  color: #C4C4C4;
  padding: 5px 0;
  margin-top: 10px;
  text-decoration: underline;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;