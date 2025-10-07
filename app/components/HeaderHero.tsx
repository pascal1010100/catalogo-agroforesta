'use client';

import { motion } from 'framer-motion';
import CarouselHero from "./CarouselHero";
import { Button } from "./ui/button";
import { ChevronRight, ArrowDown } from "lucide-react";

import type { Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

export default function HeaderHero() {
  return (
    <header className="relative flex items-center justify-center h-[90vh] min-h-[600px] overflow-hidden">
      {/* Fondo con overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 to-black/60" />
      
      {/* Carrusel de fondo */}
      <CarouselHero />
      
      {/* Contenido principal */}
      <div className="relative z-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            variants={item}
          >
            Soluciones agrícolas de <span className="text-accent">alto rendimiento</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={item}
          >
            Maquinaria y productos químicos para potenciar tu producción con tecnología de vanguardia y sostenibilidad.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mt-8"
            variants={item}
          >
            {/* Botón principal */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/60 to-green-600/60 opacity-70 blur transition-all duration-300 group-hover:opacity-100 group-hover:blur-sm" />
              <a
                href="#productos"
                className="relative flex items-center gap-2 px-8 py-5 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-br from-accent to-green-600 rounded-xl shadow-2xl group-hover:shadow-accent/30 group-hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  Explorar productos
                  <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </motion.div>

            {/* Botón secundario */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#contacto"
                className="relative flex items-center gap-2 px-8 py-5 text-lg font-medium transition-all duration-300 border-2 border-white/20 rounded-xl group-hover:border-accent/50 group-hover:bg-accent/5 backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center text-white">
                  Contactar asesor
                  <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Flecha de desplazamiento */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <a href="#categorias" className="flex flex-col items-center text-white/80 hover:text-accent transition-colors">
          <span className="text-sm mb-1">Desplazar</span>
          <ArrowDown className="w-6 h-6" />
        </a>
      </motion.div>
    </header>
  );
}