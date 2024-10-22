// React imports
import { Suspense } from "react";
// Static Imports
import LoadingSpinner from "@components/LoadingSpinner";
import ProductListPage from "@pages/ProductListPage";
import { getProducts } from "@services/productsApi";
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to /products when visiting /
  redirect('/Products');
}