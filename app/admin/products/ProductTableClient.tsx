'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Package,
  Edit, 
  Trash2, 
  Eye,
  AlertCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import { ProductActions } from './ProductActions';
import { Product } from '@/types';

interface ProductTableClientProps {
  initialProducts: Product[];
}

export function ProductTableClient({ initialProducts }: ProductTableClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique categories for filter
  const categories = useMemo(() => {
    const cats = initialProducts.map(p => p.category).filter(Boolean);
    return ['all', ...Array.from(new Set(cats))];
  }, [initialProducts]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesSearch = 
        (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o marca..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/30 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div className="relative">
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="rounded-xl gap-2 text-sm border-dashed min-w-[140px]"
          >
            <Filter className="h-4 w-4" />
            {selectedCategory === 'all' ? 'Todas las Categorías' : selectedCategory}
            <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </Button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-card border rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-2 space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-primary text-primary-foreground font-bold' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {cat === 'all' ? 'Todas las Categorías' : cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      {filteredProducts.length === 0 ? (
        <div className="bg-card rounded-2xl border border-dashed p-12 flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Package className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold">No se encontraron productos</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Prueba con otros términos de búsqueda o filtros.
            </p>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="text-primary text-sm font-bold"
          >
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Producto</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Categoría</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Precio</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Estado</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-lg bg-muted overflow-hidden border shrink-0">
                          {product.image ? (
                            <Image 
                              src={product.image} 
                              alt={product.name} 
                              fill 
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-[8px] font-bold">NO IMG</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-md uppercase tracking-wider">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold">Q{product.price ? Number(product.price).toFixed(2) : '0.00'}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{product.unidad}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${Number(product.stock) > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={`text-xs font-medium ${Number(product.stock) > 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {Number(product.stock) > 0 ? 'En Stock' : 'Agotado'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ProductActions id={product.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
