//React Imports
import React, { useState } from "react";
//3rd party Imports
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
//Static Imports
// import {
//   useUpdateCartItemMutation,
//   useRemoveFromCartMutation,
// } from "@services/cartApi";
import { removeItemFromCart, updateItemQuantity } from "@store/redux/cartSlice";
import CartProduct from "@components/CartProduct";
import { CartItem } from "@models/cartTypes";
import { RootState } from "@store/index";
import { removeFromCart, updateCartItem } from "@services/cartApi";

interface CartProductListProps {
  showSnackbar: (message: string, type: "success" | "error") => void;
}

const CartProductList: React.FC<CartProductListProps> = ({ showSnackbar }) => {
  //states
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  //redux-states
  const items = useSelector((state: RootState) => state.cart.items);
  //hooks
  const dispatch = useDispatch();
  // const [updateCartItem] = useUpdateCartItemMutation();
  // const [removeFromCart] = useRemoveFromCartMutation();

  // Function to handle item removal from the cart
  const handleRemoveItem = (productId: string) => {
    setLoadingItemId(productId);
    removeFromCart(productId)
      .then(() => {
        dispatch(removeItemFromCart(productId)); //Remove item from cart action
        showSnackbar("Item removed successfully!", "success");
      })
      .catch((error) => {
        showSnackbar(error.data, "error");
      })
      .finally(() => {
        setLoadingItemId(null);
      });
  };

  // Function to update the quantity of an item
  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    originalQuantity: number
  ) => {
    dispatch(updateItemQuantity({ productId, quantity })); //Update current cart item's quantity action.
    updateCartItem(productId, quantity)
      .then(() => {
        showSnackbar("Quantity updated successfully!", "success");
      })
      .catch((e) => {
        dispatch(updateItemQuantity({ productId, quantity: originalQuantity }));
        showSnackbar(e.data.message, "error");
      });
  };

  return (
    <Box sx={{ flex: 3, maxHeight: "75vh", overflowY: "auto", pr: 2 }}>
      <Grid container spacing={2}>
        {items.map((item: CartItem) => (
          <Grid item xs={12} key={item.product?._id}>
            <CartProduct
              item={item}
              onRemove={() => handleRemoveItem(item.product?._id)}
              handleUpdateQuantity={(quantity, originalQuantity) =>
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
  );
};

export default CartProductList;
