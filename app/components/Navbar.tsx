'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import CartIcon from './CartIcon';
import CartModal from './CartModal';
import { useCart } from '@/context/CartContext';
import { Menu, X } from 'lucide-react';

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

          {/* Contenedor derecho: links + toggle + carrito + hamburguesa */}
          <div className="flex items-center gap-6 ml-auto">
            {/* Menú horizontal para md+ */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:underline font-medium">
                Inicio
              </Link>
              <Link href="/productos" className="hover:underline font-medium">
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

            {/* Botón del carrito */}
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

            {/* Botón menú hamburguesa para móvil */}
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

        {/* Menú desplegable móvil dentro del nav */}
        <div
          className={`md:hidden bg-white dark:bg-green-900/95 shadow-md px-6 py-4 space-y-4 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
          role="menu"
          aria-label="Menú de navegación móvil"
        >
          <Link
            href="/"
            className="block font-medium text-green-700 dark:text-green-200 hover:text-green-900 dark:hover:text-green-400"
            onClick={handleLinkClick}
            role="menuitem"
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            className="block font-medium text-green-700 dark:text-green-200 hover:text-green-900 dark:hover:text-green-400"
            onClick={handleLinkClick}
            role="menuitem"
          >
            Productos
          </Link>
          <a
            href="#contacto"
            onClick={scrollToContacto}
            className="block font-medium text-green-700 dark:text-green-200 hover:text-green-900 dark:hover:text-green-400 cursor-pointer"
            role="menuitem"
          >
            Contacto
          </a>
        </div>
      </nav>

      {/* Modal del carrito */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
