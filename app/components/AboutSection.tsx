'use client';

import Image from "next/image";
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { ArrowRight, Leaf, ShieldCheck, Users, Truck } from "lucide-react";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section 
      className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      aria-label="Sobre Agroforesta"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Contenido de texto */}
          <motion.div 
            className="flex-1 max-w-2xl"
            variants={itemVariants}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 text-sm font-medium mb-4">
              <Leaf className="w-4 h-4 mr-2" />
              Líderes en Soluciones Agroforestales
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Más de <span className="text-green-600 dark:text-green-400">20 años</span> cultivando confianza
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              En Agroforesta nos especializamos en ofrecer soluciones integrales para la agricultura moderna y el cuidado del medio ambiente. Nuestro compromiso es proporcionar productos de la más alta calidad respaldados por asesoría experta.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                { icon: <ShieldCheck className="w-6 h-6 text-green-500" />, text: 'Productos certificados y de calidad garantizada' },
                { icon: <Users className="w-6 h-6 text-green-500" />, text: 'Equipo de expertos a tu disposición' },
                { icon: <Truck className="w-6 h-6 text-green-500" />, text: 'Distribución a nivel nacional' }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  variants={itemVariants}
                >
                  <span className="mt-1">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div variants={itemVariants}>
              <Button 
                className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                asChild
              >
                <a href="/contacto">
                  Conoce más sobre nosotros
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Contenedor de imagen */}
          <motion.div 
            className="flex-1 w-full max-w-2xl relative h-full min-h-[300px]"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.6,
                  ease: "easeOut"
                } 
              },
            }}
          >
            {/* Imagen con contenedor responsivo */}
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/about.png"
                alt="Equipo de Agroforesta trabajando en el campo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: 'center 70%' }}
                priority
              />
              
              {/* Efecto de superposición sutil */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
