import React, { useState, useEffect, useCallback } from "react";
import Americano from "../../assets/image/Americano.svg";
import AppleAde from "../../assets/image/AppleAde.svg";
import GreenAppleAde from "../../assets/image/GreenAppleAde.svg";
import Dacquoise from "../../assets/image/Dacquoise.svg";
import ButterDacquoise from "../../assets/image/ButterDacquoise.svg";
import ChocoDacquoise from "../../assets/image/ChocoDacquoise.svg";
import CreamDacquoise from "../../assets/image/CreamDacquoise.svg";
import PinkSaltDacquoise from "../../assets/image/PinkSaltDacquoise.svg";
import StrawberryDacquoise from "../../assets/image/StrawberryDacquoise.svg";
import TiramisuDacquoise from "../../assets/image/TiramisuDacquoise.svg";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from "../Main/Slide";
import styled from "styled-components";
import axios from "axios";

const TitleArray = ["케이크", "음료수", "주류"];

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:5000";

export default function MenuList() {
  const [menu, setMenu] = useState(TitleArray[0]);
  const [APImenu, setAPImenu] = useState([]);
  // API에서 값 받아오기
  useEffect(() => {
    axios
      .get("/start/v1")
      .then((res) => {
        setAPImenu(res.data.data);
        console.log("불러오기 성공");
        console.log(APImenu);
      })
      .catch((err) => console.error(err))
      .finally(console.log(APImenu));
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

  const onSubmit = ({ e, props }) => {
    e.preventDefault();
    try {
      const data = cart;
      axios
        .post("/order/", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log("전송완료");
          props.history.push("/pay");
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
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].itemPrice;
  }

  console.log(cart);
  const CakeList = APImenu.filter((data) => {
    return data.itemClass === "cake";
  });

  const DrinkList = APImenu.filter((data) => {
    return data.itemClass === "drink";
  });

  const AlcoholList = APImenu.filter((data) => {
    return data.itemClass === "alcohol";
  });

  let [targetArray, setTargetArray] = useState(CakeList);

  const handleButtonClick = (e) => {
    setMenu(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "케이크") {
      setTargetArray(CakeList);
    } else if (e.target.value === "음료수") {
      setTargetArray(DrinkList);
    } else if (e.target.value === "주류") {
      setTargetArray(AlcoholList);
    }
  };

  return (
    <>
      <TitleWrap>
        {TitleArray.map((menu, idx) => {
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
          const onAdd = () => {
            onAddCart({ itemCode, itemName, itemPrice });
          };
          return (
            <>
              <MenuWrap onClick={onAdd} key={menu.id} id={menu.id}>
                <img
                  style={{ width: "43px", height: "61px" }}
                  src={thumbnail}
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
        <SubmitButtonWrap obSubmit={onSubmit}>
          <PayButtonWrap>결제하기</PayButtonWrap>
        </SubmitButtonWrap>
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

const SubmitButtonWrap = styled.button`
  width: 100%;
  text-decoration: none;
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 16px;
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

const EmptyMenuWrap = styled.div`
  width: 86px;
  height: 81px;
  background-color: #f6f6ff;
  border: 1px solid #493e3e;
  box-shadow: inset 0px 3px 3px #aaa;
  border-radius: 10px;
  text-align: center;
  margin: 0 3px;
`;

const EmptyMenuNameWrap = styled.p`
  font-weight: bold;
  font-size: 24px;
  margin-top: 27px;
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
