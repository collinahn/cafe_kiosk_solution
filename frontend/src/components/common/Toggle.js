import React, { useState /* useEffect */ } from "react";
import styled from "styled-components";
// import axios from "axios";

const menuArray = ["커피", "에이드", "베이커리", "디저트"];

export default function Toggle() {
  const [menu, setMenu] = useState("");
  // const [classification, setClassfication] = useState("");
  // useEffect(() => {
  //   axios
  //     .get("/start/v1")
  //     .then((res) => {
  //       setClassfication(res.classification);
  //       console.log("카테고리 불러오기 성공");
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  const handleButtonClick = (e) => {
    setMenu(e.target.value);
    console.log(e.target.value);
  };
  return (
    <MenuWrap>
      {menuArray.map((menu, idx) => {
        return (
          <MenuBtnLabel id="menu" key={idx}>
            <InputWrap
              type="radio"
              name="menu"
              value={menu}
              id="menu"
              onChange={handleButtonClick}
            ></InputWrap>
            <ButtonWrap>{menu}</ButtonWrap>
          </MenuBtnLabel>
        );
      })}
    </MenuWrap>
  );
}

const MenuWrap = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid black;
  background-color: #f6f6ff;
  height: 40px;
`;

const MenuBtnLabel = styled.label`
  margin: -15px 10px;
`;

const InputWrap = styled.input`
  visibility: hidden;
  appearance: none;
`;

const ButtonWrap = styled.div`
  background-color: transparent;
  color: black;
  font-size: 15px;
  font-weight: bold;
  border-radius: 18px;
  border: none;
  padding: 7px 15px;
  ${InputWrap}:checked + && {
    background-color: #493e3e;
    color: white;
  }
  &:hover {
    box-shadow: 0px 3px 15px -5px rgba(0, 0, 0, 0.3);
  }
`;
