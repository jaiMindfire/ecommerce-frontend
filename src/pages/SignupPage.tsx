//React imports
import React, { useEffect, useState } from "react";
//3rd party imports
import { useFormik } from "formik";
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "@services/authApi";
import { BackgroundImage, StyledPaper } from "./LoginPage";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import SubmitButton from "@components/FormSubmitButton";
import FormInput from "@components/FormInput";
import { getValidationSchema } from "@utils/validationSchema";
import { useSnackbar } from "@hooks/useSnackbar";
import SnackbarMessage from "@components/SnackbarMessage";

const SignupPage: React.FC = () => {
  //state
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //redux-state
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  //hooks
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const theme = useTheme();
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: getValidationSchema(true),
    onSubmit: async (values) => {
      await formSubmit(values);
    },
  });

  const formSubmit = async (values: any) => {
    setLoading(true);
    try {
      await signup({
        email: values.email,
        password: values.password,
      }).unwrap();
      showSnackbar("Signup Successfull", "success");
      formik.resetForm();
      navigate("/");
    } catch (error: any) {
      showSnackbar(error?.data?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <BackgroundImage />
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
            Signup
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInput
                  label="Email Address"
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
                  label="Password"
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
                  label="Confirm Password"
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
            <SubmitButton loading={loading} label="Signup" />
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
