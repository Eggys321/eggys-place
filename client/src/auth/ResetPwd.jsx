import { useState } from "react";
import Input from "../components/Input";
import MyButton from "../components/MyButton";
import brandLogo from "../assets/nav-logo.svg";
import visibilityOn from "../assets/visibility_on.svg";
import visibilityOff from "../assets/visibility_off.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPwdLinkSchema } from "../utils/ValidationSchema";
import { toast } from "sonner";
import LoadingRing from "../utils/Loader";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import UseTitle from "../Hooks/UseTitle";

const ResetPwd = () => {
  UseTitle("Reset Password", "Choose a new password for your Eggy's Place account.");

  const [isReveal, setIsReveal] = useState(false);
  const [isReveal2, setIsReveal2] = useState(false);
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPwdLinkSchema),
    defaultValues: {
      password: "",
      cPassword: "",
    },
  });
  function togglePwd() {
    setIsReveal((prev) => !prev);
  }
  function togglePwd2() {
    setIsReveal2((prev) => !prev);
  }

  const onSubmit = async (data) => {
    try {
      const req = await fetch(`${baseUrl}/api/auth/reset-password/${resetToken}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (!res.success) {
        toast.error(res.errMsg);
      }
      if (res.success) {
        toast.success(res.message);
        navigate("/");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };
  const btnTxt = isSubmitting ? <LoadingRing /> : "Reset Password";

  return (
    <>
      <main className="h-screen flex flex-col text-center md:text-start justify-center items-center">
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
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full">
            <Input
              type={isReveal ? "text" : "password"}
              placeholder="Password"
              name="password"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              className="absolute top-2.5 left-[90%] cursor-pointer bg-transparent border-0 p-0"
              onClick={togglePwd}
              aria-label={isReveal ? "Hide password" : "Show password"}
            >
              <img src={isReveal ? visibilityOff : visibilityOn} alt="" />
            </button>
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <div className="relative w-full my-4">
            <Input
              type={isReveal2 ? "text" : "password"}
              placeholder="Confirm Password"
              name="cPassword"
              {...register("cPassword", { required: true })}
            />
            <button
              type="button"
              className="absolute top-2.5 left-[90%] cursor-pointer bg-transparent border-0 p-0"
              onClick={togglePwd2}
              aria-label={isReveal2 ? "Hide password" : "Show password"}
            >
              <img src={isReveal2 ? visibilityOff : visibilityOn} alt="" />
            </button>
            <p className="text-red-600">{errors.cPassword?.message}</p>
          </div>
          <div className="mt-4">
            <MyButton
              type="submit"
              disabled={isSubmitting}
              text={btnTxt}
              className="w-[350px] font-[500] text-[20px] md:w-[400px] h-[56px]"
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default ResetPwd;
