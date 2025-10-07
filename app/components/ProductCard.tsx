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
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border-2 border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transform hover:-translate-y-1 hover:scale-[1.02] will-change-transform"
      tabIndex={0}
      aria-label={`Tarjeta de producto: ${product.name}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
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
      <div className="relative w-full h-48 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center p-4 group-hover:bg-opacity-95 transition-all duration-300">
          <Image
            src={product.image || '/images/placeholder.jpg'}
            alt={product.name}
            width={280}
            height={180}
            className={`max-h-full max-w-full object-contain transition-all duration-500 ease-in-out ${
              isHovering ? 'scale-110' : 'scale-100'
            }`}
            style={{
              filter: isHovering ? 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.1))' : 'none',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease',
            }}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
            }}
          />
        </div>
        {/* Efecto de resplandor en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-50/80 to-transparent dark:from-green-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <h3 className="font-bold text-lg text-green-900 dark:text-green-100 mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-1 line-clamp-2 min-h-[2.8rem]">
          {product.description}
        </p>
        
        {/* Precios */}
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          {/* Precio principal */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">Precio:</span>
              <span
                className="font-bold text-green-600 dark:text-green-400 text-xl"
                aria-label={`Precio: ${formatPrice(product.price)}`}
              >
                {formatPrice(product.price)}
              </span>
            </div>
            
            {/* Indicador de precios alternativos */}
            {product.prices && Object.keys(product.prices).length > 0 && (
              <div className="text-xs bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 px-2 py-1 rounded-full flex items-center">
                <Info size={12} className="mr-1 flex-shrink-0" />
                <span className="truncate">Precios especiales</span>
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
