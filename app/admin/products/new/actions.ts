'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: any) {
  const supabase = await createClient();

  // Basic validation/sanitization could happen here
  const { error } = await supabase
    .from('products')
    .insert([
      {
        name: data.name,
        brand: data.brand,
        category: data.category,
        description: data.description,
        price: data.price,
        unidad: data.unidad,
        model: data.model,
        stock: data.stock,
        featured: data.featured,
        // For now using a placeholder image if not provided
        image: data.image || '/images/hero1.jpg'
      }
    ]);

  if (error) {
    console.error('Error creating product:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/productos');
  revalidatePath('/');
  
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/productos');
  revalidatePath('/');

  return { success: true };
}
export async function updateProduct(id: string, data: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('products')
    .update({
      name: data.name,
      brand: data.brand,
      category: data.category,
      description: data.description,
      price: data.price,
      unidad: data.unidad,
      model: data.model,
      stock: data.stock,
      featured: data.featured,
      image: data.image // Only update if provided
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating product:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath(`/productos/${id}`);
  revalidatePath('/productos');
  revalidatePath('/');
  
  return { success: true };
}
