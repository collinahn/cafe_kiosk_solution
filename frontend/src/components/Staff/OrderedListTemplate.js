import React from "react";
import OrderedListTable from "./OrderedListTable";

const OrderedListTemplate = ({ ordered, okSubmit, noSubmit, byebye }) => {
  return (
    <>
      {ordered.map((order) => (
        <OrderedListTable
          key={order.id}
          order={order}
          byebye={byebye}
          okSubmit={okSubmit}
          noSubmit={noSubmit}
        />
      ))}
    </>
  );
};

export default OrderedListTemplate;
