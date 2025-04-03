import React, { useState } from 'react';
import Input from "../components/Input";
import MyButton from "../components/MyButton";
import brandLogo from "../assets/nav-logo.svg";
import visibilityOn from "../assets/visibility_on.svg";
import visibilityOff from  "../assets/visibility_off.svg";

const ResetPwd = () => {
    const [isReveal, setIsReveal] = useState(false)
     const [isReveal2, setIsReveal2] = useState(false)
      function togglePwd(){
        setIsReveal((prev)=> !prev)
      }
      function togglePwd2(){
        setIsReveal2((prev)=> !prev)
      }
  return (
    <>
      <main className="bg-[#2F2F2F] h-screen flex flex-col text-center  md:text-start justify-center items-center">
        <section className="">
          <div className="flex justify-center mb-6">
            <img src={brandLogo} alt="brand-logo" className="w-[49px]" />
          </div>
          <h1 className="text-[#FBFBFB] text-[32px] font-[500] ">
            Reset Password
          </h1>
          <p className="font-[400] text-[20px] text-[#FBFBFB]">
            Enter Your New Password
          </p>
        </section>
        <form className="mt-4 ">
          <div className="relative w-full">
            <Input
              type={isReveal ? "text" : "password"}
              placeholder="Password"
              name="password"
            
            />
            <img
              className=" absolute top-2.5  left-[90%] cursor-pointer "
              src={isReveal ? visibilityOff : visibilityOn}
              alt="toggle-password-img"
              onClick={togglePwd}
            />
            {/* <p className="text-red-600">{errors.password?.message}</p> */}
          </div>
          <div className="relative w-full my-4">
            <Input
              type={isReveal2 ? "text" : "password"}
              placeholder="Confirm Password"
              name="cpassword"
            />
            <img
              className=" absolute top-2.5  left-[90%] cursor-pointer"
              src={isReveal2 ? visibilityOff : visibilityOn}
              alt="toggle-password-img"
              onClick={togglePwd2}
            />
            {/* <p className="text-red-600">{errors.cPassword?.message}</p> */}
          </div>
          <div className="mt-4">
            <MyButton
              text="Reset Password"
              className="w-[350px] font-[500] text-[20px] md:w-[400px] h-[56px]"
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default ResetPwd;
