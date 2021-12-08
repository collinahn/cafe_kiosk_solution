import React, { useState, useRef } from "react";
import styled from "styled-components";
import OrderedListTemplate from "./OrderedListTemplate";

export default function OrderedList() {
  const [inputs, setInputs] = useState({
    orderedNo: "",
    orderedItems: "",
    orderedTime: "",
    orderConfirmed: "",
    cancelasked: "",
  });

  const [ordered, setOrdered] = useState([
    {
      id: 1,
      orderedNo: "001",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 21:29",
      orderConfirmed: false,
      cancelasked: false,
    },
    {
      id: 2,
      orderedNo: "002",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 21:31",
      orderConfirmed: false,
      cancelasked: false,
    },
    {
      id: 3,
      orderedNo: "003",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 21:32",
      orderConfirmed: true,
      cancelasked: false,
    },
    {
      id: 4,
      orderedNo: "004",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 21:33",
      orderConfirmed: false,
      cancelasked: false,
    },
    {
      id: 5,
      orderedNo: "005",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 22:00",
      orderConfirmed: false,
      cancelasked: false,
    },
    {
      id: 6,
      orderedNo: "006",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 22:09",
      orderConfirmed: false,
      cancelasked: false,
    },
    {
      id: 7,
      orderedNo: "007",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 22:14",
      orderConfirmed: false,
      cancelasked: false,
    },
    {
      id: 8,
      orderedNo: "008",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 22:19",
      orderConfirmed: false,
      cancelasked: false,
    },
    {
      id: 9,
      orderedNo: "009",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 22:25",
      orderConfirmed: false,
      cancelasked: false,
    },
    {
      id: 10,
      orderedNo: "010",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 22:29",
      orderConfirmed: false,
      cancelasked: false,
    },
    {
      id: 11,
      orderedNo: "011",
      orderedItems: "아메리카노(ICE)*5EA",
      orderedTime: "2021/10/23 22:49",
      orderConfirmed: false,
      cancelasked: false,
    },
  ]);

  const { orderedNo, orderedItems, orderedTime, orderConfirmed, cancelasked } =
    inputs;

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const nextId = useRef(12);

  const okSubmit = (id) => {
    setOrdered(
      ordered.map((order) =>
        order.id === id
          ? { ...order, orderConfirmed: !order.orderConfirmed }
          : order
      )
    );
  };

  const noSubmit = (id) => {
    setOrdered(
      ordered.map((order) =>
        order.id === id ? { ...order, cancelasked: !order.cancelasked } : order
      )
    );
  };

  const asked = (id) => {
    setOrdered(
      ordered.map((order) =>
        order.id === id ? { ...order, cancelasked: !order.cancelasked } : order
      )
    );
  };

  const onCreate = () => {
    const order = {
      id: nextId.current,
      orderedNo,
      orderedItems,
      orderedTime,
      orderConfirmed,
      cancelasked,
    };

    setOrdered(ordered.concat(order));

    setInputs({
      orderedNo: "",
      orderedItems: "",
      orderedTime: "",
      orderConfirmed: "",
      cancelasked: "",
    });

    nextId.current += 1;
  };

  const byebye = (id) => {
    setOrdered(ordered.filter((order) => order.id !== id));
  };
  return (
    <>
      <>
        <OrderedListTemplate
          ordered={ordered}
          byebye={byebye}
          okSubmit={okSubmit}
          noSubmit={noSubmit}
          asked={asked}
        />
      </>
    </>
  );
}

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
