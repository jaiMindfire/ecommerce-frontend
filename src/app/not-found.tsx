"use client";
//3rd party imports
import { Typography, Button, Container, Grid } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { styled, ThemeProvider } from "@mui/system";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

//styles using styled-component
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: "all 0.3s ease-in-out",
}));

const StyledErrorIcon = styled(ErrorOutline)(({ theme }) => ({
  fontSize: "8rem",
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const NotFoundPage = () => {
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <ThemeProvider theme = {theme}>
      <StyledContainer maxWidth="md">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} textAlign="center">
            <StyledErrorIcon aria-hidden="true" />
            <Typography variant="h2" component="h1" gutterBottom>
              404 Page Not Found
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Oops! The page you're looking for doesn't exist.
            </Typography>
            <Typography variant="body1" paragraph>
              Don't worry, we'll help you find your way back.
            </Typography>
            <StyledButton
              variant="contained"
              color="primary"
              size="large"
              aria-label="Go back to homepage"
              onClick={() => {
                router.push("/");
              }}
            >
              Back to Home
            </StyledButton>
          </Grid>
        </Grid>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default NotFoundPage;
