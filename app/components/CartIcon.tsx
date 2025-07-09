'use client';

import { ShoppingCart } from 'lucide-react';


export default function CartIcon() {
  return (
    <span aria-label="Carrito de compras">
      <ShoppingCart className="w-6 h-6 text-green-800 dark:text-white" />
    </span>
  );
}
