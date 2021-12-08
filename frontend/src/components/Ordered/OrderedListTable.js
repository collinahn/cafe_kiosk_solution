import React from "react";
import styled from "styled-components";

const OrderedListTable = ({ order, okSubmit, noSubmit, byebye }) => {
  const {
    id,
    orderedNo,
    orderedItems,
    orderedTime,
    orderConfirmed,
    cancelasked,
  } = order;
  return (
    <>
      <List>
        <Ordereddiv>&nbsp;주문 순서 : {orderedNo}</Ordereddiv>
        <Ordereddiv>&nbsp;주문 내역 : {orderedItems}</Ordereddiv>
        <Ordereddiv>&nbsp;주문 시간 : {orderedTime}</Ordereddiv>
      </List>
      <span>
        <Okbutton onClick={() => okSubmit(id)}>승낙하기</Okbutton>
        <Nobutton onClick={() => noSubmit(id)}>취소하기</Nobutton>
        <div>&nbsp;</div>
        {cancelasked === true ? (
          <ToggledBackgroundWrap>
            <ToggleWrap>
              <br />
              <Ordereddiv>&nbsp;주문 순서 : {order.orderedNo}</Ordereddiv>
              <Ordereddiv>&nbsp;주문 내역 : {order.orderedItems}</Ordereddiv>
              <Ordereddiv>&nbsp;주문 시간 : {order.orderedTime}</Ordereddiv>
              <br />
              <br />
              <Askingdiv>정말 취소하시겠습니까?</Askingdiv>
              <br />
              <span>
                <YButtonWrap onClick={() => byebye(id)}>Y</YButtonWrap>
                <NButtonWrap onClick={() => noSubmit(id)}>N</NButtonWrap>
              </span>
              <br />
            </ToggleWrap>
          </ToggledBackgroundWrap>
        ) : null}
      </span>
    </>
  );
};

export default OrderedListTable;

const List = styled.div`
  width: 393px;
  height: 80px;
  display: flex;
  justify-content: center;
  background-color: Gainsboro;
  flex-direction: column;
`;

const Ordereddiv = styled.div`
  text-shadow: 1px 0px 1px #493e3e;
  font-size: 10;
`;

const Askingdiv = styled.div`
  text-shadow: 1px 0px 1px #493e3e;
  font-size: 20;
  text_align: center;
`;

const Okbutton = styled.button`
  width: 50%;
  height: 30px;
  background-color: black;
  color: white;
  text_align: center;
  border: 1px solid black;
  font-weight: bold;
  border-radius: 1px;
`;

const Nobutton = styled.button`
  width: 50%;
  height: 30px;
  background-color: white;
  color: black;
  text_align: center;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 1px;
`;

const ToggledBackgroundWrap = styled.div`
  bottom: 60px;
  position: fixed;
  left: 44px;
  display: flex;
  justify-content: center;
`;

const ToggleWrap = styled.div`
  background-color: white;
  width: 299px;
  border-radius: 30px;
  border: 2px solid #383843;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NButtonWrap = styled.button`
  background-color: #202070;
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  padding: 10px 20.5px;
  margin: 0 10px 0 50px;
  opacity: 0.6;
`;

const YButtonWrap = styled.button`
  background-color: black;
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  padding: 10px 20.5px;
`;
