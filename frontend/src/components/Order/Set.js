import React, { useState, useEffect } from "react";
import Americano from "../../assets/image/Americano.svg";
import GreenAppleAde from "../../assets/image/GreenAppleAde.svg";
import Dacquoise from "../../assets/image/Dacquoise.svg";
import CreamDacquoise from "../../assets/image/CreamDacquoise.svg";
import ChocoDacquoise from "../../assets/image/ChocoDacquoise.svg";
import styled from "styled-components";
//import axios from "axios";

const orderArray = [
  {
    id: 1,
    itemClass: "메뉴",
    itemCode: "item001",
    itemName: "아메리카노(ICE)",
    itemPrice: "4100",
    itemQuantity: 1,
    thumbnail: Americano,
  },
  {
    id: 2,
    itemClass: "메뉴",
    itemCode: "item002",
    itemName: "다쿠아즈",
    itemPrice: "2500",
    itemQuantity: 2,
    thumbnail: Dacquoise,
  },
  {
    id: 3,
    itemClass: "메뉴",
    itemCode: "item03",
    itemName: "그린애플에이드(ICE)",
    itemPrice: "5200",
    itemQuantity: 1,
    thumbnail: GreenAppleAde,
  },
  {
    id: 4,
    itemClass: "메뉴",
    itemCode: "item004",
    itemName: "초코다쿠아즈",
    itemPrice: "2500",
    itemQuantity: 1,
    thumbnail: ChocoDacquoise,
  },
  {
    id: 5,
    itemClass: "메뉴",
    itemCode: "item005",
    itemName: "크림다쿠아즈",
    itemPrice: "2500",
    itemQuantity: 1,
    thumbnail: CreamDacquoise,
  },
  
]

const OrderList = () => {
  let sum=0;
  //const [menu, setMenu] = useState('');
  let priceArray = [];
  const MenuList = orderArray.filter((data) => {
    return data.itemClass === "메뉴";
  });
 
  let [targetArray, setTargetArray] = useState(MenuList);


  const [number, setNumber] = useState(1);
  
  const increaseNumber = () => { 
    setNumber(number => number + 1);
  };
  const decreaseNumber = () => { 
    setNumber(number => number - 1);
  };

  for (let i=0; i<orderArray.length; i++) {
    priceArray.unshift(parseInt(orderArray[i].itemPrice) * orderArray[i].itemQuantity);
  }

  for (let i=0; i<orderArray.length; i++) {
    sum = sum + parseInt(orderArray[i].itemPrice)
  }
  
  return (
 
    <>  
      <MenuListWrap>
        {targetArray.map((menu) => (
          <>
              <MenuBox>
                <MenuWrap  key={menu.id} id={menu.id}>
                      <img
                        style={{ width: "43px", height: "61px" }}
                              src={menu.thumbnail}
                              alt={menu.itemName}/>
                      <MenuNameWrap>{menu.itemName}</MenuNameWrap>
                      <MenuNameWrap>{menu.itemPrice}</MenuNameWrap>
                </MenuWrap>

                <CountWrap>
                    <Button onClick={decreaseNumber}
                    >-</Button>
                    <Result>{menu.itemQuantity}</Result>
                    <Button onClick={increaseNumber}
                    >+</Button>
                </CountWrap>

                <TotalWrap>
                  <MenuNameWrap>{menu.itemPrice}</MenuNameWrap>
                </TotalWrap>
              </MenuBox>
                  
          </>
        ))}
        <UnderBarWrap>총주문금액: {sum} </UnderBarWrap>
      </MenuListWrap>
    </>
  );
}

export default OrderList;

const UnderBarWrap = styled.div`
  display: flex;
  justify-content: center;
  background-color: #D8D8D8;
  padding: 20px;
  text-shadow: 1px 1px 2px #493e3e;
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

const MenuListWrap = styled.div`
  padding-top: 3px;
  padding-left: 0px;
  flex-direction: column;
`;

const MenuBox = styled.div`
  display: inline-flex;
  width: 100%;
  background-color: #EEEEEE;
  margin: 5px 5px 2px 0;
`;

const MenuWrap = styled.div`
  width: 100px;
  text-align: center;
  margin: 5px 5px 2px 0;
  background-color: #EEEEEE;
`;

const MenuNameWrap = styled.p`
  text-align: center;
  font-size: 11px;
  margin: 0;
`;

const CountWrap = styled.p`
  display: inline-flex;
  margin-left: 55px;
  margin-top: 40px;
  margin-bottom: 46px;
  font-size: 15px;
  background-color: white;  
`;

const Button = styled.button`
  width: 24px;
  height: 24px;
  font-weight: bold;
  border: 1.5px solid black;
  background-color: white;
`;

const Result = styled.div`
  border-top: 1.5px solid black;
  border-bottom: 1.5px solid black;
  width: 24px;
  text-align: center;
`;

const TotalWrap = styled.p`
  margin-top: 42px;
  margin-left: 50px;
  font-weight: bold; 
  font-size: 20px;
  text-shadow: 0.5px 0.5px 0.5px #493e3e;
`;
