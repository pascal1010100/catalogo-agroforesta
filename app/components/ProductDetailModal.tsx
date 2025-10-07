'use client';

import Image from "next/image";
import { X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brand?: string;
  model?: string;
  prices?: {
    minorista?: number;
    mayorista?: number;
    "mayorista-48"?: number;
  };
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden border border-gray-200 dark:border-gray-700">
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          onClick={onClose}
          aria-label="Cerrar detalles"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Sección de imagen */}
          <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-800 p-6 md:p-8 flex items-center justify-center">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src={product.image || '/images/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                }}
              />
            </div>
          </div>
          
          {/* Sección de información */}
          <div className="w-full md:w-1/2 p-6 flex flex-col">
            <div className="mb-2">
              {product.brand && (
                <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full mb-2">
                  {product.brand}
                </span>
              )}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{product.name}</h2>
              {product.model && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Modelo: {product.model}
                </p>
              )}
            </div>
            
            <div className="my-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Descripción</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {product.description || 'No hay descripción disponible.'}
              </p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Precios</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Precio regular:</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    Q{product.price?.toFixed(2) || '0.00'}
                  </span>
                </div>
                
                {product.prices && (
                  <div className="space-y-1 mt-3">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">Precios especiales:</h4>
                    {product.prices.minorista && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">• Minorista</span>
                        <span className="font-medium">Q{product.prices.minorista.toFixed(2)}</span>
                      </div>
                    )}
                    {product.prices.mayorista && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">• Mayorista</span>
                        <span className="font-medium">Q{product.prices.mayorista.toFixed(2)}</span>
                      </div>
                    )}
                    {product.prices["mayorista-48"] && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">• Mayorista 48+</span>
                        <span className="font-medium">Q{product.prices["mayorista-48"].toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
