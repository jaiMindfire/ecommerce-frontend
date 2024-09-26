import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem, CartResponse } from "../../types/cartTypes";
import { Product } from "../../types/prodctsType";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => "/api/cart",
    }),

    addToCart: builder.mutation<
      void,
      { productId: string; quantity: number; product: Product }
    >({
      query: ({ productId, quantity }) => ({
        url: "/api/cart",
        method: "POST",
        body: { productId, quantity },
      }),
    }),

    updateCartItem: builder.mutation<
      void,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/api/cart/`,
        method: "PUT",
        body: { productId, quantity },
      }),
    }),

    removeFromCart: builder.mutation<void, { productId: string }>({
      query: ({ productId }) => ({
        url: `/api/cart/${productId}`,
        method: "DELETE",
      }),
    }),

    syncCart: builder.mutation<CartItem[], CartItem[]>({
      query: (localCart) => ({
        url: "/api/cart/sync",
        method: "POST",
        body: { items: localCart },
      }),
    }),
    massAddToCart: builder.mutation<void, CartItem[]>({
      query: (items) => ({
        url: "/api/cart/mass-add",
        method: "POST",
        body: { items },
      }),
    }),
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
  useSyncCartMutation,
  useMassAddToCartMutation,
  useCheckoutMutation,
} = cartApi;
