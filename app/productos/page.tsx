// app/productos/page.tsx
import { Suspense } from 'react';
import ProductosCliente from './ProductosCliente';

export default function ProductosPage() {
  return (
    <Suspense fallback={<div>Cargando productos...</div>}>
      <ProductosCliente />
    </Suspense>
  );
}
