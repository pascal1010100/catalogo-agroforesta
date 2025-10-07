'use client';

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, CheckCircle, Loader2, ShoppingBag, MapPin, Mail, User, Phone } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
}

export default function CheckoutModal({ isOpen, onClose, cartItems, totalPrice }: CheckoutModalProps) {
  const { clearCart } = useCart();
  const [form, setForm] = useState({ 
    nombre: "", 
    email: "", 
    telefono: "", 
    direccion: ""  // Fixed: Added missing closing quote
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const validateForm = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return "El correo electrónico es inválido";
    if (!form.telefono.trim()) return "El teléfono es obligatorio";
    if (!form.direccion.trim()) return "La dirección es obligatoria";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          items: cartItems,
          total: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el pedido');
      }

      setSuccess(true);
      clearCart();
    } catch (err) {
      setError('Error al procesar el pedido. Por favor, inténtalo de nuevo.');
      console.error('Error al enviar el pedido:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                Finalizar pedido
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 -mr-1.5 rounded-lg text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Cerrar modal"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="p-6">
          {!success ? (
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white p-3 border"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Correo electrónico <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white p-3 border"
                      placeholder="tucorreo@ejemplo.com"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Teléfono <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white p-3 border"
                      placeholder="1234-5678"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Dirección de envío <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <textarea
                    id="direccion"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white p-3 border"
                    placeholder="Ingresa tu dirección completa para el envío"
                    required
                  />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resumen del pedido</h3>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Q{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Subtotal</span>
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      Q{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Envío</span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Calculado al finalizar
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        Q{totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <div className="flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Completar pedido
                    </div>
                  )}
                </Button>
                <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                  Al confirmar, aceptas nuestros Términos y Condiciones
                </p>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¡Pedido confirmado!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Hemos recibido tu pedido correctamente. Pronto nos pondremos en contacto contigo.
              </p>
              <Button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl"
              >
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
