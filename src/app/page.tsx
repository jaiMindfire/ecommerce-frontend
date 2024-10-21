import ProductListPage from "@pages/ProductListPage";
import { getProducts } from "@services/productsApi";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: number;
    limit?: number
  };
}) {
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 8
  const products = await getProducts({
    search,
    page,
    limit
  });

  return <ProductListPage products={products} />;
}
