import React, { useState, useEffect } from "react";
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
import styled from "styled-components";
import axios from "axios";

const TitleArray = ["커피", "디저트", "베이커리", "에이드"];

const menuArray = [
  {
    id: 1,
    itemClass: "커피",
    itemCode: "item001",
    itemName: "아메리카노(ICE)",
    itemPrice: "4,100원",
    thumbnail: Americano,
  },
  {
    id: 2,
    itemClass: "커피",
    itemCode: "item002",
    itemName: "아메리카노(ICE)",
    itemPrice: "4,100원",
    thumbnail: Americano,
  },
  {
    id: 3,
    itemClass: "에이드",
    itemCode: "item003",
    itemName: "사과에이드",
    itemPrice: "5,200원",
    thumbnail: AppleAde,
  },
  {
    id: 4,
    itemClass: "커피",
    itemCode: "item004",
    itemName: "아메리카노(ICE)",
    itemPrice: "4,100원",
    thumbnail: Americano,
  },
  {
    id: 5,
    itemClass: "디저트",
    itemCode: "item005",
    itemName: "다쿠아즈",
    itemPrice: "2,500원",
    thumbnail: Dacquoise,
  },
  {
    id: 6,
    itemClass: "디저트",
    itemCode: "item006",
    itemName: "마카롱",
    itemPrice: "2,500원",
    thumbnail: Americano,
  },
  {
    id: 7,
    itemClass: "에이드",
    itemCode: "item007",
    itemName: "그린애플에이드(ICE)",
    itemPrice: "5,200원",
    thumbnail: GreenAppleAde,
  },
  {
    id: 8,
    itemClass: "베이커리",
    itemCode: "item008",
    itemName: "크림빵",
    itemPrice: "1,800원",
    thumbnail: Americano,
  },
  {
    id: 9,
    itemClass: "베이커리",
    itemCode: "item009",
    itemName: "앙버터다쿠아즈",
    itemPrice: "2,800원",
    thumbnail: ButterDacquoise,
  },
  {
    id: 10,
    itemClass: "베이커리",
    itemCode: "item010",
    itemName: "초코가나슈다쿠아즈",
    itemPrice: "2,800원",
    thumbnail: ChocoDacquoise,
  },
  {
    id: 11,
    itemClass: "베이커리",
    itemCode: "item011",
    itemName: "크림브륄레다쿠아즈",
    itemPrice: "2,800원",
    thumbnail: CreamDacquoise,
  },
  {
    id: 12,
    itemClass: "베이커리",
    itemCode: "item012",
    itemName: "핑크솔트다쿠아즈",
    itemPrice: "2,800원",
    thumbnail: PinkSaltDacquoise,
  },
  {
    id: 13,
    itemClass: "베이커리",
    itemCode: "item013",
    itemName: "산딸기앙글레이즈다쿠아즈",
    itemPrice: "2,800원",
    thumbnail: StrawberryDacquoise,
  },
  {
    id: 14,
    itemClass: "베이커리",
    itemCode: "item014",
    itemName: "티라미수더블다쿠아즈",
    itemPrice: "2,800원",
    thumbnail: TiramisuDacquoise,
  },
];

export default function MenuList() {
  const [menu, setMenu] = useState(TitleArray[0]);
  const CoffeeList = menuArray.filter((data) => {
    return data.itemClass === "커피";
  });

  const DeesertList = menuArray.filter((data) => {
    return data.itemClass === "디저트";
  });

  const BakeryList = menuArray.filter((data) => {
    return data.itemClass === "베이커리";
  });

  const AdeList = menuArray.filter((data) => {
    return data.itemClass === "에이드";
  });

  let [targetArray, setTargetArray] = useState(CoffeeList);

  // const [menu, setMenu] = useState([]);

  // API에서 값 받아오기
  // useEffect(() => {
  //   axios
  //     .get("/start/v1")
  //     .then((res) => {
  //       setMenu(res.data);
  //       console.log("불러오기 성공");
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // const [cart, setCart] = useState({
  //   name: "",
  //   price: "",
  // });
  // const { name, price } = cart;
  // const onAddCart = (e) => {
  //   console.log("ddd");
  //   const { name, price } = e.target;
  //   setCart({
  //     ...cart,
  //   });
  // };

  const handleButtonClick = (e) => {
    setMenu(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "커피") {
      setTargetArray(CoffeeList);
    } else if (e.target.value === "에이드") {
      setTargetArray(AdeList);
    } else if (e.target.value === "디저트") {
      setTargetArray(DeesertList);
    } else if (e.target.value === "베이커리") {
      setTargetArray(BakeryList);
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
                defaultChecked={menu === "커피"}
                onChange={handleButtonClick}
              ></InputWrap>
              <ButtonWrap>{menu}</ButtonWrap>
            </MenuBtnLabel>
          );
        })}
      </TitleWrap>
      <MenuListWrap>
        {targetArray.map((menu) => (
          <>
            <MenuWrap /*onClick={onAddCart}*/ key={menu.id} id={menu.id}>
              <img
                style={{ width: "43px", height: "61px" }}
                src={menu.thumbnail}
                alt={menu.itemName}
              />
              <MenuNameWrap>{menu.itemName}</MenuNameWrap>
              <MenuNameWrap>{menu.itemPrice}</MenuNameWrap>
            </MenuWrap>
          </>
        ))}
      </MenuListWrap>
    </>
  );
}

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
