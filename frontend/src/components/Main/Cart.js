import React from "react";
import Slide from "./Slide";

const Cart = ({ menuArray }) => {
  return (
    <div>
      <Slide menuArray={menuArray} />
    </div>
  );
};

export default Cart;
