// React imports
import { Suspense } from "react";
// Static Imports
import LoadingSpinner from "@components/LoadingSpinner";
import ProductListPage from "@pages/ProductListPage";
import { getProducts } from "@services/productsApi";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: number;
    limit?: number;
    priceRange?: number[];
    categories?: string[];
    rating?: number
  };
}) {
  console.log(searchParams, 'paramsss')
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 8;
  const priceRange = searchParams?.priceRange || [];
  const categories = searchParams?.categories || [];
  const rating = Number(searchParams?.rating) || 0
  let products;

  try {
    //Get products according to search params.
    products = await getProducts({
      search,
      page,
      limit,
      priceRange,
      categories,
      rating
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductListPage products={products} />
    </Suspense>
  );
}
