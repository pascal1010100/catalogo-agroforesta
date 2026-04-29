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
import { ProductTableClient } from './ProductTableClient';

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

      <ProductTableClient initialProducts={products || []} />

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex items-center gap-3 text-destructive mt-6">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">Error de base de datos: {error.message}</p>
        </div>
      )}
    </div>
  );
}
