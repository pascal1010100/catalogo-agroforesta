'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  brand?: string;
  model?: string;
  prices?: {
    minorista?: number;
    mayorista?: number;
    "mayorista-48"?: number;
  };
};

const categoryOrder = [
  'maquinaria',
  'fertilizantes',
  'herramientas',
  'semillas',
  'verduras',
  'frutas',
];

export default function ProductosCliente() {
  const searchParams = useSearchParams();
  const categoria = searchParams.get('categoria');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [groupedProducts, setGroupedProducts] = useState<Record<string, Product[]>>({});

  useEffect(() => {
    const filtered = categoria
      ? products.filter(
          (product) => product.category.toLowerCase() === categoria.toLowerCase()
        )
      : products;

    const grouped: Record<string, Product[]> = {};
    filtered.forEach((product) => {
      const cat = product.category.toLowerCase();
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(product);
    });

    setGroupedProducts(grouped);
  }, [categoria]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {categoria ? `Productos: ${categoria}` : 'Todos los productos'}
      </h1>

      {Object.keys(groupedProducts).length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        categoryOrder
          .filter((cat) => groupedProducts[cat])
          .map((cat) => (
            <div key={cat} className="mb-12">
              <h2 className="text-xl font-semibold mb-4 capitalize text-green-800 dark:text-green-200">
                {cat}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {groupedProducts[cat].map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onShowDetails={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>
          ))
      )}

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
