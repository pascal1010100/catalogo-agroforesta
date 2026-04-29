import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Ilustración / Icono */}
        <div className="relative">
          <div className="text-[150px] md:text-[200px] font-black text-primary/5 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/10 p-6 rounded-full animate-pulse">
              <Search className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            ¡Oops! Se nos perdió este rastro.
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            La página que buscas no existe o ha sido movida. Pero no te preocupes, el campo es grande y hay mucho más por ver.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="rounded-2xl px-8 h-14 text-lg font-bold shadow-xl shadow-primary/20 gap-2">
              <Home className="h-5 w-5" />
              Volver al Inicio
            </Button>
          </Link>
          <Link href="/productos">
            <Button variant="outline" size="lg" className="rounded-2xl px-8 h-14 text-lg font-bold gap-2">
              <ArrowLeft className="h-5 w-5" />
              Explorar Catálogo
            </Button>
          </Link>
        </div>

        {/* Enlaces de ayuda */}
        <div className="pt-12 border-t flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
          <Link href="/categorias" className="hover:text-primary transition-colors">Categorías</Link>
          <Link href="/nosotros" className="hover:text-primary transition-colors">Sobre Nosotros</Link>
          <Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link>
        </div>
      </div>
    </div>
  );
}
