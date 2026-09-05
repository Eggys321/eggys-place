import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import LoadingRing from "../utils/Loader";
import { baseUrl } from "../config";

const StatCard = ({ label, value }) => (
  <div className="bg-[#252422] rounded-lg p-6">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-[28px] font-[500] mt-1">{value}</p>
  </div>
);

const DashBoard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [totalCustomers, setTotalCustomers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setIsLoading(true);
        const headers = { Authorization: `Bearer ${user.token}` };
        const [statsRes, customersRes] = await Promise.all([
          fetch(`${baseUrl}/api/order/stats`, { headers }),
          fetch(`${baseUrl}/api/user/all-customers?limit=1`, { headers }),
        ]);
        const statsData = await statsRes.json();
        const customersData = await customersRes.json();

        if (statsData.success) setStats(statsData);
        if (customersData.success) setTotalCustomers(customersData.totalCustomers);
        if (!statsData.success || !customersData.success) {
          toast.error("Could not load some dashboard data.");
        }
      } catch (error) {
        toast.error("Could not load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.token) fetchOverview();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <LoadingRing />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-[24px] font-[500] mb-6">Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Orders" value={stats?.totalOrders ?? 0} />
        <StatCard label="Total Revenue" value={`₦${(stats?.totalRevenue ?? 0).toLocaleString()}`} />
        <StatCard label="Total Customers" value={totalCustomers ?? 0} />
        <StatCard label="Pending" value={stats?.statusCounts?.pending ?? 0} />
        <StatCard label="Paid" value={stats?.statusCounts?.paid ?? 0} />
        <StatCard label="Delivered" value={stats?.statusCounts?.delivered ?? 0} />
        <StatCard label="Cancelled" value={stats?.statusCounts?.cancelled ?? 0} />
      </div>
    </div>
  );
};

export default DashBoard;
