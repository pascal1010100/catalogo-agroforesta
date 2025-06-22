import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Mango Ataulfo",
    price: 25,
    image: "/images/mango.jpg",
    description: "Dulce, jugoso y perfecto para postres o ensaladas.",
  },
  {
    id: 2,
    name: "Pala de jardinería",
    price: 120,
    image: "/images/pala.jpg",
    description: "Herramienta esencial para todo jardinero.",
  },
  {
    id: 3,
    name: "Fertilizante orgánico",
    price: 80,
    image: "/images/fertilizante.jpg",
    description: "Ideal para nutrir tus plantas de forma natural.",
  },
];

export default function FeaturedProductsSection() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100 mb-4">
        Productos Destacados
      </h2>
      <p className="text-green-800 dark:text-green-200 mb-8 max-w-2xl">
        Descubre algunos de nuestros productos más populares y recomendados para impulsar tu proyecto agroforestal.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
