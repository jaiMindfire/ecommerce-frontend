"use client"
// React Imports
import React, { useEffect, useState } from "react";
// Next Imports
import { useRouter } from "next/navigation";
// 3rd Party Imports
import { useFormik } from "formik";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Static Imports
import { BackgroundImage, StyledPaper } from "./Login";
import { RootState } from "@store/index";
import SubmitButton from "@components/Shared/FormSubmitButton";
import FormInput from "@components/Shared/FormInput";
import { getValidationSchema } from "@utils/validationSchema";
import { useSnackbar } from "@hooks/useSnackbar";
import SnackbarMessage from "@components/Shared/SnackbarMessage";
import { SIGNUP_MESSAGES } from "@constants/index"; // Importing constants for messages
import { signup } from "@services/authApi";

const SignupPage: React.FC = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //redux-states
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  //hooks
  const router = useRouter();
  const theme = useTheme(); // Access the theme for styling
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: getValidationSchema(true), // Validation schema for signup
    onSubmit: async (values) => {
      await formSubmit(values); // Call form submit function on form submit
    },
  });

  // Function to handle form submission
  const formSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Call the signup mutation
      await signup({ email: values.email, password: values.password });
      showSnackbar(SIGNUP_MESSAGES.signupSuccess, "success");
      formik.resetForm();
      router.push("/"); // Redirect to home page after successful signup
    } catch (error: any) {
      // Show error message if signup fails
      console.log(error,'sdfdf')
      showSnackbar(error?.response?.data?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Effect to redirect if the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/"); // Redirect to home page if logged in
    }
  }, [isLoggedIn, router.push]);

  return (
    <Container component="main" maxWidth="xs">
      <BackgroundImage /> {/* Background image for the signup page */}
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "75vh",
        }}
      >
        <StyledPaper elevation={6}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: theme.palette.mode === "dark" ? "white" : "primary.main",
            }}
          >
            {SIGNUP_MESSAGES.signupButton} {/* Signup button label */}
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInput
                  label={SIGNUP_MESSAGES.emailLabel} // Email input label
                  name="email"
                  value={formik.values.email}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  label={SIGNUP_MESSAGES.passwordLabel} // Password input label
                  name="password"
                  isPassword
                  showPassword={showPassword}
                  toggleShowPassword={() => setShowPassword(!showPassword)}
                  value={formik.values.password}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  label={SIGNUP_MESSAGES.confirmPasswordLabel} // Confirm password input label
                  name="confirmPassword"
                  isPassword
                  showPassword={showConfirmPassword}
                  toggleShowPassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  value={formik.values.confirmPassword}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid>
            </Grid>
            <SubmitButton
              loading={loading}
              label={SIGNUP_MESSAGES.signupButton}
            />{" "}
            {/* Submit button */}
          </form>
        </StyledPaper>
      </Box>
      <SnackbarMessage
        open={open}
        message={message}
        type={severity}
        onClose={handleClose}
      />
    </Container>
  );
};

export default SignupPage;
