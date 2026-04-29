import HeaderHero from "./components/HeaderHero";
import CategorySection from "./components/CategorySection";
import AboutSection from "./components/AboutSection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch featured products for the home page (joining category name)
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('featured', true)
    .limit(10);

  // Map the data so components get product.category as a string
  const mappedProducts = featuredProducts?.map(p => ({
    ...p,
    category: p.categories?.name || 'General'
  })) || [];

  return (
    <main>
      <section id="inicio">
        <HeaderHero />
      </section>
      <section id="productos">
        <CategorySection />
        <FeaturedProductsSection initialProducts={mappedProducts} />
      </section>
      <section id="aboutsection">
        <AboutSection />
      </section>
      <section id="contacto">
        {/* Aquí iría el componente de contacto cuando lo crees */}
      </section>
    </main>
  );
}
