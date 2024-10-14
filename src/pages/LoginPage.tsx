import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@services/authApi";
import { setCredentials } from "../store/redux/authSlice";
import { RootState } from "../redux/store";
import { usePopup } from "../store/context/LoginPopupContext";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);

  const { closeModal } = usePopup();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [loading, setLoading] = useState(false); // State to manage loading

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const userData = await login(values).unwrap();
        dispatch(setCredentials(userData));
        setSnackbarMessage("Login successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        const destination = localStorage.getItem("to");
        if (destination) {
          navigate(destination);
          localStorage.setItem("to", "");
        } else {
          navigate("/");
        }
        closeModal();
      } catch (error: any) {
        setSnackbarMessage(error?.data?.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputLabelProps={{
                    style: { color: theme.palette.text.primary },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="caption" color="error">
                      {formik.errors.password}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </StyledButton>
          </form>
          {/* <Box mt={2}>
            <Typography variant="body2">
              Don't have an account yet?{" "}
              <Link to="/signup" color="primary">
                Signup
              </Link>
            </Typography>
          </Box> */}
        </StyledPaper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
