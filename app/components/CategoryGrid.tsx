'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Wrench, Tractor, FlaskConical, Droplets, Shield, Sprout } from 'lucide-react';
import { CATEGORIES, getProductsByCategory } from '@/data/products';

type CategoryKey = keyof typeof CATEGORIES;
type CategoryName = typeof CATEGORIES[CategoryKey];

type Category = {
  id: string;
  name: CategoryName;
  description: string;
  href: string;
  Icon: any;
  image: string;
  count: number;
};

const categoryConfig: Record<CategoryKey, { Icon: any, image: string }> = {
  FERTILIZANTES: { Icon: FlaskConical, image: '/images/fertilizantes.png' },
  MAQUINARIA: { Icon: Tractor, image: '/images/maquinaria.png' },
  HERRAMIENTAS: { Icon: Wrench, image: '/images/herramientas.png' },
  SEMILLAS: { Icon: Sprout, image: '/images/semillas.png' },
  PROTECCION: { Icon: Shield, image: '/images/proteccion.png' },
  INSUMOS: { Icon: Leaf, image: '/images/insumos.png' },
  RIEGO: { Icon: Droplets, image: '/images/riego.png' }
};

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const items = Object.entries(CATEGORIES).map(([key, name]) => {
      const catKey = key as CategoryKey;
      const config = categoryConfig[catKey];
      if (!config) return null;

      const products = getProductsByCategory(name);
      return {
        id: key.toLowerCase(),
        name,
        description: `Soluciones profesionales en ${name.toLowerCase()}.`,
        href: `/productos?categoria=${name.toLowerCase().replace(/\s+/g, '-')}`,
        Icon: config.Icon,
        image: config.image,
        count: products.length,
      };
    }).filter(Boolean) as Category[];

    setCategories(items);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={category.href}
          className="group relative flex flex-col h-[300px] rounded-2xl overflow-hidden border bg-card hover:shadow-xl transition-all"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/hero1.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col p-6 text-white z-10">
            <div className="mb-auto">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white">
                <category.Icon className="h-5 w-5" />
              </div>
            </div>
            
            <div>
              <h3 className="font-heading font-bold text-xl mb-1">{category.name}</h3>
              <p className="text-xs text-white/60 mb-4 line-clamp-1">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-primary px-2 py-1 rounded">
                  {category.count} Productos
                </span>
                <ArrowRight className="h-4 w-4 transform translate-x-[-10px] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
