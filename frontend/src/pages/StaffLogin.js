import React from "react";
import ManagerLogin from "../components/Login/ManagerLogin";
import ManagerButton from "../components/Login/ManagerButton";
import GotoStart from "../components/Login/GotoStart";
import StaffTitle from "../components/Login/StaffTitle";

const StaffLogin = () => {
  return (
    <>
      <StaffTitle />
      <ManagerLogin />
      <ManagerButton />
      <GotoStart />
    </>
  );
};

export default StaffLogin;
