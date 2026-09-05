import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import LoadingRing from "../utils/Loader";
import { baseUrl } from "../config";
import UseTitle from "../Hooks/UseTitle";

const Customer = () => {
  UseTitle("Customers");

  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/api/user/all-customers?page=${page}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (data.success) {
          setCustomers(data.customers);
          setTotalPages(data.totalPages || 1);
        } else {
          toast.error(data.errMsg || "Could not load customers.");
        }
      } catch {
        toast.error("Could not load customers.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.token) fetchCustomers();
  }, [user, page]);

  return (
    <div>
      <h1 className="text-[24px] font-[500] mb-6">Customers</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-52">
          <LoadingRing />
        </div>
      ) : customers.length === 0 ? (
        <p className="text-gray-400">No customers yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-[#333]">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Joined</th>
                <th className="py-2 pr-4">Orders</th>
                <th className="py-2 pr-4">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id} className="border-b border-[#252422] text-sm">
                  <td className="py-3 pr-4">{customer.firstName} {customer.lastName}</td>
                  <td className="py-3 pr-4">{customer.email}</td>
                  <td className="py-3 pr-4">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 pr-4">{customer.orderCount}</td>
                  <td className="py-3 pr-4">₦{customer.totalSpent?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {customers.length > 0 && (
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

export default Customer;
