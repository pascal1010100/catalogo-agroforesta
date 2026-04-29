import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import { ProductActions } from './ProductActions';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  
  // Try to fetch from DB
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const hasProducts = products && products.length > 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground mt-1">Gestiona el inventario de tu catálogo.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="rounded-xl gap-2 h-12 px-6 font-bold shadow-lg shadow-primary/20">
            <Plus className="h-5 w-5" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o marca..." 
            className="w-full pl-10 pr-4 py-2 bg-muted/30 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2 text-sm border-dashed">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>
      </div>

      {/* Products Table */}
      {!hasProducts ? (
        <div className="bg-card rounded-2xl border border-dashed p-20 flex flex-col items-center text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Package className="h-10 w-10" />
          </div>
          <div className="max-w-md">
            <h2 className="text-xl font-bold">No hay productos aún</h2>
            <p className="text-muted-foreground mt-2">
              {error ? "Hubo un problema al conectar con la base de datos. Asegúrate de haber configurado el archivo .env.local." : "Comienza agregando tu primer producto al catálogo."}
            </p>
          </div>
          <Link href="/admin/products/new">
            <Button variant="outline" className="rounded-xl">Agregar Producto</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
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
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-lg bg-muted overflow-hidden border">
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
                      <div>
                        <p className="text-sm font-bold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold">Q{product.price.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{product.unidad}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-green-700">Activo</span>
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
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex items-center gap-3 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">Error de base de datos: {error.message}</p>
        </div>
      )}
    </div>
  );
}

// Icon fallback since Package is not imported correctly in some scopes
function Package({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
