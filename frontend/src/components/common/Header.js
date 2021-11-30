import React from "react";
import styled from "styled-components";
import Logo from "../../assets/image/Logo.svg";

const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid black;
`;

const TitleWrap = styled.p`
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 36px;
  font-weight: bold;
  margin: 18px 0 10px 0;
  color: #493e3e;
`;

const Header = () => {
  return (
    <HeaderWrap>
      <img
        style={{ width: "48px", height: "50px", margin: "13px 10px 15px 0" }}
        src={Logo}
        id="Logo"
        alt="Logo"
      />
      <TitleWrap>ABC COFFEE</TitleWrap>
    </HeaderWrap>
  );
};

export default Header;
