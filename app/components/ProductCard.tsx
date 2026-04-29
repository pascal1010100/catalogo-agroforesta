'use client';

import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onShowDetails?: () => void;
}

export default function ProductCard({ product, onShowDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 800);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
    }).format(price);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden h-full">
      {/* Image Container */}
      <div className="relative h-64 w-full bg-white dark:bg-zinc-900/30 flex items-center justify-center overflow-hidden border-b">
        <div className="absolute inset-0 p-8">
          <Image
            src={product.image || '/images/hero1.jpg'}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {product.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary px-2.5 py-1 rounded-lg text-[10px] font-bold text-primary-foreground uppercase shadow-md">
              Popular
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-col gap-2 mb-6 flex-1">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            {product.category}
          </span>
          <h3 className="font-heading font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/40">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Precio</span>
            <span className="text-2xl font-bold tracking-tight text-foreground">{formatPrice(product.price)}</span>
          </div>
          
          <div className="flex gap-2.5">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={onShowDetails} 
              className="rounded-xl h-11 w-11 border-border/60 hover:bg-secondary hover:text-primary transition-all"
            >
              <Eye className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              onClick={handleAddToCart} 
              disabled={isAdding} 
              className={cn(
                "rounded-xl h-11 w-11 transition-all shadow-lg",
                isAdding ? "bg-green-500 scale-95" : "bg-primary shadow-primary/20"
              )}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
