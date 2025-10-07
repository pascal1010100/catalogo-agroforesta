import { Inter, Poppins, Roboto_Mono } from 'next/font/google';

// Configuración de la fuente principal (Inter)
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Configuración de la fuente para títulos (Poppins)
export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

// Configuración de la fuente monoespaciada (Roboto Mono)
export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});
