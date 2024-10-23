// React imports
import { Suspense } from "react";
// Next imports
import { Metadata } from "next";
// Static Imports
import LoadingSpinner from "@components/Shared/LoadingSpinner";
import { getProductById } from "@services/productsApi";
import ProductDetailPage from "@components/Products/ProductDetail";
import { Product } from "@models/prodctsType";

export const metadata: Metadata = {
  title: "Products Detail",
  description: "Products detail page",
};

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
      <ProductDetailPage product={product} />
  );
}
