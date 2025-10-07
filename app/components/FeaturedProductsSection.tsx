'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Componentes
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Importar datos reales de productos y tipos
import { getFeaturedProducts, type Product } from '@/data/products';

// Obtener productos destacados
const featuredProducts = getFeaturedProducts();

export default function FeaturedProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isSwiperReady, setIsSwiperReady] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const paginationEl = useRef<HTMLDivElement>(null);

  // Usar los productos destacados
  const [products, setProducts] = useState<Product[]>([]);
  
  // Cargar productos destacados al montar el componente
  useEffect(() => {
    setProducts(featuredProducts);
  }, [featuredProducts]);

  // Maneja el cambio de slide
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  // Inicializa el swiper
  const onSwiperInit = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    handleSlideChange(swiper);
    setIsSwiperReady(true);
  }, [handleSlideChange]);

  // Actualiza la navegación cuando los elementos están listos
  useEffect(() => {
    if (isSwiperReady && swiperRef.current) {
      swiperRef.current.update();
    }
  }, [isSwiperReady, featuredProducts]);

  // Configuración de navegación
  const navigation = {
    prevEl: navigationPrevRef.current,
    nextEl: navigationNextRef.current,
  };

  return (
    <section 
      className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      aria-label="Productos destacados"
    >
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2 fill-current" aria-hidden="true" />
            <span>Productos Destacados</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestros <span className="text-green-600 dark:text-green-400">Productos</span> Destacados
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6 rounded-full" aria-hidden="true" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre los productos más populares y mejor valorados
          </p>
        </motion.div>

        {/* Carrusel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            onSwiper={onSwiperInit}
            onSlideChange={handleSlideChange}
            navigation={isSwiperReady ? navigation : false}
            pagination={{
              clickable: true,
              el: paginationEl.current || undefined,
              bulletClass: 'w-2 h-2 inline-block rounded-full bg-gray-300 mx-1 cursor-pointer transition-all duration-300',
              bulletActiveClass: 'w-6 bg-green-500',
              renderBullet: (index, className) => {
                return `<span class="${className}" role="button" tabindex="0" aria-label="Ir al producto ${index + 1}"></span>`;
              }
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: { 
                slidesPerView: 1.2,
                centeredSlides: true 
              },
              768: { 
                slidesPerView: 2,
                centeredSlides: false 
              },
              1024: { 
                slidesPerView: 3 
              },
              1280: { 
                slidesPerView: 3.5 
              }
            }}
            className="pb-16"
            a11y={{
              prevSlideMessage: 'Producto anterior',
              nextSlideMessage: 'Siguiente producto',
              paginationBulletMessage: 'Ir al producto {{index}}',
            }}
            loop={true}
            loopAdditionalSlides={1}
            watchSlidesProgress={true}
            updateOnWindowResize={true}
            observer={true}
            observeParents={true}
          >
            {products.map((product) => (
              <SwiperSlide 
                key={product.id} 
                className="pb-12"
                role="group"
                aria-roledescription="slide"
                aria-label={`${product.name} - ${product.description.substring(0, 50)}...`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ProductCard 
                    product={product}
                    onShowDetails={() => setSelectedProduct(product)}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Controles de navegación */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              ref={navigationPrevRef}
              className={`p-3 rounded-full shadow-md transition-all duration-300 ${
                isBeginning ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-green-100 dark:hover:bg-gray-700 hover:scale-110'
              } bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
              aria-label="Producto anterior"
              disabled={isBeginning}
              aria-disabled={isBeginning}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <div 
              ref={paginationEl} 
              className="swiper-pagination flex items-center justify-center space-x-2" 
              aria-label="Navegación del carrusel"
            />
            <button
              ref={navigationNextRef}
              className={`p-3 rounded-full shadow-md transition-all duration-300 ${
                isEnd ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-green-100 dark:hover:bg-gray-700 hover:scale-110'
              } bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200`}
              aria-label="Siguiente producto"
              disabled={isEnd}
              aria-disabled={isEnd}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
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