import * as Yup from "yup";

export const getValidationSchema = (isSignup: boolean = false) => {
  const baseSchema = {
    email: Yup.string().email("Please enter a valid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
  };

  if (isSignup) {
    return Yup.object({
      ...baseSchema,
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    });
  }

  return Yup.object(baseSchema);
};
