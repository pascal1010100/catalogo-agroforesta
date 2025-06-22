import CarouselHero from "./CarouselHero";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function HeaderHero() {
  return (
    <header className="relative flex flex-col items-center justify-center h-[420px] md:h-[550px] overflow-hidden bg-gradient-to-br from-green-100 via-green-200 to-green-300 dark:from-green-900 dark:via-green-800 dark:to-green-700 px-4 md:px-16">
      {/* Carousel de imágenes */}
      <CarouselHero />
      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <div className="bg-white/70 dark:bg-black/40 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl md:text-5xl font-extrabold text-green-900 dark:text-white drop-shadow-lg">
            Catálogo Agroforesta
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-green-800 dark:text-green-100 max-w-xl">
            Productos y soluciones para agricultura, jardinería y el futuro sustentable.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              variant="primary"
              className="shadow-lg hover:shadow-2xl transition"
            >
              <a href="#productos">
                Ver productos
                <ChevronRight className="ml-2 w-5 h-5 inline" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 hover:bg-green-100 dark:hover:bg-green-800 transition"
            >
              <a href="#contacto">
                Contáctanos
                <ChevronRight className="ml-2 w-5 h-5 inline" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
