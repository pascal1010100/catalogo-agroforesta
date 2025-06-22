'use client';

import { products } from "@/data/product";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";

export default function ProductosPage() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 id="productos-title" className="text-2xl font-bold mb-6">
        Todos los productos
      </h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        role="region"
        aria-labelledby="productos-title"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            added={addedId === product.id}
            onShowDetails={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
