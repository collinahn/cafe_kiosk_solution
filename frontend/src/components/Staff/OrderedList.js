import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:5000";

export default function OrderedList() {
  const [OrderedArray, setOrderedArray] = useState([]);
  useEffect(() => {
    axios.get("/staff/").then((res) => {
      console.log(res);
      setOrderedArray(res.data.queue);
      console.log(res.data.queue);
      console.log("성공");
    });
  }, []);

  const [confirmed, setConfirmed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [inputs, setInputs] = useState({
    orderCode: "",
    orderDetails: "",
    time: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const togglePopup = () => {
    showPopup ? setShowPopup(false) : setShowPopup(true);
  };

  const onClickSubmit = (id) => {
    axios
      .post("/staff/", { orderCode: id, status: 2000 })
      .then((res) => {
        console.log(res);
        console.log("승낙했습니다");
        alert("승낙했습니다.");
      })
      .catch((e) => console.error(e))
      .finally(console.log("주문 송신 프로세스 종료"));
  };
  const onClickCancel = (id) => {
    axios
      .post("/staff/", { orderCode: id, status: 4000 })
      .then((res) => {
        console.log(res);
        console.log("취소했습니다.");
        alert("취소가 완료되었습니다.");
        setShowPopup(false);
      })
      .catch((e) => console.error(e))
      .finally(console.log("주문 취소 프로세스 종료"));
    // console.log(id);
    // setOrderedArray(OrderedArray.filter((order) => order.id !== id));
    // console.log(OrderedArray);
  };
  return (
    <>
      {OrderedArray.map((ordered, idx) => (
        <>
          {!ordered.orderConfirmed && (
            <>
              <List id={idx}>
                <Ordereddiv>&nbsp;주문 순서: {ordered.orderCode}</Ordereddiv>
                <Ordereddiv>
                  &nbsp;주문 내역
                  <br />
                  {Object.entries(ordered.orderDetails).map(([key, value]) => (
                    <DictDiv>
                      <div>{key}</div>
                      <ValueDiv>{value}EA</ValueDiv>
                    </DictDiv>
                  ))}
                </Ordereddiv>
                <Ordereddiv>&nbsp;주문 시간 : {ordered.time}</Ordereddiv>
              </List>
              <span>
                <Okbutton onClick={() => onClickSubmit(ordered.orderCode)}>
                  완료하기
                </Okbutton>
                <Nobutton onClick={() => setShowPopup(true)}>취소하기</Nobutton>
              </span>
              <div>&nbsp;</div>
            </>
          )}
          {showPopup ? (
            <ToggledBackgroundWrap>
              <ToggleWrap>
                <br />
                <Ordereddiv>&nbsp;주문 순서: {ordered.orderCode}</Ordereddiv>
                <Ordereddiv>
                  &nbsp;주문 내역
                  <br />
                  {Object.entries(ordered.orderDetails).map(([key, value]) => (
                    <DictDiv>
                      <div>{key}</div>
                      <ValueDiv>{value}EA</ValueDiv>
                    </DictDiv>
                  ))}
                </Ordereddiv>
                <Ordereddiv>&nbsp;주문 시간 : {ordered.time}</Ordereddiv>
                <br />
                <br />
                <Askingdiv>정말 취소하시겠습니까?</Askingdiv>
                <br />
                <ButtonWrap>
                  <ReadyButtonWrap
                    onClick={() => onClickCancel(ordered.orderCode)}
                  >
                    Y
                  </ReadyButtonWrap>
                  <CancelButtonWrap onClick={togglePopup}>N</CancelButtonWrap>
                </ButtonWrap>
                <br />
              </ToggleWrap>
            </ToggledBackgroundWrap>
          ) : null}
        </>
      ))}
    </>
  );
}

const ButtonWrap = styled.div`
  text-align: center;
`;

const ValueDiv = styled.div`
  padding-left: 10px;
`;

const DictDiv = styled.div`
  padding: 0 6px;
  display: flex;
  justify-content: space-between;
`;

const List = styled.div`
  background-color: lightgray;
  padding-top: 5px;
`;

const Ordereddiv = styled.div`
  text-shadow: 1px 0px 1px #493e3e;
  font-size: 10;
`;

const Askingdiv = styled.div`
  text-shadow: 1px 0px 1px #493e3e;
  font-size: 20;
  text-align: center;
`;

const Okbutton = styled.button`
  width: 50%;
  height: 30px;
  background-color: black;
  color: white;
  text-align: center;
  border: 1px solid black;
  font-weight: bold;
  border-radius: 1px;
`;

const Nobutton = styled.button`
  width: 50%;
  height: 30px;
  background-color: white;
  color: black;
  text-align: center;
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

// const OrderedArray = [
//   {
//     id: 1,
//     orderedNo: "001",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 21:29",
//     orderConfirmed: false,
//   },
//   {
//     id: 2,
//     orderedNo: "002",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 21:31",
//     orderConfirmed: false,
//   },
//   {
//     id: 3,
//     orderedNo: "003",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 21:32",
//     orderConfirmed: false,
//   },
//   {
//     id: 4,
//     orderedNo: "004",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 21:33",
//     orderConfirmed: false,
//   },
//   {
//     id: 5,
//     orderedNo: "005",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 22:00",
//     orderConfirmed: false,
//   },
//   {
//     id: 6,
//     orderedNo: "006",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 22:09",
//     orderConfirmed: false,
//   },
//   {
//     id: 7,
//     orderedNo: "007",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 22:14",
//     orderConfirmed: false,
//   },
//   {
//     id: 8,
//     orderedNo: "008",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 22:19",
//     orderConfirmed: false,
//   },
//   {
//     id: 9,
//     orderedNo: "009",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 22:25",
//     orderConfirmed: false,
//   },
//   {
//     id: 10,
//     orderedNo: "010",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 22:29",
//     orderConfirmed: false,
//   },
//   {
//     id: 11,
//     orderedNo: "011",
//     orderedItems: "아메리카노(ICE)*5EA",
//     orderedTime: "2021/10/23 22:49",
//     orderConfirmed: false,
//   },
// ];
