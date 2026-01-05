import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag, Layers, Check, ShoppingBag } from "lucide-react";
import { products, getProductById, getProductsByCategory, type Product } from "@/data/products";
import AddToCartButton from "@/app/components/AddToCartButton";
import ProductCard from "@/app/components/ProductCard";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// Generar metadatos dinámicos para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Producto no encontrado | Agroforesta" };
  }

  return {
    title: `${product.name} | Catálogo Agroforesta`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  // Obtener productos relacionados (misma categoría, excluyendo el actual)
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3); // Mostrar máximo 3 relacionados

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Breadcrumb / Navegación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/productos"
          className="inline-flex items-center text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver al catálogo
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-10">

            {/* Columna Izquierda: Imagen */}
            <div className="relative group">
              <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                {/* Nota: En producción usar next/image para optimización */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {product.featured && (
                <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Destacado
                </span>
              )}
            </div>

            {/* Columna Derecha: Información */}
            <div className="flex flex-col justify-center">
              <div className="mb-2">
                <span className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-0.5 rounded-md">
                  <Layers className="w-3 h-3 mr-1" />
                  {product.category}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {product.brand} {product.model && `• ${product.model}`}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  Q{product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  / {product.unidad}
                </span>
              </div>

              <div className="prose prose-green dark:prose-invert max-w-none mb-8 text-gray-600 dark:text-gray-300">
                <p>{product.description}</p>
              </div>

              {/* Botón de compra */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
                <AddToCartButton product={product} size="lg" className="w-full sm:flex-1" />
              </div>

              {/* Especificaciones Técnicas */}
              {product.specifications && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    Especificaciones
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="border-b border-gray-200 dark:border-gray-600 pb-2 last:border-0 last:pb-0">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{key}</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white font-semibold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <ShoppingBag className="w-6 h-6 mr-2 text-green-600" />
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
