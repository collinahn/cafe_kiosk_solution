import React, { useEffect } from "react";
import Header from "../components/common/Header";
import TopBar from "../components/Order/TopBar";
import Americano from "../assets/image/Americano.svg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Order({ location }) {
  const history = useHistory();
  let sum = 0;
  for (let i = 0; i < location.props.length; i++) {
    sum = sum + location.props[i].itemPrice;
  }
  useEffect(() => {
    console.log("받아온 값: ", location);
    console.log("location.props: ", location.props);
  });

  const onSubmit = () => {
    try {
      let array = {};
      let data = {};
      for (let i = 0; i < location.props.length; i++) {
        data[location.props[i].itemCode] = location.props[i].quantity;
      }
      array["order"] = data;
      console.log(array);
      axios
        .post("/order/", array, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log("전송완료");
          history.push({
            pathname: "/complete",
            props: res.data,
          });
        })
        .catch((e) => {
          console.log("fail because of" + e);
        })
        .finally((e) => {
          console.log("sending process over");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <TopBar />
      <MenuListWrap>
        {location.props.map((menu, idx) => (
          <>
            <MenuBox>
              <MenuWrap key={idx}>
                <img
                  style={{ width: "43px", height: "61px" }}
                  src={Americano}
                  alt={menu.itemName}
                />
                <MenuNameWrap>{menu.itemName}</MenuNameWrap>
                <MenuNameWrap>{menu.itemPrice}</MenuNameWrap>
              </MenuWrap>

              <CountWrap>
                <Button>-</Button>
                <Result>{menu.quantity}</Result>
                <Button>+</Button>
              </CountWrap>

              <TotalWrap>
                <MenuNameWrap>{menu.itemPrice}</MenuNameWrap>
              </TotalWrap>
            </MenuBox>
          </>
        ))}
        <UnderBarWrap>총주문금액: {sum} </UnderBarWrap>
      </MenuListWrap>

      <ButtonWrap>
        <SubmitBtnWrap onClick={onSubmit}>
          <PayButtonWrap>카드로 결제하기</PayButtonWrap>
        </SubmitBtnWrap>
      </ButtonWrap>
    </>
  );
}
const SubmitBtnWrap = styled.div`
  border: none;
  width: 100%;
  padding: 0;
`;

const ButtonWrap = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;

const PayButtonWrap = styled.div`
  background-color: #dadcff;
  color: black;
  padding: 18px 0;
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

const UnderBarWrap = styled.div`
  display: flex;
  justify-content: center;
  background-color: #d8d8d8;
  padding: 20px;
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

const MenuListWrap = styled.div`
  padding-top: 3px;
  padding-left: 0px;
  flex-direction: column;
`;

const MenuBox = styled.div`
  display: inline-flex;
  width: 100%;
  background-color: #eeeeee;
  margin: 5px 5px 2px 0;
`;

const MenuWrap = styled.div`
  width: 100px;
  text-align: center;
  margin: 5px 5px 2px 0;
  background-color: #eeeeee;
`;

const MenuNameWrap = styled.p`
  text-align: center;
  font-size: 11px;
  margin: 0;
`;

const CountWrap = styled.p`
  display: inline-flex;
  margin-left: 55px;
  margin-top: 40px;
  margin-bottom: 46px;
  font-size: 15px;
  background-color: white;
`;

const Button = styled.button`
  width: 24px;
  height: 24px;
  font-weight: bold;
  border: 1.5px solid black;
  background-color: white;
`;

const Result = styled.div`
  border-top: 1.5px solid black;
  border-bottom: 1.5px solid black;
  width: 24px;
  text-align: center;
`;

const TotalWrap = styled.p`
  margin-top: 42px;
  margin-left: 50px;
  font-weight: bold;
  font-size: 20px;
  text-shadow: 0.5px 0.5px 0.5px #493e3e;
`;
