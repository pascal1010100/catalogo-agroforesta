'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import CartIcon from './CartIcon';
import CartModal from './CartModal';
import { SearchBar } from './SearchBar';
import { useCart } from '@/context/CartContext';
import { Menu, X, Facebook, Instagram, Phone } from 'lucide-react';


// Removed unused NavbarProps interface and products prop

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const scrollToContacto = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleLinkClick();
  };

  return (
    <>
      <nav
        className="flex flex-col sticky top-0 z-50 bg-white/90 dark:bg-green-900/90 shadow"
        role="navigation"
        aria-label="Barra de navegación principal"
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo y título */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Agroforesta" width={82} height={62} priority />
            <span className="font-bold text-green-850 dark:text-white text-lg">Agroforesta</span>
          </div>

          {/* Contenedor derecho */}
          <div className="flex items-center gap-6 ml-auto">
            {/* Menú horizontal para md+ */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:underline font-medium">
                Inicio
              </Link>
              <Link
                href="/productos"
                className="hover:underline font-medium text-green-900 dark:text-yellow-200"
              >
                Productos
              </Link>
              <a
                href="#contacto"
                onClick={scrollToContacto}
                className="hover:underline font-medium cursor-pointer"
              >
                Contacto
              </a>
            </div>

            <ThemeToggle />

            {/* SearchBar */}
            <SearchBar />

            {/* Carrito */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative focus:outline-none"
              aria-label="Abrir carrito de compras"
            >
              <CartIcon />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center pointer-events-none select-none">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Hamburguesa */}
            <button
              type="button"
              className="md:hidden focus:outline-none text-green-700 dark:text-green-200 hover:text-green-900 dark:hover:text-green-400"
              aria-label="Abrir menú de navegación"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer hamburguesa */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 h-full w-72 bg-white/90 dark:bg-green-900/95 backdrop-blur-md z-50 shadow-xl p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Agroforesta" width={40} height={40} />
                <span className="font-bold text-green-800 dark:text-white text-lg">Agroforesta</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="text-green-800 dark:text-green-100">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-4">
              <Link
                href="/"
                onClick={handleLinkClick}
                className="hover:underline text-green-800 dark:text-green-200"
              >
                Inicio
              </Link>
              <Link
                href="/productos"
                onClick={handleLinkClick}
                className="hover:underline font-medium text-green-900 dark:text-yellow-200"
              >
                Productos
              </Link>
              <a
                href="#contacto"
                onClick={scrollToContacto}
                className="hover:underline text-green-800 dark:text-green-200"
              >
                Contacto
              </a>
            </nav>

            <div className="mt-auto border-t border-green-300 dark:border-green-700 pt-4">
              <span className="text-sm font-medium text-green-700 dark:text-green-200 mb-2 block">Síguenos:</span>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="w-5 h-5 text-green-800 dark:text-green-100 hover:text-blue-600 transition" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-5 h-5 text-green-800 dark:text-green-100 hover:text-pink-500 transition" />
                </a>
                <a href="https://wa.me/50212345678" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <Phone className="w-5 h-5 text-green-800 dark:text-green-100 hover:text-green-500 transition" />
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
