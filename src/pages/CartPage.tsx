//React Imports
import React, { useEffect, useState } from "react";
//3rd Party Imports
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
//Static Imports
import { RootState } from "@store/index";
import {
  useGetCartQuery,
  useMassAddToCartMutation,
  useCheckoutMutation,
} from "@services/cartApi";
import {
  selectCartItems,
  mergeLocalCart,
  clearCart,
} from "@store/redux/cartSlice";
import CartProductList from "@components/CartProductList";
import OrderSummary from "@components/OrderSummary";
import NoItemsInCart from "@components/NoCartItems";
import SnackbarMessage from "@components/SnackbarMessage";
import { setCheckedOut } from "@store/redux/productsSlice";
import { handleMergeLocalCart } from "@utils/cartUtils";
import OrderSuccessNotification from "./OrderSuccessPage";
import { useSnackbar } from "@hooks/useSnackbar";
import LoadingSpinner from "@components/LoadingSpinner";

const CartPage: React.FC = () => {
  //states
  const [showOrder, setShowOrder] = useState(false);
  //redux-states
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);
  const items = useSelector(selectCartItems);
  //hooks
  const dispatch = useDispatch();
  const { data: cartItems, isLoading } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });
  const [massAddToCart] = useMassAddToCartMutation();
  const [checkout, { isLoading: isCheckoutLoading }] = useCheckoutMutation();
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();

  // Function to handle the checkout process
  const handleCheckout = async () => {
    const totalAmount = items.reduce(
      (acc, item) => acc + item.product?.price * item.quantity,
      0
    );
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    try {
      await checkout().unwrap();
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
  }, [cartItems, isLoggedIn, dispatch, massAddToCart]);

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
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
            isCheckoutLoading={isCheckoutLoading}
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
          totalAmount={Number(localStorage.getItem("totalAmount") || 0).toFixed(
            2
          )}
          totalItems={Number(localStorage.getItem("totalItems"))}
        />
      )}
    </Box>
  );
};

export default CartPage;
