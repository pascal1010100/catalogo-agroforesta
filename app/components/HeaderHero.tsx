'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from "lucide-react";
import CarouselHero from './CarouselHero';

export default function HeaderHero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center">
      {/* Dynamic Background Carousel */}
      <CarouselHero />

      {/* Content Overlay */}
      <div className="container relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center rounded-full bg-primary/20 backdrop-blur-md px-3 py-1 text-sm font-medium text-primary-foreground mb-6 border border-primary/30">
            Catálogo 2026 ya disponible
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-white mb-6 drop-shadow-sm">
            Equipamiento Agrícola de <span className="text-primary">Clase Mundial</span>
          </h1>
          <p className="text-xl text-white/80 mb-10 leading-relaxed font-light drop-shadow-sm">
            Potencia tu producción con tecnología avanzada y soluciones sostenibles diseñadas para el campo moderno.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full gap-2 px-8 shadow-lg shadow-primary/20">
              Explorar Catálogo <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 transition-all">
              Contactar Asesor
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}