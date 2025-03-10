import React from "react";
import Input from "../components/Input";
import MyButton from "../components/MyButton";

const SignIn = ({ switchToSignUp }) => {
  return (
    <>
      <main>
        <div className="text-[#FBFBFB]">
          <h6 className="text-[#FBFBFB] font-[500] text-[22px] pt-8">
            Welcome Back
          </h6>
          <p className="text-[20px] font-[400] pb-6 ">Sign In To Your Account </p>
        </div>
        <form className="flex flex-col gap-y-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <MyButton text="sign in" className="w-full" />
        </form>
        <p>
          Don't have an account?
          <span
            className="text-blue-500 cursor-pointer"
            onClick={switchToSignUp}
          >
            Sign Up
          </span>
        </p>
      </main>
    </>
  );
};

export default SignIn;
