'use client';

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface ImageSlide {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

const images: ImageSlide[] = [
  { 
    src: "/images/hero1.jpg", 
    alt: "Productos de jardinería profesional",
    title: "Fertilizantes Premium",
    description: "Happy Plant y Green Garden para tu jardín"
  },
  { 
    src: "/images/hero2.jpg", 
    alt: "Maquinaria Brudden para agroforestería",
    title: "Maquinaria Brudden",
    description: "Equipos profesionales para jardinería"
  },
  { 
    src: "/images/hero3.jpg", 
    alt: "Servicios de asesoría en agroforestería",
    title: "Asesoría Especializada",
    description: "Soluciones integrales para tu proyecto"
  },
];

const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_DURATION = 800;

export default function CarouselHero() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Precarga de imágenes
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((img, index) => {
        return new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = () => {
            setLoadedImages(prev => new Set(prev).add(index));
            resolve();
          };
          image.onerror = () => resolve();
          image.src = img.src;
        });
      });
      await Promise.all(imagePromises);
      setIsLoading(false);
    };
    preloadImages();
  }, []);

  // Autoplay
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_INTERVAL);
  }, []);
  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  useEffect(() => {
    if (isPlaying && !isLoading) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isPlaying, isLoading, startAutoplay, stopAutoplay]);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          toggleAutoplay();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(images.length - 1);
          break;
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // Funciones de navegación
  const goToPrevious = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setIsPlaying(false);
  }, []);
  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
    setIsPlaying(false);
  }, []);
  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
    setIsPlaying(false);
  }, []);
  const toggleAutoplay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="relative h-[420px] md:h-[550px] w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse shadow-2xl ring-1 ring-green-200" />
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative h-[420px] md:h-[550px] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-green-200 group focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2"
      role="region"
      aria-label="Carrusel de imágenes de Agroforesta"
      tabIndex={0}
    >
      {/* Imagen principal */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-${TRANSITION_DURATION} ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
              onLoad={() => setLoadedImages(prev => new Set(prev).add(index))}
            />
          </div>
        ))}
      </div>

      {/* Bordes laterales visuales */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none z-20 rounded-l-2xl" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black/40 via-black/10 to-transparent pointer-events-none z-20 rounded-r-2xl" />

      {/* Flechas de navegación en canaletas */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 backdrop-blur-md shadow-lg text-green-900 dark:text-white p-3 rounded-full border-2 border-white/40 hover:bg-green-100/60 hover:text-green-800 transition-all duration-300 z-30 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Imagen anterior"
        type="button"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 backdrop-blur-md shadow-lg text-green-900 dark:text-white p-3 rounded-full border-2 border-white/40 hover:bg-green-100/60 hover:text-green-800 transition-all duration-300 z-30 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Siguiente imagen"
        type="button"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Control de reproducción */}
      <button
        onClick={toggleAutoplay}
        className="absolute top-4 right-4 bg-white/30 backdrop-blur-md text-green-900 dark:text-white p-2 rounded-full hover:bg-green-100/60 transition-all duration-300 z-30 shadow focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label={isPlaying ? "Pausar carrusel" : "Reanudar carrusel"}
        type="button"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Gradiente para texto superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none rounded-2xl" />
      
      {/* Texto superpuesto */}
      <div className="absolute bottom-16 left-6 right-6 z-30 text-white pointer-events-none">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
          {images[current].title}
        </h2>
        <p className="text-lg md:text-xl opacity-90 drop-shadow-md">
          {images[current].description}
        </p>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-12 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              current === index 
                ? "bg-white shadow-lg" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Ir a la imagen ${index + 1}: ${images[index].title}`}
            type="button"
          >
            {current === index && isPlaying && (
              <div 
                className="absolute inset-0 bg-green-400 rounded-full origin-left"
                style={{
                  animation: `progress ${AUTOPLAY_INTERVAL}ms linear infinite`
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Accesibilidad */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Imagen {current + 1} de {images.length}: {images[current].alt}
      </div>
    </div>
  );
}
