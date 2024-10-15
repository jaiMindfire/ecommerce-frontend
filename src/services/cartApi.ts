import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem, CartResponse } from "@models/cartTypes";
import { Product } from "@models/prodctsType";
import errorHandlingMiddleware from "@middleware/errorHandlingMiddleware";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: errorHandlingMiddleware(process.env.REACT_APP_API_URL),
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
