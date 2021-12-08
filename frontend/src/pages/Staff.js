import React from "react";
import Header from "../components/common/Header";
import OrderedList from "../components/Ordered/OrderedList";
import styled from "styled-components";

export default function Staff() {
  return (
    <>
      <Header />
      <BodyWrap>&nbsp;&nbsp;&nbsp;주문&nbsp;현황</BodyWrap>
      <OrderedList />
    </>
  );
}

const BodyWrap = styled.p`
  text-shadow: 1px 1px 1px #493e3e;
  font-size: 24px;
  font-weight: bold;
  margin: 0px 0 10px 0;
  color: #493e3e;
`;
