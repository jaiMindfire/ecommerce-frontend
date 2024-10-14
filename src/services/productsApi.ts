import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginatedProductsResponse, Product } from "@models/prodctsType";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      PaginatedProductsResponse,
      {
        search: string;
        page: number;
        limit: number;
        priceRange?: number[];
        categories?: string[];
        rating?: number;
        colors?: string[];
        sizes?: string[];
      }
    >({
      query: ({
        search,
        page,
        limit,
        priceRange,
        categories,
        rating,
        colors,
        sizes,
      }) => ({
        url: `/api/products`,
        params: {
          search,
          page,
          limit,
          priceRange: priceRange?.join(","),
          categories: categories?.join(","),
          rating,
        },
      }),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/api/products/${id}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => `/api/products/categories`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = productsApi;
