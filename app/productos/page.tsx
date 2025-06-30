'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { products } from '@/data/product';
import { useCart } from '@/context/CartContext';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';

export default function ProductosPage() {
  const searchParams = useSearchParams();
  const categoria = searchParams.get('categoria');

  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (categoria) {
      setFilteredProducts(
        products.filter(
          (product) => product.category.toLowerCase() === categoria.toLowerCase()
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [categoria]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {categoria ? `Productos: ${categoria}` : 'Todos los productos'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              added={addedId === product.id}
              onShowDetails={() => setSelectedProduct(product)}
            />
          ))
        )}
      </div>
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
