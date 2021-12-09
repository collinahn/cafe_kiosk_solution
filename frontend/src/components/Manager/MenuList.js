import React, { useState, useEffect } from "react";
import Americano from "../../assets/image/Americano.svg";
import styled from "styled-components";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:5000";

export default function MenuList() {
  const [classification, setClassification] = useState([]);
  const [APImenu, setAPImenu] = useState([]);

  useEffect(() => {
    axios
      .get("/start/v1")
      .then((res) => {
        setAPImenu(res.data.data);
        setClassification(res.data.classification);
        console.log("불러오기 성공!!!!!!!!!!!");
        console.log(APImenu);
      })
      .catch((err) => console.error(err));
  }, []);

  const BrunchList = APImenu.filter((data) => {
    return data.itemClass === "브런치";
  });

  const DeesertList = APImenu.filter((data) => {
    return data.itemClass === "디저트";
  });

  const CoffeeList = APImenu.filter((data) => {
    return data.itemClass === "커피";
  });

  const DrinkList = APImenu.filter((data) => {
    return data.itemClass === "음료";
  });

  let [targetArray, setTargetArray] = useState(BrunchList);

  const handleButtonClick = (e) => {
    console.log(e.target.value);
    if (e.target.value === "브런치") {
      setTargetArray(BrunchList);
    } else if (e.target.value === "디저트") {
      setTargetArray(DeesertList);
    } else if (e.target.value === "커피") {
      setTargetArray(CoffeeList);
    } else if (e.target.value === "음료") {
      setTargetArray(DrinkList);
    }
  };

  return (
    <>
      <TitleWrap>
        {classification.map((menu, idx) => {
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
      </TitleWrap>
      <MenuListWrap>
        {/* avail, itemClass, itemCode, itemName, itemPrice, thumbnail */}
        {targetArray.map((menu) => {
          const { thumbnail, itemName, itemPrice, itemCode, itemClass } = menu;
          /* const onAdd = () => {
            onAddCart({ itemCode, itemName, itemPrice });
          }; */
          return (
            <>
              <MenuWrap /*onClick={onAdd}*/ key="{menu}" id={menu.id}>
                <img
                  style={{ width: "43px", height: "61px" }}
                  src={Americano}
                  alt={itemName}
                />
                <MenuNameWrap>{itemName}</MenuNameWrap>
                <MenuNameWrap>{itemPrice}</MenuNameWrap>
                <RestWrap>{itemCode}</RestWrap>
                <RestWrap>{itemClass}</RestWrap>
              </MenuWrap>
            </>
          );
        })}
      </MenuListWrap>
    </>
  );
}
const RestWrap = styled.div`
  display: none;
`;

const MenuListWrap = styled.div`
  height: 322px;
  overflow: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MenuWrap = styled.div`
  width: 86px;
  height: 81px;
  text-align: center;
  margin: 0 5px 30px 0;
`;

const MenuNameWrap = styled.p`
  text-align: center;
  font-size: 11px;
  margin: 0;
`;

const TitleWrap = styled.div`
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
