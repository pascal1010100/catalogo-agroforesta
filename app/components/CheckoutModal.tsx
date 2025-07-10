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

  // Validación simple para mostrar mensajes de error antes de enviar
  const validateForm = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return "El correo electrónico es inválido";
    if (!form.direccion.trim()) return "La dirección es obligatoria";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null); // Limpiar error cuando el usuario escribe
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

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
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg relative p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Evita cierre al click dentro
      >
        <button
          className="absolute top-4 right-4 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          onClick={onClose}
          aria-label="Cerrar modal"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <>
            <h2
              id="checkout-modal-title"
              className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100"
            >
              Finalizar pedido
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                >
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800
                    focus:outline-none focus:ring-2 focus:ring-green-600
                    ${
                      error && !form.nombre.trim()
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  placeholder="Tu nombre completo"
                  autoComplete="name"
                  aria-invalid={error && !form.nombre.trim() ? "true" : "false"}
                  aria-describedby={error && !form.nombre.trim() ? "nombre-error" : undefined}
                />
                {error && !form.nombre.trim() && (
                  <p id="nombre-error" className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                >
                  Correo electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800
                    focus:outline-none focus:ring-2 focus:ring-green-600
                    ${
                      error &&
                      (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  placeholder="correo@ejemplo.com"
                  autoComplete="email"
                  aria-invalid={
                    error &&
                    (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                      ? "true"
                      : "false"
                  }
                  aria-describedby={
                    error &&
                    (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                      ? "email-error"
                      : undefined
                  }
                />
                {error &&
                  (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">{error}</p>
                  )}
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  id="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="(opcional)"
                  autoComplete="tel"
                />
              </div>

              <div>
                <label
                  htmlFor="direccion"
                  className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                >
                  Dirección de entrega <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="direccion"
                  id="direccion"
                  required
                  value={form.direccion}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full rounded-md border px-3 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800
                    focus:outline-none focus:ring-2 focus:ring-green-600
                    ${
                      error && !form.direccion.trim()
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  placeholder="Calle, número, colonia"
                  aria-invalid={error && !form.direccion.trim() ? "true" : "false"}
                  aria-describedby={error && !form.direccion.trim() ? "direccion-error" : undefined}
                />
                {error && !form.direccion.trim() && (
                  <p id="direccion-error" className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              {error && !["nombre", "email", "direccion"].some(field => {
                // Sólo mostrar si es otro error
                if (field === "nombre" && !form.nombre.trim()) return false;
                if (field === "email" && (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))) return false;
                if (field === "direccion" && !form.direccion.trim()) return false;
                return true;
              }) && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
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
            <button
              className="mt-4 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
              onClick={onClose}
              type="button"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
