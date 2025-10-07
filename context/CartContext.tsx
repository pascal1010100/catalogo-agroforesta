'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

// Tipos de producto y carrito
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isLoaded: boolean;
  lastAddedItem: { id: string; timestamp: number } | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<{ id: string; timestamp: number } | null>(null);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        // Validar que el carrito es un array de objetos con id y quantity
        if (Array.isArray(parsed) && parsed.every(item => item.id && typeof item.quantity === 'number')) {
          setCart(parsed);
        } else {
          setCart([]);
        }
      }
    } catch (error) {
      console.error('Error cargando carrito desde localStorage:', error);
      setCart([]);
    }
    setIsLoaded(true);
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Agregar producto al carrito
  const addToCart = useCallback((product: Product) => {
    if (!product.id || typeof product.price !== 'number') {
      console.error('Producto inválido:', product);
      return;
    }
    
    setLastAddedItem({ id: product.id, timestamp: Date.now() });
    
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  // Eliminar producto del carrito
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Total a pagar
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Total de artículos
  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  // Exponer el contexto
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isLoaded,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
