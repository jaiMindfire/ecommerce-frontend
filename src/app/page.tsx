// React imports
import { Suspense } from "react";
// Static Imports
import LoadingSpinner from "@components/Shared/LoadingSpinner";
import ProductListPage from "@components/Products/Products";
import { getProducts } from "@services/productsApi";
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to /products when visiting /
  redirect('/Products');
}