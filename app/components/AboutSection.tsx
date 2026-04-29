'use client';

import Image from "next/image";
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Image Side */}
          <div className="flex-1 relative w-full aspect-[4/5] lg:aspect-square">
            <div className="absolute inset-0 border border-primary/20 translate-x-6 translate-y-6 hidden lg:block" />
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/images/about.png"
                alt="Agroforesta Legacy"
                fill
                className="object-cover grayscale-[0.2]"
                priority
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-[-1]" />
          </div>

          {/* Text Side */}
          <div className="flex-1 max-w-xl">
            <span className="text-xs uppercase tracking-[0.4em] text-primary mb-6 block font-medium">
              Nuestra Herencia
            </span>
            
            <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-[1.1] tracking-tight">
              Cultivando un <br />
              <span className="italic font-light">Legado de Excelencia</span>
            </h2>
            
            <div className="space-y-8 text-muted-foreground font-light leading-relaxed text-lg">
              <p>
                Desde nuestra fundación en 2006, Agroforesta ha sido sinónimo de distinción en el sector agrícola. No solo proveemos soluciones; curamos una selección de tecnología y conocimiento diseñada para los productores más exigentes.
              </p>
              
              <p>
                Nuestra filosofía se basa en el equilibrio perfecto entre la innovación disruptiva y el respeto profundo por los ciclos naturales de la tierra.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-12">
              <div>
                <div className="text-3xl font-serif text-foreground mb-2">20+</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Años de Maestría</div>
              </div>
              <div>
                <div className="text-3xl font-serif text-foreground mb-2">Elite</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Selección de Marcas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
