import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { products } from "@/data/products";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agroforesta",
  description: "Tienda online de productos de jardinería y agroforesta",  
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <Navbar products={products} />  {/* Pasa los productos aquí */}
            <main className="flex-1">{children}</main>
            <Footer />  
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#fff",
                  color: "#166534",
                  fontWeight: 500,
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                },
                duration: 2200,
              }}
            />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
