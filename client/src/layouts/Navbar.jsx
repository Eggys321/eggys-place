import React from "react";
import navLogo from "../assets/nav-logo.svg";
import locationImg from "../assets/location-img.svg";
import locationDropDown from "../assets/drop-down-img.svg";
import searchLogo from "../assets/search-logo.svg";
import { Link } from "react-router-dom";
import cartLogo from "../assets/cart-img.svg";
import loginLogo from "../assets/login-img.svg";
import { LocationDropDownFN } from "../utils/DropDown";

const Navbar = () => {
  return (
    <>
      <header className="bg-[#100101] w-full ">
        <nav className="wrapper gap-4 lg:gap-8 xl:gap-12 flex justify-between items-center">
          {/* <div className="flex items-center gap-4 lg:gap-6">
            <div className="">

            <img src={navLogo} alt="nav-logo" className="w-10 md:w-full h-auto" />
            </div>

            <div>

            <img
              src={locationImg}
              alt="location-logo"
              className="w-5 md:w-full h-auto"
            />
            </div>
            <h4 className="text-[#F0F0F0] text-[20px] font-[500] hidden md:block ">Location</h4>
            <div>

              <LocationDropDownFN/>
            </div>
          </div> */}
           <div className="flex items-center gap-4 lg:gap-6">
          <img src={navLogo} alt="nav-logo" className="w-10 md:w-full h-auto" />
          <div className="flex items-center gap-3 lg:gap-5">
            <img src={locationImg} alt="location-logo" className="w-5 md:w-full h-auto" />
            <h4 className="text-[#F0F0F0] text-lg font-medium hidden md:block">Location</h4>
          </div>
          <LocationDropDownFN />
        </div>

          <div className="hidden lg:flex w-[399px] xl:w-[450px] 2xl:w-[500px] ml-4">
            <form className="w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-[56px] rounded-[32px] bg-[#F0F0F0] outline-none placeholder:text-[#100101] px-8 border font-medium text-lg"

                // className="w-[399px] h-[56px] rounded-[32px] bg-[#F0F0F0] outline-none placeholder:text-[#100101] ps-[30px] border font-[400] text-[20px]"
              />
            </form>
          </div>

          <div className="flex gap-4 lg:gap-6 xl:gap-8 items-center">
            <h2 className="font-medium text-lg text-[#FBFBFB] hidden lg:block whitespace-nowrap">All Products</h2>
            <ul className="flex gap-4 lg:gap-6 items-center">
              <li className="flex items-center justify-center w-[60px] h-[60px] md:w-[142px] lg:h-[56px] py-[15px]  lg:px-[20px]  bg-[#B67B0F] rounded-[100px] lg:rounded-[32px]">
                <img src={cartLogo} alt="cart-logo" /> <Link className="ps-2 text-[#FBFBFB] font-[500] text-[20px]"> <span className="hidden md:inline-block">Cart</span> 30 </Link>
              </li>
              <li className="flex items-center w-[60px] h-[60px] justify-center  md:w-[124px] lg:h-[56px] py-[15px] px-[20px]  bg-[#F0F0F0]  rounded-full " >
                <img src={loginLogo} alt="login-logo" /> <Link className="ps-2 text-[#100101] font-[500] text-[20px] hidden md:inline-block">Login </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
