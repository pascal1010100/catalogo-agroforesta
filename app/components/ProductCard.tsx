'use client';

import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Tag, Info } from "lucide-react"; // Importamos iconos para mejorar la UI

// Importamos el tipo Product desde data/products para mantener consistencia
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onShowDetails: () => void;
}

export default function ProductCard({ product, onShowDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 600); // Feedback visual
  };

  // Formateador de precio con símbolo Q
  const formatPrice = (price: number) => {
    return `Q${price.toFixed(2)}`;
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
      tabIndex={0}
      aria-label={`Tarjeta de producto: ${product.name}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Badge para marca/modelo si existe */}
      {(product.brand || product.model) && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-xs px-2 py-1 rounded-full flex items-center">
            <Tag size={12} className="mr-1" />
            {product.brand && product.model 
              ? `${product.brand} - ${product.model}`
              : product.brand || product.model}
          </span>
        </div>
      )}

      {/* Imagen con efecto hover */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={product.image || '/images/placeholder.jpg'}
          alt={product.name}
          width={320}
          height={160}
          className={`w-full h-40 object-contain p-2 transition-transform duration-300 ${
            isHovering ? 'scale-110' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-semibold text-lg text-green-900 dark:text-green-100">
          {product.name}
        </h3>
        
        <p className="text-green-800 dark:text-green-200 text-sm mb-2 flex-1 line-clamp-2">
          {product.description}
        </p>
        
        {/* Precios */}
        <div className="mt-auto">
          {/* Precio principal */}
          <div className="flex items-center justify-between mt-2">
            <span
              className="font-bold text-green-700 dark:text-green-300 text-lg"
              aria-label={`Precio: ${formatPrice(product.price)}`}
            >
              {formatPrice(product.price)}
            </span>
            
            {/* Indicador de precios alternativos */}
            {product.prices && Object.keys(product.prices).length > 0 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Info size={12} className="mr-1" />
                Precios mayoristas disponibles
              </div>
            )}
          </div>
          
          {/* Botones */}
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={onShowDetails}
              aria-label={`Ver detalles de ${product.name}`}
              className="flex-1"
            >
              Ver detalles
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleAddToCart}
              aria-label={`Agregar ${product.name} al carrito`}
              disabled={isAdding}
              className={`flex-1 ${isAdding ? "animate-pulse" : ""}`}
            >
              {isAdding ? "¡Agregado!" : "Agregar al carrito"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
