'use client';

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", direccion: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: form,
          productos: cart,
          total: getTotalPrice(),
        }),
      });
      if (!res.ok) throw new Error("No se pudo enviar el pedido.");
      setSuccess(true);
      clearCart();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg relative p-6">
        <button
          className="absolute top-3 right-3 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>
        {!success ? (
          <>
            <h2 className="text-xl font-bold mb-4">Finalizar pedido</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="nombre">Nombre completo</label>
                <input type="text" name="nombre" id="nombre" required value={form.nombre} onChange={handleChange}
                  className="w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Correo electrónico</label>
                <input type="email" name="email" id="email" required value={form.email} onChange={handleChange}
                  className="w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="telefono">Teléfono</label>
                <input type="tel" name="telefono" id="telefono" value={form.telefono} onChange={handleChange}
                  className="w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="direccion">Dirección de entrega</label>
                <textarea name="direccion" id="direccion" required value={form.direccion} onChange={handleChange}
                  className="w-full rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2" rows={2} />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded transition">
                {loading ? "Enviando pedido..." : "Enviar pedido"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-12 text-center">
            <h3 className="text-2xl font-bold mb-3 text-green-700">¡Pedido enviado!</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-2">
              Pronto nos pondremos en contacto contigo.
            </p>
            <button className="mt-4 px-6 py-2 bg-green-700 text-white rounded" onClick={onClose}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
