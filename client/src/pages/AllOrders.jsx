import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import LoadingRing from "../utils/Loader";
import { baseUrl } from "../config";
import UseTitle from "../Hooks/UseTitle";

const STATUS_OPTIONS = ["pending", "paid", "delivered", "cancelled"];

const statusBadgeClass = {
  pending: "bg-yellow-600",
  paid: "bg-blue-600",
  delivered: "bg-green-600",
  cancelled: "bg-red-600",
};

const AllOrders = () => {
  UseTitle("Manage Orders");

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({ page });
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`${baseUrl}/api/order/all-orders?${params}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        setTotalPages(data.totalPages || 1);
      } else {
        toast.error(data.errMsg || "Could not load orders.");
      }
    } catch {
      toast.error("Could not load orders.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page, statusFilter]);

  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
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
        setOrders((prev) => prev.map((order) => (order._id === orderId ? { ...order, status } : order)));
        toast.success("Order status updated");
      } else {
        toast.error(data.errMsg || "Could not update order status.");
      }
    } catch {
      toast.error("Could not update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-[24px] font-[500]">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="bg-[#252422] text-[#FBFBFB] px-3 py-2 rounded-md border border-[#333]"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status[0].toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-52">
          <LoadingRing />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-[#333]">
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Items</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-[#252422] text-sm">
                  <td className="py-3 pr-4">{order.recipientInfo?.fullName}</td>
                  <td className="py-3 pr-4">{order.orderItems?.length} item(s)</td>
                  <td className="py-3 pr-4">₦{order.totalPrice?.toLocaleString()}</td>
                  <td className="py-3 pr-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-white text-xs px-2 py-1 rounded ${statusBadgeClass[order.status] || "bg-gray-600"}`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status} className="bg-[#252422]">
                          {status[0].toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-4">
                    <Link to={`${order._id}`} className="text-[#B67B0F] hover:underline">
                      View &gt;&gt;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {orders.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-400">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded bg-[#333] text-white disabled:opacity-50"
          >
            &lt; Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 rounded bg-[#333] text-white disabled:opacity-50"
          >
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
