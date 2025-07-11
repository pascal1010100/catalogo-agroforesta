"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "./ProductCard";
import { products } from "./data/product";
import type { Product } from "./data/product";
import ProductDetailModal from "./ProductDetailModal";

export default function FeaturedProductsSection() {
  const featuredProducts = products
    .filter((p) => p.category === "Fertilizantes")
    .slice(0, 5);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100 mb-4">
        Productos Destacados
      </h2>
      <p className="text-green-800 dark:text-green-200 mb-8 max-w-2xl">
        Descubre algunos de nuestros productos más populares y recomendados para impulsar tu proyecto agroforestal.
      </p>

      <div className="relative">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay, Navigation, Pagination]}
          loop
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
          speed={600}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onBeforeInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation === "object"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                onShowDetails={() => setSelectedProduct(product)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botones navegación */}
        <button
          ref={prevRef}
          className="absolute top-1/2 left-0 z-10 -translate-y-1/2 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-green-600 hover:text-white transition
                   text-gray-800 dark:text-green-500"
          aria-label="Anterior"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          ref={nextRef}
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-green-600 hover:text-white transition
                   text-gray-800 dark:text-green-500"
          aria-label="Siguiente"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Modal con detalles del producto */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
