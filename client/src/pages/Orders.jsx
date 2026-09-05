import { NavLink, Outlet } from "react-router-dom";
import MyModal, { LOGOUT_MODAL_ID } from "../components/modals/MyModal";
import orderImg from "../assets/order-img.png";
import logOutImg from "../assets/logout-img.png";
import SimilarProducts from "../components/SimilarProducts";

const Orders = () => {
  return (
    <>
      <main className="wrapper grid grid-cols-[300px_1fr_2fr] gap-5 min-h-fit">
        <aside className="hidden md:block col-span-1 h-[150px] p-4 bg-[#100101] rounded-md text-white">
          <div className="space-y-6">
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-2 bg-[#B67B0F] text-[#FBFBFB] font-[400] text-[16px] py-2 px-4 rounded-lg"
                  : "block py-2 px-4"
              }
            >
              <div>
                <img src={orderImg} alt="" />
              </div>
              Orders
            </NavLink>
            <button
              type="button"
              className="flex items-center px-4 gap-2 cursor-pointer"
              onClick={() => document.getElementById(LOGOUT_MODAL_ID).showModal()}
            >
              <img src={logOutImg} alt="" />
              <span className="text-[#FF0000] font-[400] text-[16px]">Log Out</span>
            </button>
            <MyModal />
          </div>
        </aside>

        <section className="col-span-3 md:col-span-2 p-4 bg-[#100101] rounded-lg text-white h-">
          <h1 className="text-[24px] text-[#FFFFFF] font-[500] mb-4 border-b border-[#FBFBFB] pb-2">Orders</h1>

          <div className="flex space-x-6 mb-4">
            <NavLink
              to="delivered"
              end
              className={({ isActive }) =>
                isActive
                  ? "pb-1 border-b-[3px] border-[#B67B0F] text-[#FFFFFF] font-[400] text-[18px]"
                  : "pb-1 text-[#FFFFFF] font-[400] text-[18px]"
              }
            >
              Ongoing/Delivered
            </NavLink>

            <NavLink
              to="cancelled"
              className={({ isActive }) =>
                isActive
                  ? "pb-1 border-b-[3px] border-[#B67B0F] text-[#FFFFFF] font-[400] text-[18px]"
                  : "pb-1 text-[#FFFFFF] font-[400] text-[18px]"
              }
            >
              Cancelled
            </NavLink>
          </div>

          <Outlet />
        </section>
      </main>
      <SimilarProducts />
    </>
  );
};

export default Orders;
