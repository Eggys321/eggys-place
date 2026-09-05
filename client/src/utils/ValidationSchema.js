import * as Yup from "yup";

export const signInSchema = Yup
  .object({
    email: Yup
      .string()
      .required("email is required")
      .email("invalid email format"),
    password: Yup
      .string()
      .required("password is required")
      .min(8, "min lenght of password should be at least 8 chrs"),
  })
  .required();

export const signUpSchema = Yup
  .object({
    firstName: Yup.string().required("first name is required"),
    lastName: Yup.string().required("last name is required"),
    email: Yup
      .string()
      .required("email is required")
      .email("invalid email format"),
    password: Yup
      .string()
      .required("password is required")
      .min(8, "min length of password should be atleast 8 chrs"),
    cPassword: Yup
      .string()
      .required("confirm password is required")
      .min(8, "min length of confirm password should be atleast 8 chrs")
      .oneOf([Yup.ref("password")], "password do not match"),
  })
  .required();

export const forgotPasswordSchema = Yup
  .object({
    email: Yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
  })
  .required();

export const resetPwdLinkSchema = Yup
  .object({
    password: Yup
      .string()
      .required("password is required")
      .min(8, "min lenght of password should be at least 8 chrs"),

    cPassword: Yup
      .string()
      .required("confirm password is required")
      .min(8, "min lenght of password should be at least 8 chrs")
      .oneOf([Yup.ref("password")], "Password do not match"),
  })
  .required();
