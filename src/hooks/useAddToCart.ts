//React Imports
import { useState } from "react";
//3rd Party Imports
import { useDispatch, useSelector } from "react-redux";
//Static Imports
import { addItemToCart, removeItemFromCart } from "@store/redux/cartSlice";
import { useAddToCartMutation } from "@services/cartApi";
import { RootState } from "@store/index";

const useAddToCart = () => {
  //state
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  //redux-state
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  //hooks
  const dispatch = useDispatch();
  const [addToCartMutation, { isLoading }] = useAddToCartMutation();

  //Function to handle adding a product to the cart
  const handleAddToCart = (
    product: any,
    navigate: any,
    isLoggedIn: boolean,
    openPopup: any
  ) => {
    //Check if the product is already in the cart
    const isInCart = cartItems.find(
      (item) => item.product?._id === product._id
    );

    //Dispatch action to add the item to the cart
    dispatch(addItemToCart({ product, quantity: 1 }));

    //If the product is already in the cart
    if (isInCart) {
      //Navigate to the cart if logged in, otherwise open login popup
      if (isLoggedIn) {
        navigate("/cart");
      } else {
        openPopup();
        localStorage.setItem("to", "/cart"); //Save redirection path to local storage
      }
    } else {
      //If not in cart, make an API call to add the product
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
          //Handle errors during the add to cart operation
          if (isLoggedIn) {
            setSnackbarMessage("Failed to add to cart!");
            setSnackbarSeverity("error");
            dispatch(removeItemFromCart(product._id)); //Remove from cart if the operation fails
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

  //Function to handle snackbar close action
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
