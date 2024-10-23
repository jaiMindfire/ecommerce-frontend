"use client";
//React Imports
import React, { useEffect, useState } from "react";
//3rd Party Imports
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid } from "@mui/material";
//Static Imports
import { RootState } from "@store/index";
import {
  selectCartItems,
  mergeLocalCart,
  clearCart,
} from "@store/redux/cartSlice";
import CartProductList from "@components/Cart/CartProductList";
import OrderSummary from "@components/Order/OrderSummary";
import NoItemsInCart from "@components/Cart/NoCartItems";
import SnackbarMessage from "@components/Shared/SnackbarMessage";
import { setCheckedOut } from "@store/redux/productsSlice";
import { handleMergeLocalCart } from "@utils/cartUtils";
import OrderSuccessNotification from "@components/Order/OrderSuccessNotification";
import { useSnackbar } from "@hooks/useSnackbar";
import { ThemeProvider } from "@mui/system";
import { useCheckout, useMassAddToCart } from "@services/cartApi";
import { CartResponse } from "@models/cartTypes";

const CartPage: React.FC<{
  cartItems: CartResponse | undefined;
}> = ({ cartItems }) => {
  //states
  const [showOrder, setShowOrder] = useState(false);
  //redux-states
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);
  const items = useSelector(selectCartItems);
  const theme = useSelector((state: RootState) => state.theme.theme);
  //hooks
  const dispatch = useDispatch();
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();
  const { massAddToCart, loading: massLoading, error: massError } = useMassAddToCart();
  const { checkout, loading, error } = useCheckout();
  // Function to handle the checkout process
  const handleCheckout = async () => {
    const totalAmount = items.reduce(
      (acc, item) => acc + item.product?.price * item.quantity,
      0
    );
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    try {
      await checkout();
      dispatch(setCheckedOut(items));
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
      localStorage.setItem("totalItems", JSON.stringify(totalItems));
      setShowOrder(true);
      dispatch(clearCart());
      showSnackbar("Order placed successfully!", "success");
    } catch (error) {
      showSnackbar("Checkout failed. Please try again.", "error");
    }
  };

  // Effect to handle redirection for non-logged-in users
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("to", "/cart");
    }
  }, [isLoggedIn]);

  // Effect to merge local cart items with server data
  useEffect(() => {
    dispatch(mergeLocalCart(cartItems?.items || []));
    handleMergeLocalCart(cartItems, massAddToCart);
  }, [cartItems]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          padding: 2,
          marginTop: "10px",
        }}
      >
        {items.length ? (
          <>
            <CartProductList showSnackbar={showSnackbar} />
            <OrderSummary
              items={items}
              isCheckoutLoading={loading}
              handleCheckout={handleCheckout}
            />
          </>
        ) : (
          <NoItemsInCart />
        )}
        <SnackbarMessage
          open={open}
          message={message}
          type={severity}
          onClose={handleClose}
        />
        {showOrder && (
          <OrderSuccessNotification
            totalAmount={Number(
              localStorage.getItem("totalAmount") || 0
            ).toFixed(2)}
            totalItems={Number(localStorage.getItem("totalItems"))}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CartPage;
