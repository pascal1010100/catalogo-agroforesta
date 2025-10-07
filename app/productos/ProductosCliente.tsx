'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { products as allProducts, CATEGORIES, type Product } from '@/data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';

type Props = {
  products?: Product[]; // ⬅️ lista filtrada desde el servidor (opcional)
  query?: string;       // ⬅️ texto de búsqueda (opcional, por si quieres mostrarlo)
};

// Mapeo de nombres de categoría a sus colores correspondientes
const CATEGORY_COLORS: Record<string, string> = {
  'Fertilizantes': 'bg-gradient-to-r from-green-500/90 to-green-700/90 text-white',
  'Maquinaria': 'bg-gradient-to-r from-blue-500/90 to-blue-700/90 text-white',
  'Herramientas': 'bg-gradient-to-r from-amber-500/90 to-amber-700/90 text-white',
  'Semillas': 'bg-gradient-to-r from-lime-500/90 to-lime-700/90 text-white',
  'Protección de Cultivos': 'bg-gradient-to-r from-violet-600 to-violet-700/90 text-white',
  'Insumos Agrícolas': 'bg-gradient-to-r from-amber-500/90 to-amber-700/90 text-white',
  'Sistemas de Riego': 'bg-gradient-to-r from-cyan-500/90 to-cyan-700/90 text-white'
};

// Usamos las categorías definidas en CATEGORIES para asegurar que todas se muestren
const categoryOrder = Object.values(CATEGORIES);

export default function ProductosCliente({ products, query }: Props) {
  const searchParams = useSearchParams();
  const categoria = searchParams.get('categoria');

  // base: si llega lista filtrada desde la página, úsala; si no, usa todas
  const baseList = products ?? allProducts;
  
  // Log para depuración
  console.log('=== DEPURACIÓN DE PRODUCTOS ===');
  console.log('Productos cargados:', baseList);
  console.log('Categorías únicas:', [...new Set(baseList.map(p => p.category))]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [groupedProducts, setGroupedProducts] = useState<Record<string, Product[]>>({});

  useEffect(() => {
    console.log('=== INICIO EFECTO ===');
    console.log('Parámetro de categoría de la URL:', categoria);
    
    // Mapeo de categorías de URL a categorías de productos
    const categoryMapping: Record<string, string> = {
      // Mapeo de URLs a nombres de categoría (insensible a mayúsculas/minúsculas)
      'fertilizantes': CATEGORIES.FERTILIZANTES,
      'maquinaria': CATEGORIES.MAQUINARIA,
      'herramientas': CATEGORIES.HERRAMIENTAS,
      'semillas': CATEGORIES.SEMILLAS,
      'insumos': CATEGORIES.INSUMOS,
      'riego': CATEGORIES.RIEGO,
      'proteccion': CATEGORIES.PROTECCION,
      // Mapeo inverso para asegurar cobertura
      [CATEGORIES.FERTILIZANTES.toLowerCase()]: CATEGORIES.FERTILIZANTES,
      [CATEGORIES.MAQUINARIA.toLowerCase()]: CATEGORIES.MAQUINARIA,
      [CATEGORIES.HERRAMIENTAS.toLowerCase()]: CATEGORIES.HERRAMIENTAS,
      [CATEGORIES.SEMILLAS.toLowerCase()]: CATEGORIES.SEMILLAS,
      [CATEGORIES.INSUMOS.toLowerCase()]: CATEGORIES.INSUMOS,
      [CATEGORIES.RIEGO.toLowerCase()]: CATEGORIES.RIEGO,
      [CATEGORIES.PROTECCION.toLowerCase()]: CATEGORIES.PROTECCION
    };

    // Normalizar la categoría de la URL (insensible a mayúsculas/minúsculas)
    const categoriaNormalizada = categoria 
      ? categoryMapping[categoria.toLowerCase()] || 
        Object.values(CATEGORIES).find(cat => 
          cat.toLowerCase() === categoria.toLowerCase()
        ) || categoria
      : null;
      
    console.log('Categoría de la URL:', categoria);
    console.log('Categoría normalizada:', categoriaNormalizada);

    // Filtrar productos por categoría (insensible a mayúsculas/minúsculas)
    const filteredByCategory = categoriaNormalizada
      ? baseList.filter((product) => {
          const match = product.category.toLowerCase() === categoriaNormalizada.toLowerCase();
          if (!match) {
            console.log(`Producto no coincide con categoría ${categoriaNormalizada}:`, 
              `${product.name} (${product.category})`);
            return false;
          }
          console.log(`Producto COINCIDE con categoría ${categoriaNormalizada}:`, 
            `${product.name} (${product.category})`);
          return true;
        })
      : baseList;
      
    console.log('Categoría solicitada:', categoria);
    console.log('Categoría normalizada:', categoriaNormalizada);
    console.log('Total de productos en la categoría:', filteredByCategory.length);
    console.log('Productos encontrados:', filteredByCategory.map(p => `${p.name} (${p.category})`).join(', '));
      
    console.log('Total de productos encontrados en', categoriaNormalizada || 'todas las categorías', ':', filteredByCategory.length);
    console.log('Productos encontrados:', filteredByCategory);
      
    console.log('Productos después de filtrar:', filteredByCategory);

    // Agrupar productos por categoría (insensible a mayúsculas/minúsculas)
    const grouped: Record<string, Product[]> = {};
    
    // Primero, crear un mapeo de categorías en minúsculas a su versión canónica
    const categoryMap = new Map<string, string>();
    Object.values(CATEGORIES).forEach(cat => {
      categoryMap.set(cat.toLowerCase(), cat);
    });
    
    // Agrupar los productos usando las categorías canónicas
    filteredByCategory.forEach((product) => {
      const catLower = product.category.toLowerCase();
      const canonicalCat = categoryMap.get(catLower) || product.category; // Usar la categoría canónica si existe
      
      if (!grouped[canonicalCat]) {
        grouped[canonicalCat] = [];
      }
      grouped[canonicalCat].push(product);
    });

    console.log('Categoría seleccionada:', categoria);
    console.log('Categoría normalizada:', categoriaNormalizada);
    console.log('Productos filtrados:', filteredByCategory);
    console.log('Productos agrupados:', grouped);

    setGroupedProducts(grouped);
  }, [categoria, baseList]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {categoria ? `Productos: ${categoria}` : 'Todos los productos'}
      </h1>

      {Object.keys(groupedProducts).length === 0 ? (
        <p>No hay productos {query ? `para “${query}”` : 'disponibles'}.</p>
      ) : (
        categoryOrder
          .filter((cat) => groupedProducts[cat])
          .map((cat) => (
            <div key={cat} className="mb-12">
              <div className="mb-6">
                <div className={`inline-flex items-center px-4 py-2 rounded-lg ${CATEGORY_COLORS[cat] || 'bg-gray-100 text-gray-800'}`}>
                  <h2 className="text-xl font-bold capitalize">
                    {cat}
                  </h2>
                  <span className="ml-3 text-sm bg-white/20 px-2 py-0.5 rounded-full">
                    {groupedProducts[cat].length} {groupedProducts[cat].length === 1 ? 'producto' : 'productos'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {groupedProducts[cat].map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onShowDetails={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>
          ))
      )}

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
