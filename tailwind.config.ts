import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta personalizada para Suplijardines
        background: "#f4f6f4",
        foreground: "#243f2f",
        "primary-light": "#e6f4ea",
        "primary": "#34a853",       // Verde principal
        "primary-dark": "#166534",  // Verde oscuro para dark mode
        card: "#e9f0e9",
        "card-dark": "#25362b",     // Card para dark mode
        accent: "#a7d7c5",
        "accent-dark": "#6bbf8e",   // Acento para dark mode
        muted: "#e5e7eb",           // Gris claro para bordes, separadores
        "muted-dark": "#374151",    // Gris oscuro para dark mode
        danger: "#ef4444",          // Rojo para errores/badges
        "danger-dark": "#f87171",
        // Puedes agregar más colores según la identidad visual
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        // Usa variables de fuentes si las tienes (ejemplo con Geist)
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        card: "0 2px 8px 0 rgba(52,168,83,0.07)", // Sombra sutil para tarjetas
        modal: "0 8px 32px 0 rgba(36,63,47,0.18)", // Sombra para modales
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),        // Mejoras para formularios
    require('@tailwindcss/typography'),   // Mejoras para textos y descripciones
    require('@tailwindcss/aspect-ratio'), // Útil para imágenes de productos
  ],
};

export default config;
