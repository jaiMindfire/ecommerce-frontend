import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../models/cartTypes";
import { RootState } from "@store/index";

interface CartState {
  items: CartItem[];
  newItems: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  newItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.product?._id === action.payload.product?._id
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product?._id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.product?._id === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    mergeLocalCart(state, action: PayloadAction<CartItem[]>) {
      console.log("hererere");
      state.newItems = [...state.items];
      action.payload.forEach((serverItem) => {
        const existingItem = state.items.find(
          (item) => item?.product?._id === serverItem?.product?._id
        );
        console.log(state.newItems, "neew");
        if (!existingItem) {
          state.items.push({
            ...serverItem,
            quantity: serverItem.quantity,
          });
        } else {
          state.newItems = state.newItems.filter(
            (item) => item.product?._id !== serverItem.product?._id
          );
        }
      });

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
  mergeLocalCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
