import React from "react";
import OrderList from "../features/orders/OrderList";

const DeliveredPage = () => (
  <OrderList statusQuery="paid,delivered" emptyMessage="No order(s) yet" />
);

export default DeliveredPage;
