import React from "react";
import styled from "styled-components";
import Logo from "../../assets/image/Logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <FixedWrap>
        <HeaderWrap>
          <img
            style={{
              width: "48px",
              height: "50px",
              margin: "13px 10px 15px 0",
            }}
            src={Logo}
            id="Logo"
            alt="Logo"
          />
          <TitleWrap>
            ABC COFFEE-
            <br />
            &nbsp;&nbsp;&nbsp;Order
          </TitleWrap>
        </HeaderWrap>
        <LeftLink to="/Staff">&nbsp;&nbsp;&nbsp;주문&nbsp;현황</LeftLink>
      </FixedWrap>
      <MarginBox></MarginBox>
    </>
  );
};

export default Header;

const MarginBox = styled.div`
  background-color: white;
  width: 393px;
  height: 170px;
`;

const FixedWrap = styled.div`
  background-color: white;
  position: fixed;
  width: 393px;
`;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleWrap = styled.p`
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 36px;
  font-weight: bold;
  margin: 18px 0 10px 0;
  color: #493e3e;
`;

const LeftLink = styled(Link)`
  text-decoration-line: none;
  color: #493e3e;
  text-shadow: 1px 1px 1px #493e3e;
  font-size: 24px;
  font-weight: bold;
  margin: 0px 0 10px 0;
`;
