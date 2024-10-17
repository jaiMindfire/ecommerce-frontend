import { createApi } from "@reduxjs/toolkit/query/react";
import { CartItem, CartResponse } from "@models/cartTypes";
import { Product } from "@models/prodctsType";
import errorHandlingMiddleware from "@middleware/errorHandlingMiddleware";

// Create an API slice for cart-related operations
export const cartApi = createApi({
  reducerPath: "cartApi", // Unique key for the slice in the Redux store
  baseQuery: errorHandlingMiddleware(process.env.REACT_APP_API_URL), // Base URL and error handling middleware for API requests
  endpoints: (builder) => ({
    // Fetch the current user's cart
    getCart: builder.query<CartResponse, void>({
      query: () => "/api/cart",
    }),

    // Add a product to the cart
    addToCart: builder.mutation<
      void,
      { productId: string; quantity: number; product: Product }
    >({
      query: ({ productId, quantity }) => ({
        url: "/api/cart",
        method: "POST",
        body: { productId, quantity }, // Product ID and quantity to add
      }),
    }),

    // Update the quantity of an existing cart item
    updateCartItem: builder.mutation<
      void,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/api/cart/`,
        method: "PUT",
        body: { productId, quantity }, // Updated product ID and quantity
      }),
    }),

    // Remove a product from the cart
    removeFromCart: builder.mutation<void, { productId: string }>({
      query: ({ productId }) => ({
        url: `/api/cart/${productId}`,
        method: "DELETE",
      }),
    }),

    // Add multiple items to the cart in one request
    massAddToCart: builder.mutation<void, CartItem[]>({
      query: (items) => ({
        url: "/api/cart/mass-add",
        method: "POST",
        body: { items }, // Array of cart items to add
      }),
    }),

    // Checkout the current cart
    checkout: builder.mutation<void, void>({
      query: () => ({
        url: "/api/cart/checkout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useMassAddToCartMutation,
  useCheckoutMutation,
} = cartApi;
