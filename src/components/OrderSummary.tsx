//React Imports
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Button,
} from "@mui/material";
//Static Imports
import { CartItem } from "@models/cartTypes";
import { CHECKOUT_TEXT } from "@constants/index";

interface OrderSummaryProps {
  items: CartItem[];
  isCheckoutLoading: boolean;
  handleCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  isCheckoutLoading,
  handleCheckout,
}) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        flex: 1,
        ml: 2,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h6">Order Summary</Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1">Total Items: {totalItems}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Total Amount: ${totalAmount.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
          >
            {isCheckoutLoading ? "Processing..." : CHECKOUT_TEXT}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderSummary;
