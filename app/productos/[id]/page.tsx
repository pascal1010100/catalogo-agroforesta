import { notFound } from "next/navigation";
import { products } from "@/data/products";

export default async function ProductDetailPage(
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  // Next 15: si params ya es objeto, Promise.resolve lo devuelve tal cual;
  // si es Promise, lo espera. Seguro en ambos casos.
  const { id } = await Promise.resolve(params);

  // Normaliza tipos para evitar comparaciones string vs number
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) notFound();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md object-cover rounded-lg mb-6"
      />
      <p className="mb-4 text-lg">{product.description}</p>
    </main>
  );
}
