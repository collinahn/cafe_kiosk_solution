import React from "react";
import Header from "../components/common/Header";
import Toggle from "../components/common/Toggle";
import MenuList from "../components/Manager/MenuList";
import AddMenu from "../components/Manager/AddMenu";
import "../assets/css/Manager.css";

const Manager = () => {
  return (
    <>
      <Header />
      {/* <Toggle MenuArray={["커피", "에이드", "베이커리", "디저트"]} /> */}
      <MenuList />
      <AddMenu />
    </>
  );
};

export default Manager;
