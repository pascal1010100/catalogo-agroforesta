'use client';

import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import CheckoutModal from "./CheckoutModal";
import { Button } from "./ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Animation variants
const backdropAnimation = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.2,
      ease: [0.4, 0, 0.6, 1]
    }
  }
} as const;

const panelAnimation = {
  hidden: { x: '100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      damping: 30,
      stiffness: 400,
      mass: 0.8,
      delay: 0.1
    }
  },
  exit: { 
    x: '100%', 
    opacity: 0,
    transition: { 
      duration: 0.25,
      ease: [0.4, 0, 0.6, 1]
    }
  }
} as const;

// Animation variants for items
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.03,
      duration: 0.4,
      ease: 'easeOut' as const,
      opacity: { duration: 0.3 },
      y: { duration: 0.4 }
    }
  }),
  exit: { 
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeInOut' as const
    }
  }
} as const;

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Memoize the onClose handler to prevent it from changing on every render
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Close on escape key and handle body overflow
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleClose]);

  const handleClearCart = async () => {
    setIsClearing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async operation
    clearCart();
    setIsClearing(false);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
  };

  const totalPrice = getTotalPrice();
  const filteredCart = cart.filter((item) => item.quantity > 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <AnimatePresence>
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropAnimation}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

            {/* Cart Panel */}
            <motion.div
              ref={modalRef}
              key="cart-panel"
              className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white dark:bg-gray-900 z-50 flex flex-col shadow-xl border-l border-gray-100 dark:border-gray-800"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelAnimation}
              onClick={(e) => e.stopPropagation()}
            >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    {cart.length > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-semibold h-5 min-w-5 flex items-center justify-center rounded-full px-1 border-2 border-white dark:border-gray-900">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tu Carrito</h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Cerrar carrito"
                  className="p-1.5 -mr-1.5 rounded-lg text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Product list with custom scrollbar */}
              <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar">
                {filteredCart.length === 0 ? (
                  <motion.div 
                    key="empty-cart"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[300px] px-4 text-center"
                  >
                    <div className="p-4 mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900/50">
                      <ShoppingCart className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                      Explora nuestros productos y añade algo especial a tu pedido
                    </p>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredCart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={itemVariants}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                          mass: 0.5
                        }}
                        className="mb-3 last:mb-0"
                      >
                        <CartItem product={item} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Sticky footer */}
              {filteredCart.length > 0 && (
                <motion.div 
                  key="cart-footer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.15,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/95 backdrop-blur-sm p-5 pt-4 shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.03)] dark:shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.15)]"
                >
                  {/* Order Summary */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span className="text-base font-semibold text-gray-900 dark:text-white">
                        Q{totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Envío</span>
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Calculado al finalizar
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent dark:via-gray-800 my-4" />
                  
                  {/* Total */}
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        Q{totalPrice.toFixed(2)}
                      </span>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        + envío
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleCheckout}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                      size="lg"
                    >
                      Proceder al pago
                    </Button>
                    
                    <button
                      onClick={handleClearCart}
                      disabled={isClearing}
                      className="w-full flex items-center justify-center h-10 text-sm font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isClearing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Eliminando...
                        </span>
                      ) : (
                        <span className="flex items-center group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4 mr-2 flex-shrink-0" />
                          Vaciar carrito
                        </span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      </AnimatePresence>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={handleCheckoutClose}
        cartItems={filteredCart}
        totalPrice={totalPrice}
      />
    </div>
  );
}
