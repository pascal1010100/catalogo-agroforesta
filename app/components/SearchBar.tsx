"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch?: (term: string) => void; // opcional si luego quieres usarlo
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  }, [searchTerm, onSearch]);

  return (
    <div className="relative flex items-center justify-center w-full max-w-md">
      {/* Desktop search input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar productos..."
        className="hidden md:block w-full rounded-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-background text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Mobile icon */}
      <button
        className="block md:hidden p-2"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Buscar"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
      </button>

      {/* Mobile input dropdown */}
      {isMobileOpen && (
        <div className="absolute top-10 left-0 w-[200px] z-50 md:hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full rounded-md px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}
    </div>
  );
}
