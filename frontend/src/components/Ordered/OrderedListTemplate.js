import React from "react";
import styled from "styled-components";
import OrderedListTable from "./OrderedListTable";

const OrderedListTemplate = ({ ordered, okSubmit, noSubmit, byebye }) => {
  return (
    <>
      {ordered.map((order) => (
        <OrderedListTable
          key={order.id}
          order={order}
          byebye={byebye}
          okSubmit={okSubmit}
          noSubmit={noSubmit}
        />
      ))}
    </>
  );
};

export default OrderedListTemplate;

const Ordereddiv = styled.div`
  text-shadow: 1px 0px 1px #493e3e;
  font-size: 10;
`;

const List = styled.div`
  width: 393px;
  height: 80px;
  display: flex;
  justify-content: center;
  background-color: Gainsboro;
  flex-direction: column;
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
