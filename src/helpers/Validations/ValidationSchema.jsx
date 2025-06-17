import * as yup from "yup";

export const deleteAccountValidationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be at most 30 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    number: yup
      .string()
      .required("Phone number is required")
      .min(7, "Phone number must be at least 7 digits")
      .max(10, "Phone number must be at most 10 digits"),
    reason: yup.string().required("Reason is required"),
  });