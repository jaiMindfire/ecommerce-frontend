import * as Yup from "yup";

export const getValidationSchema = (isSignup: boolean = false) => {
  const baseSchema = {
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(6, "Password should be at least 6 characters").required("Required"),
  };

  if (isSignup) {
    return Yup.object({
      ...baseSchema,
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    });
  }

  return Yup.object(baseSchema);
};
