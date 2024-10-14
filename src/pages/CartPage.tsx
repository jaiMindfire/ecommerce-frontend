import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { RootState } from "../redux/store";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useMassAddToCartMutation,
  useCheckoutMutation,
} from "@services/cartApi";
import {
  selectCartItems,
  removeItemFromCart,
  updateItemQuantity,
  mergeLocalCart,
  clearCart,
} from "../store/redux/cartSlice";
import CartProduct from "../components/CartProduct";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../models/cartTypes";
import OrderSuccessNotification from "./OrderSuccessPage";
import NoItemsInCart from "../components/NoCartItems";
import { setCheckedOut } from "../store/redux/productsSlice";
import { usePopup } from "../store/context/LoginPopupContext";

const CartPage: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  );
  const [showOrder, setShowOrder] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [massAddToCart] = useMassAddToCartMutation();
  const [checkout, { isLoading: ischeckoutLoading }] = useCheckoutMutation();

  const { openModal, closeModal } = usePopup();

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("to", "/cart");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    dispatch(mergeLocalCart(cartItems?.items || []));
    const newItems: CartItem[] = [];
    const localItems = JSON.parse(localStorage.getItem("cart") || "[]");
    localItems?.forEach((item: any) => {
      const existingItem = cartItems?.items?.find(
        (cartItem) => cartItem.product?._id === item?.product?._id
      );
      if (!existingItem) {
        newItems.push(item);
      }
    });
    if (newItems?.length) {
      massAddToCart(newItems);
    }
  }, [cartItems, isLoggedIn, dispatch]);

  const handleRemoveItem = (productId: string) => {
    setLoadingItemId(productId);

    removeFromCart({ productId })
      .then(() => {
        dispatch(removeItemFromCart(productId));
        refetch();
        showSnackbar("Item removed successfully!", "success");
      })
      .catch(() => {
        showSnackbar("Failed to remove item.", "error");
      })
      .finally(() => {
        setLoadingItemId(null);
      });
  };

  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    originalQuantity: number
  ) => {
    dispatch(updateItemQuantity({ productId, quantity }));
    updateCartItem({ productId, quantity })
      .unwrap()
      .then(() => {
        refetch();
        showSnackbar("Quantity updated successfully!", "success");
      })
      .catch((e) => {
        dispatch(
          updateItemQuantity({
            productId,
            quantity: originalQuantity,
          })
        );
        showSnackbar(e.data.message, "error");
      });
  };

  const handleCheckout = async () => {
    const totalAmount = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    try {
      await checkout().unwrap();
      refetch();
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

  const showSnackbar = (message: string, type: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: { xs: "block", md: "flex" },
        padding: 2,
        marginTop: "10px",
      }}
    >
      {items?.length ? (
        <>
          <Box
            sx={{
              flex: 3,
              maxHeight: "75vh",
              overflowY: "auto",
              pr: 2,
              "&::-webkit-scrollbar": { width: "10px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
            }}
          >
            <Grid container spacing={2}>
              {items?.map((item) => (
                <Grid item xs={12} key={item.product?._id}>
                  <CartProduct
                    item={item}
                    onRemove={() => handleRemoveItem(item.product?._id)}
                    handleUpdateQuantity={(
                      quantity: number,
                      originalQuantity: number
                    ) =>
                      handleUpdateQuantity(
                        item.product?._id,
                        quantity,
                        originalQuantity
                      )
                    }
                    isLoading={loadingItemId === item.product?._id}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

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
                <Typography variant="body1">
                  Total Items:{" "}
                  {items.reduce((acc, item) => acc + item?.quantity, 0)}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Total Amount: $
                  {items
                    .reduce(
                      (acc, item) => acc + item.product?.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleCheckout}
                  disabled={ischeckoutLoading}
                >
                  {ischeckoutLoading ? "Processing..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </Box>
        </>
      ) : (
        <NoItemsInCart />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {showOrder ? (
        <OrderSuccessNotification
          totalAmount={Number(localStorage.getItem("totalAmount") || 0).toFixed(
            2
          )}
          totalItems={Number(localStorage.getItem("totalItems"))}
        />
      ) : null}
    </Box>
  );
};

export default CartPage;
