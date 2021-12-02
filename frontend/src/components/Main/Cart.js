import React from "react";
import Slide from "./Slide";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Cart({ menuArray }) {
  let sum = 0;
  for (let i = 0; i < menuArray.length; i++) {
    sum = sum + menuArray[i].price;
  }

  return (
    <>
      <CartWrap>
        <TitleWrap>
          <TextWrap>장바구니</TextWrap>
          <PriceWrap>총 주문금액 ₩{sum}</PriceWrap>
        </TitleWrap>
        <Slide menuArray={menuArray} />
      </CartWrap>
      <BottomButtonWrap>
        <LinkWrap to="/">
          <CloseButtonWrap>취소하기</CloseButtonWrap>
        </LinkWrap>
        <LinkWrap to="/pay">
          <PayButtonWrap>결제하기</PayButtonWrap>
        </LinkWrap>
      </BottomButtonWrap>
    </>
  );
}

const CartWrap = styled.div`
  border-top: 2px solid black;
  background-color: #f6f6ff;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  color: #493e3e;
  font-size: 16px;
  font-weight: 500;
`;

const LinkWrap = styled(Link)`
  width: 100%;
  text-decoration: none;
`;

const BottomButtonWrap = styled.div`
  border-top: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
`;

const CloseButtonWrap = styled.div`
  background-color: black;
  color: white;
  padding: 5px 0;
  border: 2px solid black;
`;

const PayButtonWrap = styled.div`
  color: #493e3e;
  padding: 5px 0;
`;

const TextWrap = styled.p`
  margin: 15px 0 5px 50px;
  font-weight: bold;
  font-size: 16px;
  margin-left: 50px;
`;
const PriceWrap = styled.p`
  margin: 15px 50px 5px 0;
  font-weight: bold;
  font-size: 16px;
`;
