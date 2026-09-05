import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import LoadingRing from "../utils/Loader";
import { baseUrl } from "../config";
import UseTitle from "../Hooks/UseTitle";

const STATUS_OPTIONS = ["pending", "paid", "delivered", "cancelled"];

const AdminOrderDetails = () => {
  UseTitle("Order Details");

  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/api/order/all-orders/${orderId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrder(data.order);
      } else {
        toast.error(data.errMsg || "Could not load this order.");
      }
    } catch {
      toast.error("Could not load this order.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, orderId]);

  const handleStatusChange = async (status) => {
    try {
      setIsUpdating(true);
      const res = await fetch(`${baseUrl}/api/order/all-orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setOrder(data.order);
        toast.success("Order status updated");
      } else {
        toast.error(data.errMsg || "Could not update order status.");
      }
    } catch {
      toast.error("Could not update order status.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <LoadingRing />
      </div>
    );
  }

  if (!order) {
    return <p className="text-red-400">Order not found.</p>;
  }

  const { recipientInfo, deliveryAddress, orderItems, totalPrice, paymentRef, status, user: customer } = order;

  return (
    <div>
      <Link to=".." relative="path" className="text-[#B67B0F] text-sm hover:underline">
        &lt;&lt; Back to orders
      </Link>

      <div className="md:grid grid-cols-2 gap-10 mt-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">Order Details</h1>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400">Status:</span>
              <select
                value={status}
                disabled={isUpdating}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-[#252422] text-white px-3 py-1 rounded"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option[0].toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <p className="flex justify-between"><span className="text-gray-400">Payment Ref:</span> <span>{paymentRef}</span></p>
            <p className="flex justify-between"><span className="text-gray-400">Total:</span> <span className="text-[#00ff88] font-semibold">₦{totalPrice?.toLocaleString()}</span></p>
            {customer?.email && (
              <p className="flex justify-between"><span className="text-gray-400">Account email:</span> <span>{customer.email}</span></p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Recipient</h2>
            <p>{recipientInfo?.fullName}</p>
            <p className="text-sm text-gray-400">{recipientInfo?.email}</p>
            <p className="text-sm text-gray-400">{recipientInfo?.phoneNumber}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
            <p className="text-sm text-gray-400">{deliveryAddress?.address}</p>
            <p className="text-sm text-gray-400">{deliveryAddress?.city}, {deliveryAddress?.state}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Ordered Items</h2>
          <div className="space-y-3">
            {orderItems?.map((item, index) => (
              <div key={index} className="bg-[#1f1f1f] rounded-md p-4 flex gap-4 border border-gray-700">
                <img src={item.image} alt={item.title} loading="lazy" className="w-20 h-20 object-cover rounded" />
                <div>
                  <p className="font-medium text-[#00ff88]">{item.title}</p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity} &middot; ₦{item.price?.toLocaleString()} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
