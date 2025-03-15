import * as yup from "yup";

// for sign in
export const signInSchema = yup
  .object({
    email: yup
      .string()
      .required("email is required")
      .email("invalid email format"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "min lenght of password should be at least 8 chrs"),
  })
  .required();
// for sign up
export const signUpSchema = yup
.object({
  firstName: yup.string().required("first name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup
    .string()
    .required("email is required")
    .email("invalid email format"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "min length of password should be atleast 8 chrs"),
  cPassword: yup
    .string()
    .required("confirm password is required")
    .min(8, "min length of confirm password should be atleast 8 chrs")
    .oneOf([yup.ref("password")], "password do not match"),
  })
  .required();