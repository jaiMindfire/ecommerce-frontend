// Next Imports
import type { Metadata } from "next";
import localFont from "next/font/local";
//3rd Party Imports
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
// Static Imports
import Navbar from "@components/Navbar/Navbar";
import StoreProvider from "@store/StoreProvider";
import { PopupProvider } from "@store/context/LoginPopupContext";
import ShoppingFilterPage from "@components/Shared/FilterComponent";
import { Box, CssBaseline } from "@mui/material";

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "An easy online shopping solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <ShoppingFilterPage />
      {children}
    </Box>
  );
}
