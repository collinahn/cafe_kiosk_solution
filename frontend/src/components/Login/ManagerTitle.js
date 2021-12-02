import React from "react";
import styled from "styled-components";
import Logo from "../../assets/image/Logo.svg";

const ManagerTitle = () => {
  return (
    <TitleWrap>
      <img
        style={{ width: "48px", height: "50px", margin: "18px 10px 15px 0" }}
        src={Logo}
        id="Logo"
        alt="Logo"
      />
      <NameWrap>
        ABC COFFEE-
        <br />
        &nbsp;&nbsp;manager
      </NameWrap>
    </TitleWrap>
  );
};

export default ManagerTitle;

const TitleWrap = styled.div`
  margin-top: 110px;
  display: flex;
  justify-content: center;
`;

const NameWrap = styled.p`
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 36px;
  font-weight: bold;
  margin: 18px 0 10px 0;
  color: #493e3e;
`;
