import React from "react";
import Header from "../components/common/Header";
import MenuList from "../components/Manager/MenuList";
import AddMenu from "../components/Manager/AddMenu";
import "../assets/css/Manager.css";

const Manager = () => {
  return (
    <>
      <Header />
      <MenuList />
      <AddMenu />
    </>
  );
};

export default Manager;
