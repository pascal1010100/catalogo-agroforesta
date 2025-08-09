import { notFound } from "next/navigation";
import { products } from "@/data/products";

export default async function ProductDetailPage(
  { params }: { params: Promise<{ id: string }> } // ← tipa como Promise para cumplir la constraint
) {
  // 'await' funciona si llega Promise o si llega objeto (JS lo devuelve tal cual)
  const { id } = await params;

  // normaliza para evitar warning string vs number
  const product = products.find(p => String(p.id) === String(id));

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
