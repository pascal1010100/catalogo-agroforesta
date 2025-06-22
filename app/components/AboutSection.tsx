import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100 mb-4">
          Sobre Agroforesta
        </h2>
        <p className="text-green-800 dark:text-green-200 mb-6 max-w-xl">
          Somos líderes en la distribución de productos para agricultura, jardinería y soluciones sustentables. Nuestro compromiso es ofrecer calidad, innovación y asesoría para el crecimiento de tu proyecto agroforestal.
        </p>
        <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-2">
          <li>Más de 20 años de experiencia en el sector.</li>
          <li>Amplio catálogo de productos certificados.</li>
          <li>Atención personalizada y soporte técnico.</li>
        </ul>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-lg border-4 border-green-200 dark:border-green-800">
          <Image
            src="/images/about.png" // Cambia por la imagen que prefieras en /public/images/
            alt="Equipo Agroforesta"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
