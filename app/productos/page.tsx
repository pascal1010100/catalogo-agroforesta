import { Suspense } from "react";
import ProductosCliente from "./ProductosCliente"; // ajusta ruta si está en /components
import { products } from "@/data/products";

type Search = { search?: string };

export default async function ProductosPage(
  { searchParams }: { searchParams: Promise<Search> }
) {
  const { search = "" } = await searchParams;
  const q = search.trim().toLowerCase();

  const filtered = q
    ? products.filter(p =>
        (`${p.name} ${p.description ?? ""}`).toLowerCase().includes(q)
      )
    : products;

  return (
    <Suspense fallback={<div>Cargando productos...</div>}>
      <ProductosCliente products={filtered} query={search} />
    </Suspense>
  );
}
