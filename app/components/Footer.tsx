'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Leaf } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl">
              <Leaf className="h-6 w-6 text-primary" />
              <span>Agroforesta</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Soluciones agrícolas de alto rendimiento para el campo moderno. Innovación y sostenibilidad en cada producto.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-6 uppercase tracking-wider">Compañía</h4>
            <ul className="space-y-3">
              {['Inicio', 'Productos', 'Nosotros', 'Contacto'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-6 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span>Av. de la Reforma 12-34, Zona 10, Guatemala</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground items-center">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span>+502 2233 4455</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground items-center">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span>info@agroforesta.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-6 uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Suscríbete para recibir novedades y ofertas exclusivas.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="min-w-0 flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Agroforesta. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-primary transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
