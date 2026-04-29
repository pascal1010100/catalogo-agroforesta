import HeaderHero from "./components/HeaderHero";
import CategorySection from "./components/CategorySection";
import AboutSection from "./components/AboutSection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch featured products for the home page
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(10);

  return (
    <main>
      <section id="inicio">
        <HeaderHero />
      </section>
      <section id="productos">
        <CategorySection />
        <FeaturedProductsSection initialProducts={featuredProducts || []} />
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
