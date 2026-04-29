import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Tag, Layers, Check, ShoppingBag, ShoppingCart } from "lucide-react";
import { getProductById, getProductsByCategory } from "@/data/products";
import AddToCartButton from "@/app/components/AddToCartButton";
import ProductCard from "@/app/components/ProductCard";
import { Metadata } from "next";
import { Button } from "@/app/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Producto no encontrado | Agroforesta" };

  return {
    title: `${product.name} | Catálogo Agroforesta`,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Navigation */}
      <div className="container py-8">
        <Link
          href="/productos"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Link>
      </div>

      <main className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted/20 rounded-3xl overflow-hidden border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8 transition-transform duration-500 hover:scale-105"
                priority
              />
              {product.featured && (
                <div className="absolute top-6 left-6">
                  <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-primary-foreground uppercase tracking-wider shadow-lg">
                    Destacado
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {product.category}
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                {product.brand} {product.model && `• ${product.model}`}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground mb-6">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-4xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest">
                / {product.unidad}
              </span>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-light">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <AddToCartButton product={product} size="lg" className="h-14 px-10 rounded-2xl text-lg flex-1" />
              <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl flex-1 gap-2">
                Solicitar Cotización
              </Button>
            </div>

            {/* Technical Specifications */}
            {product.specifications && (
              <div className="border-t pt-10">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  Especificaciones Técnicas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-1">
                      <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{key}</dt>
                      <dd className="text-sm text-foreground font-medium">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-heading font-bold tracking-tight">
                Productos <span className="text-primary">Relacionados</span>
              </h2>
              <Link href="/productos" className="text-sm font-bold text-primary hover:underline transition-all">
                Ver todo el catálogo
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
