'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from 'next-themes';
import CartModal from './CartModal';
import SearchModal from './SearchModal';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/productos' },
    { name: 'Nosotros', href: '/#aboutsection' },
    { name: 'Contacto', href: '/#contacto' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 dark:bg-gray-900/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo a la izquierda */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-accent dark:text-accent">
                Agroforesta
              </Link>
            </div>

            {/* Barra de búsqueda en el centro - Solo desktop */}
            <div className="hidden md:flex flex-1 justify-center px-4">
              <form onSubmit={handleSearch} className="w-full max-w-xl">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-foreground/60" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="block w-full pl-10 pr-3 py-2 border border-border rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent bg-card/50 dark:bg-gray-800/80 text-foreground sm:text-sm"
                  />
                </div>
              </form>
            </div>

            {/* Controles de la derecha */}
            <div className="flex items-center space-x-1 md:space-x-4 ml-auto">
              {/* Enlaces de navegación */}
              <div className="hidden md:flex space-x-1">
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      pathname === link.href.split('#')[0]
                        ? 'text-accent bg-accent/10 dark:bg-accent/20'
                        : 'text-foreground/80 hover:bg-accent/10 dark:hover:bg-accent/20'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Botón de búsqueda en móvil */}
              <button 
                onClick={toggleSearch}
                className="md:hidden p-2 text-foreground/80 hover:text-accent rounded-full hover:bg-accent/10 dark:hover:bg-accent/20"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Botón de tema */}
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-foreground/80 hover:text-accent rounded-full hover:bg-accent/10 dark:hover:bg-accent/20"
                aria-label="Cambiar tema"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Carrito */}
              <div className="relative">
                <button 
                  onClick={handleCartClick}
                  className="p-2 text-foreground/80 hover:text-accent rounded-full hover:bg-accent/10 dark:hover:bg-accent/20"
                  aria-label="Carrito de compras"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md ring-2 ring-white dark:ring-gray-900">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Menú móvil */}
              <button 
                className="md:hidden p-2 text-foreground/80 hover:text-accent rounded-full hover:bg-accent/10 dark:hover:bg-accent/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menú"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 text-base font-medium ${
                    pathname === link.href.split('#')[0]
                      ? 'bg-accent/20 text-accent dark:bg-accent/30'
                      : 'text-foreground/80 hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Modal de búsqueda */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Modal del carrito */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
}
