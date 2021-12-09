import React, { useEffect } from "react";
import Header from "../components/common/Header";
import Check from "../assets/image/Check.svg";
import GotoStart from "../components/Complete/GotoStart";
import CancelOrder from "../components/Complete/CancelOrder";
import styled from "styled-components";

export default function Complete({ location }) {
  useEffect(() => {
    console.log("받아온 값: ", location);
    console.log("location.props: ", location.props);
  });

  return (
    <>
      <Header />
      <CompleteWrap>
        <CompleteMsg>
          주문이 완료되었습니다.
          <br />
        </CompleteMsg>
        <img
          style={{
            width: "85px",
            height: "85px",
            marginLeft: "150px",
            marginTop: "50px",
          }}
          src={Check}
          id="Check"
          alt="Check"
        />
      </CompleteWrap>
      <Ordernum>주문 순번 : {location.props.orderCode}</Ordernum>
      <Predtime>예상대기시간 : {location.props.timeComplete}</Predtime>
      <GotoStart />
      <CancelOrder />
    </>
  );
}
const Predtime = styled.p`
  display: flex;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  margin: 15px 0 10px 0;
  color: black;
`;

const CompleteWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const CompleteMsg = styled.p`
  display: flex;
  justify-content: center;
  font-size: 21px;
  font-weight: bold;
  margin: 100px 0 10px 15px;
  color: black;
`;
const Ordernum = styled.p`
  display: flex;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  margin: 15px 0 10px 0;
  color: black;
`;
