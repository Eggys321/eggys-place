import React from "react";
import OrderList from "../features/orders/OrderList";

const CancelledPage = () => (
  <OrderList statusQuery="cancelled" emptyMessage="No cancelled orders" />
);

export default CancelledPage;
