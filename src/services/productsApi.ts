import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginatedProductsResponse, Product } from "@models/prodctsType";

// Create an API slice for product-related operations
export const productsApi = createApi({
  reducerPath: "productsApi", // Unique key for the slice in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    // Fetch a paginated list of products with optional filters
    getProducts: builder.query<
      PaginatedProductsResponse,
      {
        search: string; // Search term for filtering products
        page: number; // Current page number for pagination
        limit: number; // Number of products per page
        priceRange?: number[]; // Optional price range for filtering
        categories?: string[]; // Optional categories for filtering
        rating?: number; // Optional rating for filtering
        sizes?: string[]; // Optional sizes for filtering
      }
    >({
      query: ({
        search,
        page,
        limit,
        priceRange,
        categories,
        rating,
        sizes,
      }) => ({
        url: `/api/products`, // Endpoint for fetching products
        params: {
          search, // Pass the search term as a query parameter
          page, // Pass the current page as a query parameter
          limit, // Pass the limit as a query parameter
          priceRange: priceRange?.join(","), // Convert price range array to a comma-separated string
          categories: categories?.join(","), // Convert categories array to a comma-separated string
          rating, // Pass the rating as a query parameter
        },
      }),
    }),

    // Fetch a single product by its ID
    getProductById: builder.query<Product, string>({
      query: (id) => `/api/products/${id}`,
    }),

    // Fetch available product categories
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
