//React Imports
import React, { lazy } from "react";
//3rd Party Imprts
import { createBrowserRouter } from "react-router-dom";
//Static Imports
import App from "src/App";
import NavbarLayout from "@layouts/NavbarLayout";
import NavbarWithFilterLayout from "@layouts/NavbarWithFilterLayout";

// Lazy loading components to optimize performance
// Uncomment these imports when you implement login and signup functionality
// const LoginPage = lazy(() => import("../pages/LoginPage"));
// const SignupPage = lazy(() => import("../pages/SignupPage"));
const ProductsPage = lazy(() => import("../pages/ProductListPage")); // Page to display a list of products
const ProductDetail = lazy(() => import("../pages/ProductDetailPage")); // Page to display details of a single product
const CartDetail = lazy(() => import("../pages/CartPage")); // Page to display cart details
const PageNotFound = lazy(() => import("../components/404")); // 404 page for unmatched routes

// Create a browser router for handling application routes
export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        // Layout for routes that require a standard navigation bar
        element: <NavbarLayout />,
        children: [
          {
            // Route for product detail page
            path: "products/:id",
            element: <ProductDetail />,
          },
          {
            // Route for cart page
            path: "/cart",
            element: <CartDetail />,
          },
          // Uncomment to enable login page route
          // {
          //   path: "/login",
          //   element: <LoginPage />,
          // },
          // Uncomment to enable signup page route
          // {
          //   path: "/signup",
          //   element: <SignupPage />,
          // },
          {
            // Catch-all route for 404 page
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
      {
        // Layout for routes that require a navigation bar with filters
        element: <NavbarWithFilterLayout />,
        children: [
          {
            // Route for the product listing page
            path: "/",
            element: <ProductsPage />,
          },
        ],
      },
    ],
  },
]);
