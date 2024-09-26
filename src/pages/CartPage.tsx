import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { RootState } from "../redux/store";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useMassAddToCartMutation,
  useCheckoutMutation,
} from "../features/cart/cartApi";
import {
  selectCartItems,
  removeItemFromCart,
  updateItemQuantity,
  mergeLocalCart,
  clearCart,
} from "../features/cart/cartSlice";
import CartProduct from "../components/CartProduct";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/cartTypes";
import { AddToCartButton } from "../components/ProductCard";

const CartPage: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);
  const items = useSelector(selectCartItems);
  // const newItems = useSelector((state: RootState) => state.cart.newItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [checkout, { isLoading: ischeckoutLoading, isError, isSuccess }] =
    useCheckoutMutation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(mergeLocalCart(cartItems?.items || []));
    const newItems: CartItem[] = [];
    const localItems = JSON.parse(localStorage.getItem("cart") || "[]");
    localItems?.forEach((item: any) => {
      const existingItem = cartItems?.items?.find(
        (cartItem) => cartItem.product._id === item?.product?._id
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
    dispatch(removeItemFromCart(productId));
    removeFromCart({ productId }).then(() => refetch());
  };

  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    originalQuantity: number
  ) => {
    dispatch(updateItemQuantity({ productId, quantity }));
    updateCartItem({ productId, quantity })
      .unwrap()
      .then(() => refetch())
      .catch((err) => {
        console.log("here");
        dispatch(
          updateItemQuantity({
            productId,
            quantity: originalQuantity,
          })
        );
      });
  };

  const handleCheckout = async () => {
    try {
      await checkout().unwrap();
      dispatch(clearCart());
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{ maxWidth: "90%", margin: "auto", padding: 2, marginTop: "10px" }}
    >
      <Grid container spacing={2} maxHeight="75vh" overflow="scroll">
        {items?.map((item) => (
          <Grid item xs={12} key={item.product?._id}>
            <CartProduct
              item={item}
              onRemove={() => handleRemoveItem(item.product._id)}
              handleUpdateQuantity={(
                quantity: number,
                originalQuantity: number
              ) =>
                handleUpdateQuantity(
                  item.product._id,
                  quantity,
                  originalQuantity
                )
              }
            />
          </Grid>
        ))}
      </Grid>
      <div style={{ display: "flex" }}>
        <AddToCartButton
          variant="contained"
          color="primary"
          style={{ width: "30%", marginLeft: "auto", marginTop: "20px" }}
          onClick={handleCheckout}
        >
          Place Order
        </AddToCartButton>
      </div>
    </Box>
  );
};

export default CartPage;
