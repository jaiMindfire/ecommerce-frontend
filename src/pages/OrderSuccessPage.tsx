import React, { useState } from "react";
import { CheckCircle, Close } from "@mui/icons-material";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface OrderSuccessNotificationProps {
  totalAmount: string;
  totalItems: number;
}

const OrderSuccessNotification: React.FC<OrderSuccessNotificationProps> = ({
  totalAmount,
  totalItems,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();

  const navigate = useNavigate();

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        maxWidth: "400px",
        width: "100%",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: 3,
        transition: "all 0.3s ease-in-out",
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[900]
            : theme.palette.grey[50],
      }}
      role="alert"
      aria-live="assertive"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <CheckCircle
          sx={{
            fontSize: "32px",
            color: theme.palette.success.main,
            marginRight: "12px",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.grey[800],
          }}
        >
          Order Placed Successfully!
        </Typography>
      </Box>

      <Typography
        sx={{
          marginBottom: "16px",
          color:
            theme.palette.mode === "dark"
              ? theme.palette.grey[300]
              : theme.palette.grey[700],
        }}
      >
        Your order has been confirmed.
        <br />
        Total Items: {totalItems}
        <br />
        Total Amount: ${totalAmount}
        <br />
        Expected Delivery: June 15, 2025
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/");
          }}
        >
          Continue Shopping
        </Button>
        <IconButton
          onClick={handleDismiss}
          aria-label="Close notification"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[400]
                : theme.palette.grey[600],
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[200],
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[700]
                  : theme.palette.grey[300],
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
};

export default OrderSuccessNotification;
