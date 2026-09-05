import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { baseUrl } from "../../config";

const statusBadgeClass = {
  pending: "bg-yellow-600",
  paid: "bg-blue-600",
  delivered: "bg-green-600",
  cancelled: "bg-red-600",
};

/**
 * Shared list for a customer's own orders, filtered to a set of statuses.
 * Used by both DeliveredPage ("paid,delivered") and CancelledPage ("cancelled").
 */
const OrderList = ({ statusQuery, emptyMessage }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getClientOrders = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({ page, status: statusQuery });
        const res = await fetch(`${baseUrl}/api/order/customer-order?${params}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setOrders(data.orders || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        toast.error("Could not load your orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.token) getClientOrders();
  }, [page, statusQuery, user]);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <div className="space-y-4">
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="card bg-[#252422] flex justify-between items-center w-full md:w-[340px] lg:w-[98%] p-[16px] my-10 md:my-0 shadow-sm"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="skeleton h-[64px] w-[64px] bg-gray-800 rounded" />
                <div className="flex flex-col gap-2 w-full">
                  <div className="skeleton h-6 w-[70%] bg-gray-800" />
                  <div className="skeleton h-5 w-[40%] bg-gray-800" />
                  <div className="skeleton h-4 w-[60%] bg-gray-800" />
                  <div className="skeleton h-6 w-[40%] bg-gray-800 mt-2" />
                </div>
              </div>
            </div>
          ))
        ) : orders.length === 0 ? (
          <div className="flex justify-center items-center text-lg font-semibold text-gray-400 h-52 ">
            {emptyMessage}
          </div>
        ) : (
          orders.map((order) => {
            const firstItem = order.orderItems?.[0];
            // Older API responses may not include `status` at all - fall back
            // rather than crash the whole page on `undefined[0]`.
            const status = order.status || "paid";
            return (
              <div
                key={order._id}
                className="flex justify-between items-center bg-[#2a2a2a] rounded-lg p-4 shadow-md"
              >
                <div className="md:flex items-center gap-4">
                  {firstItem && (
                    <img
                      src={firstItem.image}
                      alt={firstItem.title}
                      loading="lazy"
                      className="w-[140px] h-[140px] object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="text-lg font-semibold">{firstItem?.title}</p>
                    {firstItem && <p className="text-sm text-[#00ff88] mt-1">₦{firstItem.price}</p>}
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <span
                      className={`inline-block text-xs text-white px-2 py-1 rounded mt-1 ${
                        statusBadgeClass[status] || "bg-gray-600"
                      }`}
                    >
                      {status[0].toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                </div>

                <Link to={`/orders/delivered/${order._id}`} className="text-[#f0a500] text-sm hover:underline">
                  View Details &gt;&gt;
                </Link>
              </div>
            );
          })
        )}
      </div>
      {orders.length > 0 && (
        <div className="md:flex md:justify-between items-center mt-8">
          <div className="text-sm text-gray-400 text-center">10 entries per page</div>

          <div className="justify-center flex items-center gap-2 text-sm text-gray-400">
            <span>Page {page} of {totalPages}</span>
          </div>

          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`${page === 1 ? "cursor-not-allowed" : "cursor-pointer"} px-3 py-1 rounded bg-[#333] text-white disabled:opacity-50`}
            >
              &lt; Prev
            </button>

            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`${page === totalPages ? "cursor-not-allowed" : "cursor-pointer"} px-3 py-1 rounded bg-[#333] text-white disabled:opacity-50`}
            >
              Next &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
