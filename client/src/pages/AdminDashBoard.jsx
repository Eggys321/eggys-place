import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg transition-colors ${
    isActive ? "bg-[#B67B0F] text-[#FBFBFB]" : "text-[#FBFBFB] hover:bg-[#2F2F2F]"
  }`;

const AdminDashBoard = () => {
  const { user, logout } = useAuth();

  return (
    <main className="wrapper flex flex-col md:flex-row gap-4 min-h-screen">
      <section className="md:w-[220px] shrink-0 bg-[#100101] rounded-lg p-4">
        <div className="text-[#FBFBFB] pb-4 mb-4 border-b border-[#333]">
          <p className="text-sm text-gray-400">Signed in as</p>
          <p className="font-[500]">{user?.firstName || "Admin"}</p>
        </div>
        <nav className="flex flex-row md:flex-col gap-2 flex-wrap">
          <NavLink to="/dashboard" end className={navLinkClass}>
            Overview
          </NavLink>
          <NavLink to="all-orders" className={navLinkClass}>
            Orders
          </NavLink>
          <NavLink to="customer" className={navLinkClass}>
            Customers
          </NavLink>
        </nav>
        <div className="mt-6 flex flex-col gap-2">
          <Link to="/" className="text-sm text-gray-400 hover:text-white">
            &larr; Back to store
          </Link>
          <button
            type="button"
            onClick={logout}
            className="text-sm text-left text-[#FF6B6B] hover:underline"
          >
            Log Out
          </button>
        </div>
      </section>

      <section className="flex-1 bg-[#100101] rounded-lg p-4 md:p-8 text-[#FBFBFB]">
        <Outlet />
      </section>
    </main>
  );
};

export default AdminDashBoard;
