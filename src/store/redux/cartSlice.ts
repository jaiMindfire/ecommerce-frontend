import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@models/cartTypes";
import { RootState } from "@store/index";

interface CartState {
  items: CartItem[]; // Array of items currently in the cart
  newItems: CartItem[]; // Temporary array to hold items for merging with server data
}

// Initial state for the cart slice, loading items from local storage
const initialState: CartState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : "[]",
  newItems: [],
};

// Create a slice for cart-related actions and state
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find(
        (item) => item.product?._id === action.payload.product?._id
      );
      // If it doesn't exist, add the new item
      if (!existingItem) {
        state.items.push(action.payload);
      }
      // Update local storage with the new cart state
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Action to remove an item from the cart by product ID
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product?._id !== action.payload // Filter out the item to remove
      );
      // Update local storage with the new cart state
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Action to update the quantity of a specific cart item
    updateItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.product?._id === action.payload.productId // Find the item by product ID
      );
      // If the item exists, update its quantity
      if (item) {
        item.quantity = action.payload.quantity;
      }
      // Update local storage with the new cart state
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Action to clear all items from the cart
    clearCart: (state) => {
      state.items = []; // Set items array to empty
      // Update local storage to reflect the cleared cart
      localStorage.setItem("cart", JSON.stringify([]));
    },

    // Action to merge the local cart with the server cart data
    mergeLocalCart: (state, action: PayloadAction<CartItem[]>) => {
      console.log("hererere"); // Debug log
      state.newItems = [...state.items]; // Copy current items to newItems for merging
      action.payload.forEach((serverItem) => {
        const existingItem = state.items.find(
          (item) => item?.product?._id === serverItem?.product?._id // Check if the item exists in the local cart
        );
        // If the item does not exist, add it to the local cart
        if (!existingItem) {
          state.items.push({
            ...serverItem,
            quantity: serverItem.quantity, // Ensure quantity is preserved
          });
        } else {
          // If it exists, remove it from newItems
          state.newItems = state.newItems.filter(
            (item) => item.product?._id !== serverItem.product?._id
          );
        }
      });
      // Update local storage with the new cart state
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

// Selector to get cart items from the state
export const selectCartItems = (state: RootState) => state.cart.items;
