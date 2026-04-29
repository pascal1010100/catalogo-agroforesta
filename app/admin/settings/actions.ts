'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSettings(data: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('store_settings')
    .update({
      whatsapp: data.whatsapp,
      email: data.email,
      address: data.address,
      store_name: data.store_name,
      default_message: data.default_message
    })
    .eq('id', '00000000-0000-0000-0000-000000000000');

  if (error) {
    console.error('Error updating settings:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/settings');
  revalidatePath('/'); // Settings like whatsapp are used globally
  
  return { success: true };
}
