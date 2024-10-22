import axiosClient from "./axiosClient";
import { CartItem, CartResponse } from "@models/cartTypes";
import { Product } from "@models/prodctsType";

// Fetch the current user's cart
export const getCart = async (): Promise<CartResponse> => {
  const { data } = await axiosClient.get("/api/cart");
  return data;
};

// Add a product to the cart
export const addToCart = async (
  productId: string,
  quantity: number
): Promise<void> => {
  await axiosClient.post("/api/cart", { productId, quantity });
};

// Update the quantity of an existing cart item
export const updateCartItem = async (
  productId: string,
  quantity: number
): Promise<void> => {
  await axiosClient.put(`/api/cart`, { productId, quantity });
};

// Remove a product from the cart
export const removeFromCart = async (productId: string): Promise<void> => {
  await axiosClient.delete(`/api/cart/${productId}`);
};

// Add multiple items to the cart in one request
export const massAddToCart = async (items: CartItem[]): Promise<void> => {
  await axiosClient.post("/api/cart/mass-add", { items });
};

// Checkout the current cart
export const checkout = async (): Promise<void> => {
  await axiosClient.post("/api/cart/checkout");
};
