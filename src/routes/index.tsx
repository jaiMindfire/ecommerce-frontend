import { createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";
import App from "../App";
import NavbarLayout from "../layouts/NavbarLayout";

// const LoginPage = lazy(() => import("../pages/LoginPage"));
// const SignupPage = lazy(() => import("../pages/SignupPage"));
const ProductsPage = lazy(() => import("../pages/ProductListPage"));
const ProductDetail = lazy(() => import("../pages/ProductDetailPage"));
const CartDetail = lazy(() => import("../pages/CartPage"));
const PageNotFound = lazy(() => import("../components/404"));

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <NavbarLayout />,
        children: [
          {
            path: "/",
            element: <ProductsPage />,
          },
          {
            path: "products/:id",
            element: <ProductDetail />,
          },
          {
            path: "/cart",
            element: <CartDetail />,
          },
          // {
          //   path: "/login",
          //   element: <LoginPage />,
          // },
          // {
          //   path: "/signup",
          //   element: <SignupPage />,
          // },
          {
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
    ],
  },
]);
