import { 
  Settings as SettingsIcon, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Save, 
  ShieldCheck,
  Bell,
  Palette
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';

import { SettingsForm } from './SettingsForm';
import { createClient } from '@/lib/supabase/server';

export default async function SettingsPage() {
  const supabase = await createClient();
  
  const { data: settings } = await supabase
    .from('store_settings')
    .select('*')
    .eq('id', '00000000-0000-0000-0000-000000000000')
    .single();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground mt-1">Administra los detalles de tu tienda y preferencias del panel.</p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
