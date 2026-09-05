import OrderList from "../features/orders/OrderList";
import UseTitle from "../Hooks/UseTitle";

const DeliveredPage = () => {
  UseTitle("Your Orders", "Track your ongoing and delivered orders.");

  return <OrderList statusQuery="paid,delivered" emptyMessage="No order(s) yet" />;
};

export default DeliveredPage;
