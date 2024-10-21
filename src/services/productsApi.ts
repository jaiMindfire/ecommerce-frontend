// productService.js
import axiosClient from "./axiosClient";
import { PaginatedProductsResponse, Product } from "@models/prodctsType";

// Fetch a paginated list of products with optional filters
export const getProducts = async ({
  search,
  page,
  limit,
  priceRange,
  categories,
  rating,
  sizes,
}: {
  search?: string; // Search term for filtering products
  page?: number; // Current page number for pagination
  limit?: number; // Number of products per page
  priceRange?: number[]; // Optional price range for filtering
  categories?: string[]; // Optional categories for filtering
  rating?: number; // Optional rating for filtering
  sizes?: string[]; // Optional sizes for filtering
}): Promise<PaginatedProductsResponse> => {
  console.log(search, page, 'pagee')
  const { data } = await axiosClient.get("/api/products", {
    params: {
      search,
      page,
      limit,
      priceRange: priceRange?.join(","),
      categories: categories?.join(","),
      rating,
      sizes: sizes?.join(","),
    },
  });
  console.log(data)
  return data;
};

// Fetch a single product by its ID
export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await axiosClient.get(`/api/products/${id}`);
  return data;
};

// Fetch available product categories
export const getCategories = async (): Promise<string[]> => {
  const { data } = await axiosClient.get("/api/products/categories");
  return data;
};
