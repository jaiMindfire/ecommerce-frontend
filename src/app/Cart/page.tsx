// React imports
import { Suspense } from "react";
// Static Imports
import LoadingSpinner from "@components/LoadingSpinner";
import ProductListPage from "@pages/ProductListPage";
import { getProductById, getProducts } from "@services/productsApi";
import ProductDetailPage from "@pages/ProductDetailPage";
import { Product } from "@models/prodctsType";
import CartPage from "@pages/CartPage";
import { getCart } from "@services/cartApi";
import { CartItem, CartResponse } from "@models/cartTypes";

export default async function Page() {
  let cartItems: CartResponse | undefined
  try {
    //Get products by id.
    cartItems = await getCart();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CartPage cartItems={cartItems}/>
    </Suspense>
  );
}
