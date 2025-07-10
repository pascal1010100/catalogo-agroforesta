// Footer.tsx
import Link from 'next/link';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-green-800 dark:bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Agroforesta</h3>
            <p className="text-green-100">
              Productos y soluciones para agricultura, jardinería y el futuro sustentable.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Enlaces rápidos</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:underline text-green-100">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:underline text-green-100">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="hover:underline text-green-100">
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Contacto</h4>
            <ul className="space-y-2 text-green-100">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:info@agroforesta.com" className="hover:underline">
                  info@agroforesta.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+50212345678" className="hover:underline">
                  +502 1234-5678
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes sociales */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
