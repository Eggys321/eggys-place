import OrderList from "../features/orders/OrderList";
import UseTitle from "../Hooks/UseTitle";

const CancelledPage = () => {
  UseTitle("Cancelled Orders", "View your cancelled orders.");

  return <OrderList statusQuery="cancelled" emptyMessage="No cancelled orders" />;
};

export default CancelledPage;
