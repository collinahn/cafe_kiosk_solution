import React, { useState } from "react";
import styled from "styled-components";

const ReadyArray = [
  {
    id: 1,
    readyNo: "001",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 21:29",
    readysent: false,
  },
  {
    id: 2,
    readyNo: "002",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 21:31",
    readysent: false,
  },
  {
    id: 3,
    readyNo: "003",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 21:32",
    readysent: false,
  },
  {
    id: 4,
    readyNo: "004",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 21:33",
    readysent: false,
  },
  {
    id: 5,
    readyNo: "005",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 22:00",
    readysent: false,
  },
  {
    id: 6,
    readyNo: "006",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 22:09",
    readysent: false,
  },
  {
    id: 7,
    readyNo: "007",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 22:14",
    readysent: false,
  },
  {
    id: 8,
    readyNo: "008",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 22:19",
    readysent: false,
  },
  {
    id: 9,
    readyNo: "009",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 22:25",
    readysent: false,
  },
  {
    id: 10,
    readyNo: "010",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 22:29",
    readysent: false,
  },
  {
    id: 11,
    readyNo: "011",
    readyItems: "아메리카노(ICE)*5EA",
    readyTime: "2021/10/23 22:49",
    readysent: false,
  },
];

export default function ReadyList() {
  const [sent, setSent] = useState(false);
  const sentReady = () => {
    setSent(true);
  };
  return (
    <>
      {ReadyArray.map((ready) => (
        <>
          <List>
            <Ordereddiv>&nbsp;주문 순서 : {ready.readyNo}</Ordereddiv>
            <Ordereddiv>&nbsp;주문 내역 : {ready.readyItems}</Ordereddiv>
            <Ordereddiv>&nbsp;주문 시간 : {ready.readyTime}</Ordereddiv>
          </List>
          <>
            {!ready.readysent ? (
              <Activebtn
                onClick={() => {
                  setSent(true);
                  ready.readysent = sent;
                }}
              >
                준비 완료 알림 보내기
              </Activebtn>
            ) : (
              <Unactivebtn>알림 보내기 완료</Unactivebtn>
            )}
          </>
          <div>&nbsp;</div>
        </>
      ))}
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

const Activebtn = styled.button`
  width: 100%;
  height: 30px;
  background-color: black;
  color: white;
  text_align: center;
  border: 1px solid black;
  font-weight: bold;
  border-radius: 1px;
`;

const Unactivebtn = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  background-color: #d3d3d3;
  color: white;
  text_align: center;
  font-weight: bold;
  border-radius: 1px;
`;
