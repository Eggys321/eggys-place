import * as yup from "yup";

// for sign in
export const signInSchema = yup
  .object({
    email: yup
      .string()
      .required("email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "min lenght of password should be at least 8 chrs"),
  })
  .required();