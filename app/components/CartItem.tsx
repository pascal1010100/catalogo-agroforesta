'use client';

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartItemProps {
  product: Product;
}

export default function CartItem({ product }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();

  // No renderiza si quantity es 0 o menor
  if (product.quantity <= 0) return null;

  const handleDecrease = () => {
    const newQuantity = product.quantity - 1;
    updateQuantity(product.id, newQuantity);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, product.quantity + 1);
  };

  return (
    <div className="flex items-center gap-4 border-b py-3">
      <Image
        src={product.image}
        alt={product.name}
        width={60}
        height={60}
        className="object-contain rounded"
      />
      <div className="flex-1">
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-muted-foreground">
          Q{product.price.toFixed(2)}
        </p>

        {/* Controles de cantidad */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="icon"
            variant="outline"
            onClick={handleDecrease}
            // NO disabled aquí para permitir llegar a 0 y eliminar producto
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-2">{product.quantity}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={handleIncrease}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(product.id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
