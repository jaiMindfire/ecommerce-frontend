// Next Imports
import type { Metadata } from "next";
// Static Imports
import ShoppingFilterPage from "@components/Shared/FilterComponent";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Products",
  description: "An ",
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
