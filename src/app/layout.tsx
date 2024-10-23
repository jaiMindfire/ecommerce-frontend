// Next Imports
import type { Metadata } from "next";
import localFont from "next/font/local";
//3rd Party Imports
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
// Static Imports
import Navbar from "@components/Navbar/Navbar";
import StoreProvider from "@store/StoreProvider";
import { PopupProvider } from "@store/context/LoginPopupContext";

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <PopupProvider>
            <AppRouterCacheProvider>
              <Navbar />
              {children}
            </AppRouterCacheProvider>
          </PopupProvider>
        </StoreProvider>
      </body>
    </html>
  );
}