import CategoryGrid from "./CategoryGrid";

export default function CategorySection() {
  return (
    <section id="categorias" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block font-medium">
              Curaduría Selecta
            </span>
            <h2 className="text-4xl md:text-6xl font-serif leading-[1.1]">
              Nuestras <br /> <span className="italic font-light">Especialidades</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-sm font-light leading-relaxed">
            Explora una selección rigurosa de soluciones diseñadas para elevar los estándares de la agricultura moderna.
          </p>
        </div>
        <CategoryGrid />
      </div>
    </section>
  );
}
