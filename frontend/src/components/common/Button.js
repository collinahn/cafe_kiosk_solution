import React, { useState } from "react";
import styled from "styled-components";

const Button = ({ id, name, isToggle }) => {
  const [animal, setAnimal] = useState("");
  const [toggle, setToggle] = useState(isToggle);
  const color = toggle ? "#493e3e" : "transparent";
  const textcolor = toggle ? "white" : "black";

  const onChangeColor = (e) => {
    setAnimal(e.target.value);
    setToggle(!toggle);
    console.log(animal);
  };
  return (
    <ButtonWrap
      id={id}
      onClick={onChangeColor}
      style={{ backgroundColor: color, color: textcolor }}
    >
      {name}
    </ButtonWrap>
  );
};

export default Button;

const ButtonWrap = styled.div`
  background-color: #493e3e;
  color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 7px 25px;
  margin: 9px 0;
  border-radius: 18px;
  border: none;
`;
