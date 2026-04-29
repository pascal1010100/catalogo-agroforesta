'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

// Import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  featured: boolean;
  [key: string]: any;
}

export default function FeaturedProductsSection({ initialProducts = [] }: { initialProducts?: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isSwiperReady, setIsSwiperReady] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const paginationEl = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const onSwiperInit = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper;
    handleSlideChange(swiper);
    setIsSwiperReady(true);
  }, [handleSlideChange]);

  useEffect(() => {
    if (isSwiperReady && swiperRef.current) {
      swiperRef.current.update();
    }
  }, [isSwiperReady]);

  const navigation = {
    prevEl: navigationPrevRef.current,
    nextEl: navigationNextRef.current,
  };

  return (
    <section id="productos" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Colección Seleccionada</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight">
            Nuestros <span className="text-primary italic">Productos</span> Destacados
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl font-light leading-relaxed">
            Descubre las soluciones más innovadoras y confiables elegidas por nuestros expertos para potenciar tu productividad.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            onSwiper={onSwiperInit}
            onSlideChange={handleSlideChange}
            navigation={isSwiperReady ? navigation : false}
            pagination={{
              clickable: true,
              el: paginationEl.current || undefined,
              bulletClass: 'h-1.5 w-1.5 rounded-full bg-muted-foreground/30 mx-1 cursor-pointer transition-all',
              bulletActiveClass: 'w-8 bg-primary',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.5, centeredSlides: true },
              1024: { slidesPerView: 3, centeredSlides: false },
            }}
            className="!pb-20"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard 
                  product={product}
                  onShowDetails={() => setSelectedProduct(product)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              ref={navigationPrevRef}
              className={cn(
                "h-12 w-12 rounded-full border flex items-center justify-center transition-all",
                isBeginning ? "opacity-20 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-lg"
              )}
              disabled={isBeginning}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div ref={paginationEl} className="flex items-center gap-1" />
            <button
              ref={navigationNextRef}
              className={cn(
                "h-12 w-12 rounded-full border flex items-center justify-center transition-all",
                isEnd ? "opacity-20 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-lg"
              )}
              disabled={isEnd}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}