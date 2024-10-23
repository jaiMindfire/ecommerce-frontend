// React imports
import { Suspense } from "react";
// Static Imports
import LoadingSpinner from "@components/Shared/LoadingSpinner";
import { getCart } from "@services/cartApi";
import { CartResponse } from "@models/cartTypes";
import CartPage from "@components/Cart/Cart";

export default async function Page() {
  let cartItems: CartResponse | undefined;
  try {
    //Get products by id.
    cartItems = await getCart();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return <CartPage cartItems={cartItems} />;
}
