import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import MenuList from "../components/common/MenuList";
import Cart from "../components/Main/Cart";
import "../assets/css/Manager.css";
import axios from "axios";
import "../assets/css/Main.css";

const cartArray = [
  {
    id: 1,
    category: "커피",
    name: "아메리카노(ICE)",
    price: 4100,
  },
  {
    id: 2,
    category: "에이드",
    name: "사과에이드",
    price: 5200,
  },
  {
    id: 3,
    category: "디저트",
    name: "다쿠아즈",
    price: 1800,
  },
  {
    id: 4,
    category: "디저트",
    name: "마카롱",
    price: 2500,
  },
  {
    id: 5,
    category: "베이커리",
    name: "크림빵",
    price: 2500,
  },
  {
    id: 6,
    category: "베이커리",
    name: "크림빵",
    price: 2500,
  },
  {
    id: 7,
    category: "베이커리",
    name: "크림빵",
    price: 2500,
  },
  {
    id: 8,
    category: "베이커리",
    name: "크림빵",
    price: 2500,
  },
  {
    id: 9,
    category: "베이커리",
    name: "크림빵",
    price: 2500,
  },
  {
    id: 10,
    category: "베이커리",
    name: "크림빵",
    price: 2500,
  },
  {
    id: 11,
    category: "베이커리",
    name: "크림빵",
    price: 2500,
  },
];

const Main = () => {
  // const [list, setList] = useState([]);
  //
  // useEffect(() => {
  //   axios.get(url).then((res) => {
  //     setList(res);
  //   });
  // }, []);

  const CoffeeList = cartArray.filter((data) => {
    return data.category === "커피";
  });

  const DeesertList = cartArray.filter((data) => {
    return data.category === "디저트";
  });

  const BakeryList = cartArray.filter((data) => {
    return data.category === "베이커리";
  });

  const AdeList = cartArray.filter((data) => {
    return data.category === "에이드";
  });

  return (
    <>
      <Header />
      <MenuList menuArray={cartArray} />
      <Cart menuArray={BakeryList} />
    </>
  );
};

export default Main;
