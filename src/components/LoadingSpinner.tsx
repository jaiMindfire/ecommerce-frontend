import React from "react";
import { Box, CircularProgress, styled } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { keyframes } from "@mui/system";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const SpinnerContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 80,
  height: 80,
  animation: `${spin} 2s linear infinite`,
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)",
  },
  transition: "transform 0.3s ease-in-out",
}));

const CartIconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: theme.palette.primary.main,
  filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))",
}));

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerWrapper role="progressbar" aria-label="Loading" tabIndex={0}>
      <SpinnerContainer>
        <CircularProgress
          size={80}
          thickness={2}
          sx={{
            color: (theme) => theme.palette.primary.light,
          }}
        />
        <CartIconWrapper>
          <ShoppingCart fontSize="large" />
        </CartIconWrapper>
      </SpinnerContainer>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
