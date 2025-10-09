'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full max-w-xl mt-10 relative bg-white/70 dark:bg-green-900/80 border border-green-200 dark:border-green-700 rounded-2xl shadow-2xl backdrop-blur-lg p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-green-800 dark:text-green-100 hover:text-red-500 transition"
            aria-label="Cerrar buscador"
          >
            <X size={22} />
          </button>

          {/* Título */}
          <h2 className="text-lg font-semibold text-green-800 dark:text-green-100 mb-4">
            ¿Qué estás buscando?
          </h2>

          <SearchBar onSearchComplete={onClose} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
