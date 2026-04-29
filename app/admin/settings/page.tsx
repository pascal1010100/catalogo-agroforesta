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

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground mt-1">Administra los detalles de tu tienda y preferencias del panel.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar (Mobile Friendly) */}
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
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Número de WhatsApp para Pedidos</label>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center bg-muted px-4 rounded-xl border text-sm font-medium">
                    +502
                  </div>
                  <input 
                    type="text" 
                    placeholder="Número de teléfono (ej. 55554444)" 
                    className="flex-1 rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <p className="text-xs text-muted-foreground italic">
                  * Este es el número que recibirá los mensajes automáticos del catálogo.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Mensaje Pre-definido</label>
                <textarea 
                  rows={3}
                  placeholder="Hola Agroforesta, me interesa este producto..."
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
                    defaultValue="Agroforesta"
                    className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Correo de Contacto</label>
                  <input 
                    type="email" 
                    placeholder="ventas@agroforesta.com"
                    className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Dirección Física</label>
                <input 
                  type="text" 
                  placeholder="Ciudad de Guatemala, Guatemala"
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" className="rounded-xl px-8 h-12 font-bold">Descartar</Button>
            <Button className="rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20 gap-2">
              <Save className="h-5 w-5" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
