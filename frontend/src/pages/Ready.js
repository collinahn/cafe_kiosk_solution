import React from "react";
import Header from "../components/common/Header";
import ReadyList from "../components/Ready/ReadyList";
import styled from "styled-components";

const Ready = () => {
  return (
    <>
      <Header />
      <BodyWrap>&nbsp;&nbsp;&nbsp;준비&nbsp;현황</BodyWrap>
      <ReadyList />
    </>
  );
};

export default Ready;

const BodyWrap = styled.p`
  text-shadow: 1px 1px 1px #493e3e;
  font-size: 24px;
  font-weight: bold;
  margin: 0px 0 10px 0;
  color: #493e3e;
`;
