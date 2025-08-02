'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/productos?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full"
      role="search"
      aria-label="Buscar productos"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full pl-10 pr-4 py-2 rounded-full bg-white/30 dark:bg-green-950/40 backdrop-blur-md text-sm text-green-900 dark:text-white placeholder-green-700 dark:placeholder-green-400 border border-green-300 dark:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        aria-label="Campo de búsqueda"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-green-800 dark:text-green-300 hover:text-green-600 dark:hover:text-green-100 transition"
        aria-label="Buscar"
      >
        <Search size={18} />
      </button>
    </form>
  );
}
