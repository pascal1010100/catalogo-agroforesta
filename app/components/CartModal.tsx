'use client';

import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CheckoutModal from './CheckoutModal'; // <-- Importa el modal de checkout

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Función segura para formatear precios
function formatPrice(price: number | undefined | null) {
  if (typeof price !== 'number' || isNaN(price)) return '0';
  return price.toLocaleString();
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();

  const modalRef = useRef<HTMLDivElement>(null);

  // Estado para abrir/cerrar el modal de checkout
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Cerrar modal con Escape y bloquear scroll de fondo
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Foco automático al primer botón del modal
    setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }
    }, 50);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Cerrar modal al hacer click fuera del panel
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        onClick={handleBackdropClick}
      >
        <div
          ref={modalRef}
          className={`bg-white dark:bg-gray-800 w-full max-w-md h-full overflow-y-auto shadow-xl transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          tabIndex={-1}
        >
          {/* Encabezado */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Carrito de Compras
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Tu carrito está vacío
                </p>
              </div>
            ) : (
              <>
                {/* Lista de productos */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-green-600 font-semibold">
                          ${formatPrice(item.price)}
                        </p>
                      </div>
                      {/* Controles de cantidad y eliminación */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total y acciones */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total:
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      ${formatPrice(getTotalPrice())}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                      onClick={() => setCheckoutOpen(true)}
                    >
                      Proceder al Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 rounded-lg transition-colors"
                    >
                      Vaciar Carrito
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Modal de checkout */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
