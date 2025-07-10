'use client';

import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import CheckoutModal from "./CheckoutModal";
import { X } from "lucide-react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Para animación simple de slide
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (isOpen) setShowPanel(true);
    else setTimeout(() => setShowPanel(false), 300);
  }, [isOpen]);

  if (!isOpen && !showPanel) return null;

  const totalPrice = getTotalPrice();
  const filteredCart = cart.filter((item) => item.quantity > 0);

  return (
    <>
      {/* Fondo oscuro */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel lateral */}
      <div
        className={`
          fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 z-50 shadow-2xl rounded-l-xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Tu carrito</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="text-gray-600 hover:text-gray-900 dark:hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista productos con scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-4 max-h-[65vh] space-y-4">
          {filteredCart.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-16">
              Tu carrito está vacío.
            </p>
          ) : (
            filteredCart.map((item) => (
              <CartItem key={item.id} product={item} />
            ))
          )}
        </div>

        {/* Footer fijo */}
        {filteredCart.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800 flex flex-col gap-3">
            <div className="flex justify-between text-xl font-semibold text-green-700 dark:text-green-300">
              <span>Total:</span>
              <span>Q{totalPrice.toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              variant="primary"
              size="lg"
              onClick={() => setCheckoutOpen(true)}
            >
              Finalizar pedido
            </Button>
            <Button
              className="w-full"
              variant="outline"
              size="lg"
              onClick={() => clearCart()}
            >
              Vaciar carrito
            </Button>
          </div>
        )}
      </div>

      {/* Modal de Checkout */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}
