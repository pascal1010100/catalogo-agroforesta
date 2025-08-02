import { notFound } from "next/navigation";
import { products } from '@/data/products';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md object-cover rounded-lg mb-6"
      />
      <p className="mb-4 text-lg">{product.description}</p>
      <p className="font-semibold text-green-700 dark:text-green-300">
        Precio: Q{product.price.toFixed(2)} por {product.unidad}
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Categoría: {product.category}
      </p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Marca: {product.brand}
      </p>
    </main>
  );
}
