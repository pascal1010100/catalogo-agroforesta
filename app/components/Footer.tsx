'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-green-800 to-green-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">
                Agroforesta
              </h2>
            </Link>
            <p className="text-green-100 text-sm leading-relaxed">
              Líderes en soluciones agrícolas sostenibles. Ofrecemos productos de calidad para el campo moderno, respaldados por años de experiencia y compromiso con el medio ambiente.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-green-200 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Navegación</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/productos', label: 'Productos' },
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/blog', label: 'Blog' },
                { href: '/contacto', label: 'Contacto' },
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-green-100 hover:text-white text-sm transition-colors flex items-center py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="flex-shrink-0 mt-1 mr-3 text-green-300" size={16} />
                <span className="text-green-100 text-sm">
                  Av. Principal #123, Zona Industrial<br />
                  Ciudad, Estado, C.P. 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="flex-shrink-0 mr-3 text-green-300" size={16} />
                <a href="tel:+521234567890" className="text-green-100 hover:text-white text-sm transition-colors">
                  +52 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="flex-shrink-0 mr-3 text-green-300" size={16} />
                <a href="mailto:info@agroforesta.com" className="text-green-100 hover:text-white text-sm transition-colors">
                  info@agroforesta.com
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="flex-shrink-0 mt-1 mr-3 text-green-300" size={16} />
                <span className="text-green-100 text-sm">
                  Lunes a Viernes: 9:00 - 18:00<br />
                  Sábado: 9:00 - 14:00
                </span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Boletín informativo */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Boletín informativo</h4>
            <p className="text-green-100 text-sm mb-4">
              Suscríbete para recibir ofertas exclusivas y noticias sobre productos nuevos.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2 rounded-lg bg-green-700/30 border border-green-600 text-white placeholder-green-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
              >
                Suscribirse
              </Button>
            </form>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-green-700/50 my-8"></div>

        {/* Fila inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <p className="text-green-300 text-sm text-center md:text-left mb-4 md:mb-0">
            © {currentYear} Agroforesta. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <Link href="/terminos" className="text-green-300 hover:text-white text-sm transition-colors">
              Términos de servicio
            </Link>
            <Link href="/privacidad" className="text-green-300 hover:text-white text-sm transition-colors">
              Política de privacidad
            </Link>
            <Link href="/cookies" className="text-green-300 hover:text-white text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
