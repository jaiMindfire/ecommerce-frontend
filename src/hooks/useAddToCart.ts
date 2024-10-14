import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store/redux/cartSlice";
import { useAddToCartMutation } from "@services/cartApi";
import { RootState } from "../redux/store";

const useAddToCart = () => {
  const dispatch = useDispatch();
  const [addToCartMutation, { isLoading }] = useAddToCartMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = (
    product: any,
    navigate: any,
    isLoggedIn: boolean,
    openPopup: any
  ) => {
    const isInCart = cartItems.find(
      (item) => item.product?._id === product._id
    );

    dispatch(addItemToCart({ product, quantity: 1 }));

    if (isInCart) {
      if (isLoggedIn) {
        navigate("/cart");
      } else {
        openPopup();
        localStorage.setItem("to", "/cart");
      }
    } else {
      addToCartMutation({
        productId: product._id,
        quantity: 1,
        product,
      })
        .unwrap()
        .then(() => {
          setSnackbarMessage("Added to cart!");
          setSnackbarSeverity("success");
        })
        .catch(() => {
          if (isLoggedIn) {
            setSnackbarMessage("Failed to add to cart!");
            setSnackbarSeverity("error");
            dispatch(removeItemFromCart(product._id));
          } else {
            setSnackbarMessage("Added to cart locally!");
            setSnackbarSeverity("success");
          }
        })
        .finally(() => {
          setOpenSnackbar(true);
        });
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return {
    handleAddToCart,
    isLoading,
    snackbarMessage,
    snackbarSeverity,
    openSnackbar,
    handleSnackbarClose,
  };
};

export default useAddToCart;
