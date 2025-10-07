'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Image from 'next/image';

const slides = [
  { 
    id: 1, 
    img: "/images/hero1.jpg",
    title: "Tecnología agrícola de vanguardia",
    description: "Soluciones innovadoras para maximizar tu producción"
  },
  { 
    id: 2, 
    img: "/images/hero2.jpg",
    title: "Productos de calidad superior",
    description: "Los mejores insumos para tus cultivos"
  },
  { 
    id: 3, 
    img: "/images/hero3.jpg",
    title: "Sostenibilidad y rendimiento",
    description: "Cultiva de manera responsable y eficiente"
  },
];

export default function CarouselHero() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div className="w-full h-full relative">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={slide.id === 1}
                sizes="100vw"
                quality={100}
              />
              {/* Overlay de gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}