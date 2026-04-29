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
  
  // Fetch products from real DB
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  // Simple search if query exists
  if (q) {
    query = query.ilike('name', `%${q}%`);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando productos...</div>}>
      <ProductosCliente products={products || []} query={search} />
    </Suspense>
  );
}
