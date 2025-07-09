import CarouselHero from "./CarouselHero";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function HeaderHero() {
  return (
    <header className="relative flex flex-col items-center justify-center h-[420px] md:h-[550px] overflow-hidden bg-gradient-to-br from-green-100 via-green-200 to-green-300 dark:from-green-900 dark:via-green-800 dark:to-green-700 px-4 md:px-16">
      <CarouselHero />
      
      {/* Contenido con mejor estilo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-40">
        <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-2xl w-full mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-green-900 dark:text-white drop-shadow-lg tracking-tight">
            Catálogo Agroforesta
          </h1>
          <p className="mt-6 text-lg md:text-xl text-green-800 dark:text-green-100 max-w-xl mx-auto leading-relaxed">
            Productos y soluciones para agricultura, jardinería y el futuro Sustentable.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="primary"
              className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <a href="#productos" className="flex items-center">
                Ver productos
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 hover:bg-green-100/20 dark:hover:bg-green-800/30 hover:scale-105 transition-all duration-300"
            >
              <a href="#contacto" className="flex items-center">
                Contáctanos
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}