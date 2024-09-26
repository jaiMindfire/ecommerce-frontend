import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginatedProductsResponse, Product } from "../../types/prodctsType";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      PaginatedProductsResponse,
      { search: string; page: number; limit: number }
    >({
      query: ({ search, page, limit }) => ({
        url: `/api/products`,
        params: { search, page, limit },
      }),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/api/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
