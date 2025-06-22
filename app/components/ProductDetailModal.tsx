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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg relative p-6">
        <button
          className="absolute top-3 right-3 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={onClose}
          aria-label="Cerrar detalles"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="object-contain rounded"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 text-green-900 dark:text-green-100">{product.name}</h2>
            {product.model && <p className="text-xs text-gray-500 mb-1">{product.model}</p>}
            <p className="text-green-700 dark:text-green-300 font-bold mb-2">
              Q {product.price?.toFixed(2) ?? "0.00"}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">{product.description}</p>
            {product.prices && (
              <div className="text-xs text-gray-700 dark:text-gray-200 space-y-1 mb-2">
                {product.prices.minorista && (
                  <div>Minorista: Q {product.prices.minorista.toFixed(2)}</div>
                )}
                {product.prices.mayorista && (
                  <div>Mayorista: Q {product.prices.mayorista.toFixed(2)}</div>
                )}
                {product.prices["mayorista-48"] && (
                  <div>Mayorista 48+: Q {product.prices["mayorista-48"].toFixed(2)}</div>
                )}
              </div>
            )}
            {product.brand && <span className="text-xs text-gray-400">{product.brand}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
