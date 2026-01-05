import Link from 'next/link';
import { Button } from './components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50 dark:bg-gray-900">
            <h1 className="text-6xl font-black text-green-600 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Página no encontrada
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                Lo sentimos, no pudimos encontrar la página que buscas. Pudo haber sido eliminada o la dirección es incorrecta.
            </p>
            <Button asChild size="lg">
                <Link href="/">
                    Volver al inicio
                </Link>
            </Button>
        </div>
    );
}
