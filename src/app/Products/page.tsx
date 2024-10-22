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
  };
}) {
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 8;

  let products;

  try {
    //Get products according to search params.
    products = await getProducts({
      search,
      page,
      limit,
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
