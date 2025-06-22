import CategoryGrid from "./CategoryGrid";

export default function CategorySection() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100 mb-4">
        Nuestras Categorías
      </h2>
      <p className="text-green-800 dark:text-green-200 mb-8 max-w-2xl">
        Explora nuestra variedad de categorías para encontrar productos ideales para agricultura, jardinería y proyectos sustentables.
      </p>
      <CategoryGrid />
    </section>
  );
}
