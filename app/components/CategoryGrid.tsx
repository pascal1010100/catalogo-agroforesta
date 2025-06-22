import Image from "next/image";
import Link from "next/link";
import { Apple, Leaf, Sprout, Wrench, Tractor, FlaskConical } from "lucide-react";

type Category = {
  name: string;
  image: string;
  href: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const categories: Category[] = [
  {
    name: "Frutas",
    image: "/images/frutas.png",
    href: "/productos?categoria=frutas",
    description: "Variedad de frutas frescas y de temporada.",
    Icon: Apple,
  },
  {
    name: "Verduras",
    image: "/images/verduras.png",
    href: "/productos?categoria=verduras",
    description: "Verduras orgánicas y saludables.",
    Icon: Leaf,
  },
  {
    name: "Semillas",
    image: "/images/semillas.png",
    href: "/productos?categoria=semillas",
    description: "Semillas certificadas para siembra.",
    Icon: Sprout,
  },
  {
    name: "Herramientas",
    image: "/images/herramientas.png",
    href: "/productos?categoria=herramientas",
    description: "Herramientas resistentes y confiables.",
    Icon: Wrench,
  },
  {
    name: "Maquinaria",
    image: "/images/maquinaria.png", // corregí la ruta que estaba vacía
    href: "/productos?categoria=maquinaria",
    description: "Maquinaria agrícola de última generación.",
    Icon: Tractor,
  },
  {
    name: "Fertilizantes",
    image: "/images/fertilizantes.png",
    href: "/productos?categoria=fertilizantes",
    description: "Fertilizantes para todo tipo de cultivos.",
    Icon: FlaskConical,
  },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={cat.href}
          className="group rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
        >
          <div className="relative w-full h-24">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-contain group-hover:opacity-90 transition"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
          <div className="p-4 flex-1 flex flex-col items-center text-center">
            <cat.Icon className="w-8 h-8 mb-2 text-green-700 group-hover:text-green-900 transition" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">{cat.name}</h3>
            <p className="text-sm text-green-700 dark:text-green-200 mt-1">{cat.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
