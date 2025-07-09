// Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-800 dark:bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Agroforesta</h3>
            <p className="text-green-100">
              Productos y soluciones para agricultura, jardinería y el futuro Sustentable.
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
                <Link href="#productos" className="hover:underline text-green-100">
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

          {/* Columna 3: Redes sociales */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Síguenos</h4>
            <ul className="space-y-1">
              <li>
                <a 
                  href="https://facebook.com" 
                  className="hover:underline text-green-100"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com" 
                  className="hover:underline text-green-100"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}