export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="bg-green-900 dark:bg-green-950 text-white py-10 mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">Agroforesta</h3>
          <p className="text-green-100 mb-2 max-w-xs">
            Soluciones para agricultura, jardinería y proyectos sustentables.
          </p>
          <div className="flex gap-3 mt-2 justify-center md:justify-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5 fill-white hover:fill-green-300 transition"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.599 0 0 .6 0 1.326v21.348C0 23.4.599 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"></path>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5 fill-white hover:fill-green-300 transition"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.316.974.975 1.254 2.243 1.316 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.342 2.633-1.316 3.608-.975.974-2.242 1.254-3.608 1.316-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.342-3.608-1.316-.974-.975-1.254-2.242-1.316-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.34-2.633 1.316-3.608C4.524 2.573 5.791 2.294 7.157 2.232 8.423 2.174 8.803 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.77.128 4.665.362 3.678 1.35 2.69 2.338 2.456 3.443 2.398 4.725 2.34 6.005 2.328 6.415 2.328 12s.012 5.995.07 7.275c.058 1.282.292 2.387 1.28 3.375.987.988 2.092 1.222 3.374 1.28 1.28.058 1.689.07 7.275.07s5.995-.012 7.275-.07c1.282-.058 2.387-.292 3.375-1.28.988-.987 1.222-2.092 1.28-3.374.058-1.28.07-1.689.07-7.275s-.012-5.995-.07-7.275c-.058-1.282-.292-2.387-1.28-3.375C21.387.362 20.282.128 19 .07 17.719.012 17.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 text-center">
          <div>
            <h4 className="font-semibold mb-2">Enlaces rápidos</h4>
            <ul className="space-y-1">
              <li>
                <a href="/" className="hover:underline text-green-100">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/productos" className="hover:underline text-green-100">
                  Productos
                </a>
              </li>
              <li>
                {/* Aquí el enlace apunta a la sección contacto para scroll suave */}
                <a href="#contacto" className="hover:underline text-green-100">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-1">
              <li>
                <a href="/privacidad" className="hover:underline text-green-100">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="/terminos" className="hover:underline text-green-100">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-green-800 pt-4 text-center text-green-200 text-sm">
        © {year} Agroforesta. Todos los derechos reservados.
      </div>
    </footer>
  );
}
