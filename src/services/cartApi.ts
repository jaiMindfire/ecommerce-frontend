import useAxiosMutation from "@hooks/useAxiosMutation";
import axiosClient from "./axiosClient";
import { CartItem, CartResponse } from "@models/cartTypes";
import { Product } from "@models/prodctsType";

// Fetch the current user's cart
export const getCart = async (): Promise<CartResponse> => {
  const { data } = await axiosClient.get("/api/cart");
  return data;
};

// Add a product to the cart
export const useAddCart = () => {
  const { mutate, loading, error } = useAxiosMutation();

  const addToCart = async (productId: string, quantity: number) => {
    await mutate("/api/cart", "POST", { productId, quantity });
  };

  return { addToCart, loading, error };
};

// Update the quantity of an existing cart item
export const useUpdateCartItem = () => {
  const { mutate, loading, error } = useAxiosMutation();

  const updateCartItem = async (productId: string, quantity: number) => {
    await mutate(`/api/cart`, "PUT", { productId, quantity });
  };

  return { updateCartItem, loading, error };
};

// Remove a product from the cart
export const useRemoveFromCart = () => {
  const { mutate, loading, error } = useAxiosMutation();

  const removeFromCart = async (productId: string) => {
    await mutate(`/api/cart/${productId}`, "DELETE");
  };

  return { removeFromCart, loading, error };
};

// Add multiple items to the cart in one request
export const useMassAddToCart = () => {
  const { mutate, loading, error } = useAxiosMutation();

  const massAddToCart = async (items: CartItem[]) => {
    await mutate("/api/cart/mass-add", "POST", { items });
  };

  return { massAddToCart, loading, error };
};

// Checkout the current cart
export const useCheckout = () => {
  const { mutate, loading, error } = useAxiosMutation();

  const checkout = async () => {
    await mutate("/api/cart/checkout", "POST");
  };

  return { checkout, loading, error };
};
