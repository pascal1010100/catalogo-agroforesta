'use client';

import { useEffect } from 'react';
import { Button } from './components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Loguear el error a un servicio de reporte
        console.error('Error capturado en boundaries:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
                ¡Vaya! Algo salió mal.
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
                Hemos encontrado un error inesperado. Por favor, intenta recargar la página.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()} variant="primary">
                    Intentar de nuevo
                </Button>
                <Button onClick={() => window.location.href = '/'} variant="outline">
                    Volver al inicio
                </Button>
            </div>
        </div>
    );
}
