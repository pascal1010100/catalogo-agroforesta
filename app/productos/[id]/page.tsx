import { notFound } from "next/navigation";

// Update the import path below if your product data file is in a different location or has a different name
// Update the import path below if your product data file is in a different location or has a different name
// import { products } from '../../../../data/products';

// Example: If your products file is named 'products.ts' and is in 'src/data', update as follows:
import { products } from '../../../data/products';

// If the file is named differently or in another folder, adjust the path accordingly.






interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  // Buscar el producto por id en la lista de productos
  interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    unidad: string;
    category: string;
    brand: string;
    // Agrega más campos si existen en tu modelo de producto
  }

  const product: Product | undefined = products.find((p: Product) => p.id === params.id);

  // Si no existe, mostrar página 404
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
      {/* Puedes agregar más detalles aquí, como categoría, marca, etc. */}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Categoría: {product.category}
      </p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Marca: {product.brand}
      </p>
    </main>
  );
}
