import React, { useState } from "react";
import styled from "styled-components";

const OrderedArray = [
  {
    id: 1,
    orderedNo: "001",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 21:29",
    orderConfirmed: false,
  },
  {
    id: 2,
    orderedNo: "002",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 21:31",
    orderConfirmed: false,
  },
  {
    id: 3,
    orderedNo: "003",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 21:32",
    orderConfirmed: false,
  },
  {
    id: 4,
    orderedNo: "004",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 21:33",
    orderConfirmed: false,
  },
  {
    id: 5,
    orderedNo: "005",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 22:00",
    orderConfirmed: false,
  },
  {
    id: 6,
    orderedNo: "006",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 22:09",
    orderConfirmed: false,
  },
  {
    id: 7,
    orderedNo: "007",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 22:14",
    orderConfirmed: false,
  },
  {
    id: 8,
    orderedNo: "008",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 22:19",
    orderConfirmed: false,
  },
  {
    id: 9,
    orderedNo: "009",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 22:25",
    orderConfirmed: false,
  },
  {
    id: 10,
    orderedNo: "010",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 22:29",
    orderConfirmed: false,
  },
  {
    id: 11,
    orderedNo: "011",
    orderedItems: "아메리카노(ICE)*5EA",
    orderedTime: "2021/10/23 22:49",
    orderConfirmed: false,
  },
];

export default function OrderedList() {
  const [confirmed, setConfirmed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    if (showPopup) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  };

  const okSubmit = (id) => {
    setConfirmed(true);
    //json에서 해당데이터 새로운 json으로 넘겨주고 삭제
  };
  const noSubmit = () => {
    setShowPopup(true);
  };
  return (
    <>
      {OrderedArray.map((ordered) => (
        <>
          {!ordered.orderConfirmed && (
            <>
              <List>
                <Ordereddiv>&nbsp;주문 순서 : {ordered.orderedNo}</Ordereddiv>
                <Ordereddiv>
                  &nbsp;주문 내역 : {ordered.orderedItems}
                </Ordereddiv>
                <Ordereddiv>&nbsp;주문 시간 : {ordered.orderedTime}</Ordereddiv>
              </List>
              <span>
                <Okbutton onClick={okSubmit}>승낙하기</Okbutton>
                <Nobutton onClick={noSubmit}>취소하기</Nobutton>
              </span>
              <div>&nbsp;</div>
            </>
          )}
          {showPopup ? (
            <ToggledBackgroundWrap>
              <ToggleWrap>
                <br />
                <Ordereddiv>&nbsp;주문 순서 : {ordered.orderedNo}</Ordereddiv>
                <Ordereddiv>
                  &nbsp;주문 내역 : {ordered.orderedItems}
                </Ordereddiv>
                <Ordereddiv>&nbsp;주문 시간 : {ordered.orderedTime}</Ordereddiv>
                <br />
                <br />
                <Askingdiv>정말 취소하시겠습니까?</Askingdiv>
                <br />
                <span>
                  <ReadyButtonWrap /*onClick ={배열에서삭제}*/>
                    Y
                  </ReadyButtonWrap>
                  <CancelButtonWrap onClick={togglePopup}>N</CancelButtonWrap>
                </span>
                <br />
              </ToggleWrap>
            </ToggledBackgroundWrap>
          ) : null}
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
  background-color: lightgray;
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
  position: absolute;
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
const CancelButtonWrap = styled.button`
  background-color: #202070;
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  padding: 10px 20.5px;
  margin: 0 10px 0 50px;
  opacity: 0.6;
`;

const ReadyButtonWrap = styled.button`
  background-color: black;
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 10px;
  padding: 10px 20.5px;
`;
