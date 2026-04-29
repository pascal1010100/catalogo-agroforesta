import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Using Inter as fallback for heading font to fix build error
const geist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
});

const APP_NAME = "Agroforesta";
const APP_DEFAULT_TITLE = "Agroforesta - Catálogo Profesional";
const APP_DESCRIPTION = "Soluciones agrícolas y de jardinería de alto rendimiento.";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#16a34a',
};

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          geist.variable
        )}
        suppressHydrationWarning
      >
        <Providers>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="bottom-right" />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
