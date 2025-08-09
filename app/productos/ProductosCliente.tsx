"use client";
import Link from "next/link";

type Product = { id: number | string; name: string; description?: string; image: string };

export default function ProductosCliente({ products, query = "" }: { products: Product[]; query?: string }) {
  if (!products.length) {
    return <div className="max-w-4xl mx-auto p-6">No encontramos resultados {query ? `para “${query}”` : ""}.</div>;
  }
  return (
    <main className="max-w-5xl mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(p => (
        <Link key={String(p.id)} href={`/productos/${p.id}`} className="border rounded-lg p-4 hover:shadow">
          <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded mb-3" />
          <h2 className="font-semibold">{p.name}</h2>
          {p.description && <p className="text-sm opacity-80 line-clamp-2">{p.description}</p>}
        </Link>
      ))}
    </main>
  );
}
