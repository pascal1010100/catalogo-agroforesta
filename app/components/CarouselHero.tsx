'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function CarouselHero() {
  const slides = [
    { id: 1, img: "/images/hero1.jpg" },
    { id: 2, img: "/images/hero2.jpg" },
    { id: 3, img: "/images/hero3.jpg" },
  ];

  return (
    <div className="absolute inset-0 w-full h-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        pagination={{ 
          el: '.custom-pagination',
          clickable: true 
        }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div className="w-full h-full relative">
              <Image
                src={slide.img}
                alt={`Slide ${slide.id}`}
                fill
                className="object-cover object-center"
                priority={slide.id === 1}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botones de navegación */}
      <div className="absolute inset-0 flex items-center justify-between z-30">
        <button className="custom-prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button className="custom-next">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      {/* Puntos de paginación */}
      <div className="custom-pagination absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30"></div>
    </div>
  );
}