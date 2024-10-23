// React imports
import { Suspense } from "react";
// Static Imports
import LoadingSpinner from "@components/Shared/LoadingSpinner";
import ProductListPage from "@components/Products/Products";
import { getProductById, getProducts } from "@services/productsApi";
import ProductDetailPage from "@components/Products/ProductDetail";
import { Product } from "@models/prodctsType";
import { getCart } from "@services/cartApi";
import { CartItem, CartResponse } from "@models/cartTypes";
import CartPage from "@components/Cart/Cart";

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
