import React, { useState, useEffect, useCallback } from "react";
import Americano from "../../assets/image/Americano.svg";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from "../Main/Slide";
import styled from "styled-components";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:5000";

export default function MenuList() {
  let [targetArray, setTargetArray] = useState([]);
  const [classification, setClassification] = useState([]);
  const [coffeeList, setCoffeeList] = useState([]);
  const [brunchList, setBrunchList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [dessertList, setDessertList] = useState([]);

  // API에서 값 받아오기
  useEffect(() => {
    axios
      .get("/start/v1")
      .then((res) => {
        console.log(res.data);
        setCoffeeList(
          res.data.data.filter((menu) => {
            return menu.itemClass === "커피";
          })
        );
        setDessertList(
          res.data.data.filter((menu) => {
            return menu.itemClass === "디저트";
          })
        );
        setBrunchList(
          res.data.data.filter((menu) => {
            return menu.itemClass === "브런치";
          })
        );
        setDrinkList(
          res.data.data.filter((menu) => {
            return menu.itemClass === "음료";
          })
        );
        setClassification(res.data.classification);
      })
      .catch((err) => console.error(err))
      .finally();
  }, []);

  const [cart, setCart] = useState([]);
  const onAddCart = useCallback(({ itemCode, itemName, itemPrice }) => {
    setCart((orders) => {
      const find = orders.find((one) => one.itemCode === itemCode);
      if (find === undefined) {
        return [
          ...orders,
          {
            itemCode: itemCode,
            itemName: itemName,
            itemPrice: itemPrice,
            quantity: 1,
          },
        ];
      } else {
        return orders.map((one) =>
          one.itemCode === itemCode
            ? {
                itemCode: itemCode,
                itemName: itemName,
                quantity: one.quantity + 1,
                itemPrice: one.itemPrice + itemPrice,
              }
            : one
        );
      }
    });
  }, []);

  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].itemPrice;
  }

  // console.log("CoffeeList", CoffeeList);

  useEffect(() => {
    if (dessertList.length > 0) {
      setTargetArray(dessertList);
      console.log("성공!!!");
    } else {
      console.log("비어있어요 ㅜ");
    }
  }, [dessertList]);

  const handleButtonClick = (e) => {
    if (e.target.value === "브런치") {
      setTargetArray(brunchList);
    } else if (e.target.value === "디저트") {
      setTargetArray(dessertList);
    } else if (e.target.value === "커피") {
      setTargetArray(coffeeList);
    } else if (e.target.value === "음료") {
      setTargetArray(drinkList);
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
                defaultChecked={menu === "디저트"}
                onChange={handleButtonClick}
              ></InputWrap>
              <ButtonWrap>{menu}</ButtonWrap>
            </MenuBtnLabel>
          );
        })}
      </TitleWrap>
      <MenuListWrap>
        {targetArray.map((menu) => {
          const { thumbnail, itemName, itemPrice, itemCode, itemClass } = menu;
          const onAdd = () => {
            onAddCart({ itemCode, itemName, itemPrice });
          };
          return (
            <>
              <MenuWrap onClick={onAdd} key={menu.id} id={menu.id}>
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
      <CartWrap>
        <CartTitleWrap>
          <TextWrap>장바구니</TextWrap>
          <PriceWrap>총 주문금액 ₩{sum}</PriceWrap>
        </CartTitleWrap>
        <Slide menuArray={cart} />
      </CartWrap>
      <BottomButtonWrap>
        <LinkWrap to="/">
          <CloseButtonWrap>취소하기</CloseButtonWrap>
        </LinkWrap>
        <LinkWrap
          to={{
            pathname: "/order",
            props: cart,
          }}
        >
          <PayButtonWrap>결제하기</PayButtonWrap>
        </LinkWrap>
      </BottomButtonWrap>
    </>
  );
}

const CartWrap = styled.div`
  border-top: 2px solid black;
  background-color: #f6f6ff;
`;
const RestWrap = styled.div`
  display: none;
`;
const CartTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  color: #493e3e;
  font-size: 16px;
  font-weight: 500;
`;

const LinkWrap = styled(Link)`
  width: 100%;
  text-decoration: none;
`;

const BottomButtonWrap = styled.div`
  border-top: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
`;

const CloseButtonWrap = styled.div`
  background-color: black;
  color: white;
  padding: 5px 0;
  border: 2px solid black;
`;

const PayButtonWrap = styled.div`
  color: #493e3e;
  padding: 5px 0;
`;

const TextWrap = styled.p`
  margin: 15px 0 5px 50px;
  font-weight: bold;
  font-size: 16px;
  margin-left: 50px;
`;
const PriceWrap = styled.p`
  margin: 15px 50px 5px 0;
  font-weight: bold;
  font-size: 16px;
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
