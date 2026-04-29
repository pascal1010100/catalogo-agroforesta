'use client';

import { useState } from 'react';
import { 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Save, 
  Palette, 
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { toast } from 'react-hot-toast';

interface SettingsFormProps {
  initialSettings?: {
    whatsapp: string;
    email: string;
    address: string;
    store_name: string;
    default_message: string;
  };
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp: initialSettings?.whatsapp || '',
    email: initialSettings?.email || '',
    address: initialSettings?.address || '',
    store_name: initialSettings?.store_name || 'Agroforesta',
    default_message: initialSettings?.default_message || 'Hola Agroforesta, me interesa este producto...'
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // In a real scenario, we would call a server action here
      // const result = await updateSettings(formData);
      
      // Simulate API call for now since we're auditing logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Configuración guardada correctamente');
    } catch (error) {
      toast.error('Error al guardar la configuración');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Navigation Sidebar */}
      <div className="lg:col-span-1 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-all">
          <Globe className="h-5 w-5" />
          General
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 text-muted-foreground transition-all">
          <Phone className="h-5 w-5" />
          Canales de Venta
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 text-muted-foreground transition-all">
          <Palette className="h-5 w-5" />
          Apariencia
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 text-muted-foreground transition-all">
          <ShieldCheck className="h-5 w-5" />
          Seguridad
        </button>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* WhatsApp & Contact Section */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-muted/30">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Configuración de WhatsApp
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Número de WhatsApp</label>
              <div className="flex gap-2">
                <div className="flex items-center justify-center bg-muted px-4 rounded-xl border text-sm font-medium">
                  +502
                </div>
                <input 
                  type="text" 
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  placeholder="Número de teléfono" 
                  className="flex-1 rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Mensaje Pre-definido</label>
              <textarea 
                rows={3}
                value={formData.default_message}
                onChange={(e) => setFormData({...formData, default_message: e.target.value})}
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* General Shop Info */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-muted/30">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Información del Negocio
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Nombre de la Tienda</label>
                <input 
                  type="text" 
                  value={formData.store_name}
                  onChange={(e) => setFormData({...formData, store_name: e.target.value})}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Correo de Contacto</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="ventas@agroforesta.com"
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Dirección Física</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Dirección física"
                className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" className="rounded-xl px-8 h-12 font-bold" onClick={() => window.location.reload()}>
            Descartar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20 gap-2"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
}
