//React Imports
import React, { useEffect, useState } from "react";
//3rd Party Imports
import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//Static Imports
import { useLoginMutation } from "@services/authApi";
import { setCredentials } from "@store/redux/authSlice";
import { RootState } from "@store/index";
import { usePopup } from "@store/context/LoginPopupContext";
import SubmitButton from "@components/FormSubmitButton";
import FormInput from "@components/FormInput";
import SnackbarMessage from "@components/SnackbarMessage";
import { useSnackbar } from "@hooks/useSnackbar";
import { getValidationSchema } from "@utils/validationSchema";

// Styled components for consistent styling
export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(145deg, #424242, #303030)"
      : "linear-gradient(145deg, #f3f4f6, #ffffff)",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  color: theme.palette.text.primary,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1, 4),
  borderRadius: theme.shape.borderRadius * 4,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
}));

export const BackgroundImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage:
    "url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: theme.palette.mode === "dark" ? 0.2 : 0.1,
  zIndex: -1,
}));

const LoginPage: React.FC = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const theme = useTheme();
  // Check if user is already logged in
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  const { closeModal } = usePopup();
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: getValidationSchema(false),
    onSubmit: async (values) => {
      await formSubmit(values);
    },
  });

  //Login form submit
  const formSubmit = async (values: any) => {
    setLoading(true);
    try {
      const userData = await login(values).unwrap();
      dispatch(setCredentials(userData));
      showSnackbar("Login successful", "success");
      const destination = localStorage.getItem("to");
      if (destination) {
        navigate(destination);
        localStorage.setItem("to", "");
      } else {
        navigate("/");
      }
      closeModal();
    } catch (error: any) {
      showSnackbar(error?.data?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to home if the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <BackgroundImage /> {/* Background image for the login page */}
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
            Login
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
            </Grid>
            <SubmitButton loading={loading} label="Login" />{" "}
            {/* Submit button for the form */}
          </form>
        </StyledPaper>
      </Box>
      {/* Snackbar for displaying messages */}
      <SnackbarMessage
        open={open}
        message={message}
        type={severity}
        onClose={handleClose}
      />
    </Container>
  );
};

export default LoginPage;
