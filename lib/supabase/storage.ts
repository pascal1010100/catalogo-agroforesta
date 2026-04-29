import { createClient } from './client';

export async function uploadProductImage(file: File) {
  const supabase = createClient();
  
  // Create a unique file name
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { data, error } = await supabase.storage
    .from('catalog')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('catalog')
    .getPublicUrl(filePath);

  return publicUrl;
}
