// React imports
import { Suspense } from "react";
// Static Imports
import LoadingSpinner from "@components/Shared/LoadingSpinner";
import ProductListPage from "@components/Products/Products";
import { getProductById, getProducts } from "@services/productsApi";
import ProductDetailPage from "@components/Products/ProductDetail";
import { Product } from "@models/prodctsType";

export default async function Page({ params }: { params: { id: string } }) {
  const productId = params.id;
  let product: Product | undefined;

  try {
    //Get products by id.
    product = await getProductById(productId);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductDetailPage product={product} />
    </Suspense>
  );
}
