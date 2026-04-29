import { Suspense } from "react";
import ProductosCliente from "./ProductosCliente";
import { createClient } from '@/lib/supabase/server';

type Search = { search?: string };

export default async function ProductosPage(
  { searchParams }: { searchParams: Promise<Search> }
) {
  const { search = "" } = await searchParams;
  const q = search.trim().toLowerCase();
  
  const supabase = await createClient();
  
  // Fetch products from real DB with category name
  let query = supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  // Simple search if query exists
  if (q) {
    query = query.ilike('name', `%${q}%`);
  }

  const { data: rawProducts, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
  }

  const products = rawProducts?.map(p => ({
    ...p,
    category: p.categories?.name || 'General'
  })) || [];

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando productos...</div>}>
      <ProductosCliente products={products || []} query={search} />
    </Suspense>
  );
}
