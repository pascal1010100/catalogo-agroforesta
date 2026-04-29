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

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground mt-1">Administra los detalles de tu tienda y preferencias del panel.</p>
      </div>

      <SettingsForm />
    </div>
  );
}
