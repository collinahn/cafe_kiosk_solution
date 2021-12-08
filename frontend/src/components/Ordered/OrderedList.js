import React, { useState, useRef } from "react";
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
        />
      </>
    </>
  );
}
