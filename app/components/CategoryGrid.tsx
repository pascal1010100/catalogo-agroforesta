'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Wrench, Tractor, FlaskConical, Droplets, Shield, Sprout } from 'lucide-react';
import { CATEGORIES, getProductsByCategory } from '@/data/products';

// Definir un tipo para las claves de CATEGORIES
type CategoryKey = keyof typeof CATEGORIES;
type CategoryName = typeof CATEGORIES[CategoryKey];

type Category = {
  id: string;
  name: CategoryName;
  description: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: {
    from: string;
    to: string;
    iconBg: string;
    text: string;
  };
  image: string;
  count: number;
  // Propiedades calculadas para compatibilidad con el renderizado
  from: string;
  to: string;
  iconBg: string;
  text: string;
};

// Configuración de categorías con sus respectivos íconos y colores
type CategoryConfig = {
  name: CategoryName;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  image: string;
  color: {
    from: string;
    to: string;
    iconBg: string;
    text: string;
  };
};

const categoryConfig: Record<CategoryKey, CategoryConfig> = {
  FERTILIZANTES: {
    name: CATEGORIES.FERTILIZANTES,
    Icon: FlaskConical,
    color: {
      from: 'from-green-500/90',
      to: 'to-green-700/90',
      iconBg: 'bg-green-100/20',
      text: 'text-green-100',
    },
    description: 'Nutrientes esenciales para el crecimiento de tus cultivos',
    image: '/images/fertilizantes.png',
  },
  MAQUINARIA: {
    name: CATEGORIES.MAQUINARIA,
    Icon: Tractor,
    color: {
      from: 'from-blue-500/90',
      to: 'to-blue-700/90',
      iconBg: 'bg-blue-100/20',
      text: 'text-blue-100',
    },
    description: 'Equipos agrícolas de última generación para optimizar tu producción',
    image: '/images/maquinaria.png',
  },
  HERRAMIENTAS: {
    name: CATEGORIES.HERRAMIENTAS,
    Icon: Wrench,
    color: {
      from: 'from-amber-500/90',
      to: 'to-amber-700/90',
      iconBg: 'bg-amber-100/20',
      text: 'text-amber-100',
    },
    description: 'Instrumentos de calidad profesional para el campo',
    image: '/images/herramientas.png',
  },
  SEMILLAS: {
    name: CATEGORIES.SEMILLAS,
    Icon: Sprout,
    color: {
      from: 'from-lime-500/90',
      to: 'to-lime-700/90',
      iconBg: 'bg-lime-100/20',
      text: 'text-lime-100',
    },
    description: 'Semillas certificadas de la más alta calidad',
    image: '/images/semillas.png',
  },
  PROTECCION: {
    name: CATEGORIES.PROTECCION,
    Icon: Shield,
    color: {
      from: 'from-violet-600',
      to: 'to-violet-700/90',
      iconBg: 'bg-violet-100/20',
      text: 'text-violet-100'
    },
    description: 'Protección avanzada para tus cultivos',
    image: '/images/proteccion.png'
  },
  INSUMOS: {
    name: CATEGORIES.INSUMOS,
    Icon: FlaskConical,
    color: {
      from: 'from-amber-500/90',
      to: 'to-amber-700/90',
      iconBg: 'bg-amber-100/20',
      text: 'text-amber-100'
    },
    description: 'Insumos agrícolas de calidad para tu producción',
    image: '/images/insumos.png'
  },
  RIEGO: {
    name: CATEGORIES.RIEGO,
    Icon: Droplets,
    color: {
      from: 'from-cyan-500/90',
      to: 'to-cyan-700/90',
      iconBg: 'bg-cyan-100/20',
      text: 'text-cyan-100'
    },
    description: 'Sistemas de riego eficientes para tus cultivos',
    image: '/images/riego.png'
  }
};

// Add missing required properties when using the config
const getCategoryWithDefaults = (key: CategoryKey): Category => {
  const config = categoryConfig[key];
  if (!config) {
    throw new Error(`No configuration found for category: ${key}`);
  }
  
  return {
    id: key.toLowerCase(),
    count: 0,
    href: `/categoria/${key.toLowerCase()}`,
    ...config,
    from: config.color.from,
    to: config.color.to,
    iconBg: config.color.iconBg,
    text: config.color.text
  };
};

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Función auxiliar para verificar el tipo de Category
  const isCategory = (item: Category | null): item is Category => {
    return item !== null && 
           typeof item === 'object' && 
           'name' in item && 
           'id' in item && 
           'href' in item &&
           'description' in item &&
           'Icon' in item &&
           'color' in item &&
           'image' in item &&
           'count' in item;
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar categorías con el conteo de productos
    const loadCategories = () => {
      try {
        const categoryItems = Object.entries(CATEGORIES).map(([key, name]) => {
          const categoryKey = key as CategoryKey;
          const config = categoryConfig[categoryKey as CategoryKey];
          
          if (!config) {
            console.warn(`No configuration found for category: ${name}`);
            return null;
          }
          
          const products = getProductsByCategory(CATEGORIES[categoryKey]);
          
          if (!config) {
            console.warn(`Configuración faltante para la categoría: ${name}`);
            return null;
          }

          return {
            id: key.toLowerCase(),
            name,
            description: config.description,
            href: `/productos?categoria=${name.toLowerCase().replace(/\s+/g, '-')}`,
            Icon: config.Icon,
            color: config.color,
            image: config.image,
            count: products.length,
            // Propiedades calculadas para compatibilidad
            from: config.color.from,
            to: config.color.to,
            iconBg: config.color.iconBg,
            text: config.color.text
          };
        });

        // Filtrar elementos nulos y asegurar el tipo correcto
        const validCategories = categoryItems.filter(isCategory);
        setCategories(validCategories);
        
        // Log para depuración
        console.log('Categorías cargadas:', validCategories.map(c => ({
          name: c.name,
          count: c.count,
          id: c.id
        })));
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="h-96 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 animate-pulse"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-6">
      {categories.map((category) => {
        if (!category) return null;
        const Icon = category.Icon;
        const { from, to, iconBg, text } = category.color;
        
        return (
          <div 
            key={category.id} 
            className="group relative h-96 rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            {/* Efecto de profundidad 3D */}
            <div 
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
              }}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={`Categoría de ${category.name}`}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={categories.indexOf(category) < 3}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-category.jpg';
                  }}
                />
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${category.color.from} ${category.color.to} opacity-90 transition-opacity duration-500 group-hover:opacity-95`}
                />
              </div>
              
              {/* Patrón sutil */}
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFucm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"
              />
              
              {/* Contenido */}
              <Link 
                href={category.href}
                className="relative z-10 h-full flex flex-col justify-between p-8 text-white cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className={`p-3.5 rounded-2xl ${iconBg} backdrop-blur-md transform transition-all duration-500 group-hover:rotate-12`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-4 py-1.5 text-xs font-medium bg-white/20 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/30 transition-colors">
                    {category.count} productos
                  </span>
                </div>
                
                <div className="mt-auto space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold tracking-tight">{category.name}</h3>
                    <div className="w-12 h-1 bg-white/50 rounded-full"></div>
                  </div>
                  <p className="text-white/90 leading-relaxed">{category.description}</p>
                  <div className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="inline-block w-8 h-px bg-white/50 mr-3 transition-all duration-300 group-hover:w-12 group-hover:bg-white"></span>
                    Explorar categoría
                    <ArrowRight className="ml-2 w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </div>
                </div>
              </Link>
              
              {/* Efecto de brillo al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
