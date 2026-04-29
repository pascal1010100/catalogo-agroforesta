import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import EditProductClient from './EditProductClient';

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  return <EditProductClient product={product} />;
}
