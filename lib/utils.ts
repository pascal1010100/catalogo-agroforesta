import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para formatear precios
export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'MXN'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'MXN', notation = 'compact' } = options

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

// Función para crear un rango de números
export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

// Función para truncar texto
export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

// Función para generar un ID único
export function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

// Función para capitalizar la primera letra
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Función para formatear fechas
export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
