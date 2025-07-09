import HeaderHero from "./components/HeaderHero";
import CategorySection from "./components/CategorySection";
import AboutSection from "./components/AboutSection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";


export default function HomePage() {
  return (
    <main>
      <section id="inicio">
        <HeaderHero />
      </section>
      <section id="productos">
        <CategorySection />
        <FeaturedProductsSection />
      </section>
      <section id="contacto">
        <AboutSection />
      </section>
    </main>
  );
}
