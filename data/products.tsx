export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  prices?: {
    minorista?: number;
    mayorista?: number;
    "mayorista-48"?: number;
  };
  brand: string;
  model?: string;
  unidad: string;
  // Nuevos campos para mejorar la experiencia
  stock?: number;
  featured?: boolean;
  tags?: string[];
  specifications?: Record<string, string>;
};

export const products: Product[] = [
  // FERTILIZANTES Y PRODUCTOS DE JARDINERÍA
  {
    id: "green-garden-universal",
    name: "Green Garden Universal",
    description: "Fertilizante foliar universal para todo tipo de plantas en interior y exterior. Proporciona balance de elementos mayores, microelementos y bioestimulantes vegetales.",
    category: "Fertilizantes",
    image: "/images/fertilizantes/happy-plant-floracion.png",
    price: 89.50,
    prices: { minorista: 65.00, mayorista: 60.00, "mayorista-48": 58.00 },
    brand: "Agroforesta",
    unidad: "unidad",
    featured: true,
    tags: ["universal", "foliar", "interior", "exterior"],
    specifications: {
      "Presentación": "1 litro",
      "Tipo": "Foliar",
      "Características": "Sin silicona ni aceite"
    }
  },
  {
    id: "happy-plant-floracion",
    name: "Happy Plant Floración",
    description: "Fórmula especializada con bioestimulantes que favorecen la producción de flores en plantas de jardín, árboles frutales y plantas de interior.",
    category: "Fertilizantes",
    image: "/images/fertilizantes/happy-plant-floracion.png",
    price: 77.80,
    prices: { minorista: 55.00, mayorista: 50.00, "mayorista-48": 48.00 },
    brand: "Agroforesta",
    unidad: "unidad",
    featured: true,
    tags: ["floración", "bioestimulantes", "frutales"],
    specifications: {
      "Función": "Acelera la floración",
      "Beneficios": "Resalta el color de las flores"
    }
  },
  {
    id: "happy-plant-multivitaminico",
    name: "Happy Plant Multivitamínico Forte",
    description: "Fórmula orgánica premium con bioestimulantes naturales, vitaminas y aminoácidos que estimulan el sistema inmunológico de la planta.",
    category: "Fertilizantes",
    image: "/images/fertilizantes/happy-plant-multivitaminico.png",
    price: 89.50,
    prices: { minorista: 65.00, mayorista: 60.00, "mayorista-48": 58.00 },
    brand: "Agroforesta",
    unidad: "unidad",
    tags: ["multivitamínico", "orgánico", "aminoácidos"],
    specifications: {
      "Tipo": "Orgánico premium",
      "Función": "Fortalece sistema inmunológico"
    }
  },
  {
    id: "happy-plant-reverdesciente",
    name: "Happy Plant Reverdesciente",
    description: "Diseñado para incrementar y mantener el color verde de plantas y césped. Enriquecido con aminoácidos y algas orgánicas.",
    category: "Fertilizantes",
    image: "/images/fertilizantes/happy-plant-reverdesciente.png",
    price: 77.80,
    prices: { minorista: 55.00, mayorista: 50.00, "mayorista-48": 48.00 },
    brand: "Agroforesta",
    unidad: "unidad",
    tags: ["reverdesciente", "césped", "algas"],
    specifications: {
      "Ingredientes": "Aminoácidos y algas orgánicas",
      "Función": "Mantiene color verde intenso"
    }
  },
  {
    id: "green-garden-orquideas",
    name: "Green Garden Orquídeas",
    description: "Fertilizante líquido especialmente formulado para orquídeas y plantas de flor. Estimula el crecimiento y favorece la floración.",
    category: "Fertilizantes",
    image: "/images/fertilizantes/happy-plant-floracion.png",
    price: 89.50,
    prices: { minorista: 65.00, mayorista: 60.00, "mayorista-48": 58.00 },
    brand: "Agroforesta",
    unidad: "unidad",
    featured: true,
    tags: ["orquídeas", "especializado", "floración"],
    specifications: {
      "Especialidad": "Orquídeas y plantas de flor",
      "Función": "Estimula crecimiento y floración"
    }
  },
  {
    id: "green-garden-hidroponica",
    name: "Green Garden Hidropónica Mayor I",
    description: "Fertilizante especializado para cultivos hidropónicos. Fórmula balanceada para sistemas sin suelo.",
    category: "Fertilizantes",
    image: "/images/fertilizantes/happy-plant-floracion.png",
    price: 83.65,
    prices: { minorista: 60.00, mayorista: 55.00, "mayorista-48": 53.00 },
    brand: "Agroforesta",
    unidad: "unidad",
    tags: ["hidropónico", "sin suelo", "balanceado"],
    specifications: {
      "Tipo": "Hidropónico",
      "Sistema": "Cultivos sin suelo"
    }
  },
  {
    id: "happy-plant-abrillantador",
    name: "Happy Plant Abrillantador de Hojas",
    description: "Fórmula que brinda a las plantas de interior un brillo sedoso y natural. No contiene silicona ni aceite.",
    category: "Fertilizantes",
    image: "/images/fertilizantes/happy-plant-abrillantador.png",
    price: 89.90,
    prices: { minorista: 65.00, mayorista: 60.00, "mayorista-48": 57.00 },
    brand: "Agroforesta",
    unidad: "unidad",
    tags: ["abrillantador", "interior", "natural"],
    specifications: {
      "Características": "Sin silicona ni aceite",
      "Función": "Brillo sedoso natural"
    }
  },
  {
    id: "lenta-liberacion-14-14-14",
    name: "Fertilizante de Liberación Lenta 14-14-14",
    description: "Fertilizante granulado de liberación lenta durante 3 meses. Fórmula balanceada 14-14-14 que incentiva el desarrollo del follaje.",
    category: "Fertilizantes",
    image: "/images/fertilizantes/lenta-liberacion-14-14-14.png",
    price: 72.50,
    prices: { minorista: 51.00, mayorista: 47.00, "mayorista-48": 45.00 },
    brand: "Agroforesta",
    unidad: "unidad",
    tags: ["liberación lenta", "granulado", "14-14-14"],
    specifications: {
      "Duración": "3 meses",
      "Fórmula": "14-14-14",
      "Tipo": "Granulado"
    }
  },

  // MAQUINARIA BRUDDEN
  {
    id: "atomizador-atb-18",
    name: "Atomizador ATB-18",
    model: "ATB-18",
    description: "Atomizador costal a gasolina con motor 2 tiempos de 63.3cc y 3.1 HP. Reservatorio de 18 litros con alcance horizontal de 16m.",
    category: "Maquinaria",
    image: "/images/maquinaria/atomizador-atb-18.png",
    price: 4990.00,
    prices: { mayorista: 3992.00 },
    brand: "Brudden",
    unidad: "unidad",
    featured: true,
    tags: ["atomizador", "costal", "gasolina"],
    specifications: {
      "Motor": "2 tiempos, 63.3cc, 3.1 HP",
      "Reservatorio": "18 litros",
      "Alcance horizontal": "16 metros",
      "Alcance vertical": "12 metros",
      "Combustible": "Gasolina"
    }
  },
  {
    id: "pulverizador-bs-500",
    name: "Pulverizador de Mochila Motorizado BS-500",
    model: "BS-500",
    description: "Pulverizador motorizado de mochila con capacidad de 25 litros. Presión máxima de 500 bar con válvula de seguridad.",
    category: "Maquinaria",
    image: "/images/maquinaria/brudden-bs-500.png",
    price: 4990.00,
    prices: { mayorista: 3992.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["pulverizador", "motorizado", "mochila"],
    specifications: {
      "Capacidad": "25 litros",
      "Presión máxima": "500 bar",
      "Material": "Plástico resistente",
      "Seguridad": "Válvula de seguridad incluida"
    }
  },
  {
    id: "desmalezadora-br-45",
    name: "Desmalezadora BR-45",
    model: "BR-45",
    description: "Desmalezadora Brudden de alto rendimiento para trabajos profesionales de jardinería y mantenimiento.",
    category: "Maquinaria",
    image: "/images/maquinaria/desmalezadora-br-45.png",
    price: 4990.00,
    prices: { mayorista: 3992.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["desmalezadora", "profesional", "jardinería"],
    specifications: {
      "Tipo": "Profesional",
      "Uso": "Jardinería y mantenimiento"
    }
  },
  {
    id: "podadora-pb-26",
    name: "Podadora de Altura Telescópica PB-26",
    model: "PB-26",
    description: "Podadora telescópica para trabajo en altura. Ideal para poda de árboles y arbustos altos.",
    category: "Maquinaria",
    image: "/images/maquinaria/podadora-pb-26.png",
    price: 5500.00,
    prices: { mayorista: 4940.00 },
    brand: "Brudden",
    unidad: "unidad",
    featured: true,
    tags: ["podadora", "telescópica", "altura"],
    specifications: {
      "Tipo": "Telescópica",
      "Uso": "Trabajo en altura",
      "Aplicación": "Poda de árboles y arbustos"
    }
  },
  {
    id: "pulverizador-bs-300",
    name: "Pulverizador Estacionario BS-300",
    model: "BS-300",
    description: "Pulverizador estacionario con motor 2 tiempos de 25.4cc y 1.1 HP. Bomba lubricada con aceite y pistón de cerámica.",
    category: "Maquinaria",
    image: "/images/maquinaria/Pulverizador-Estacionario-BS-300.png",
    price: 5500.00,
    prices: { mayorista: 4400.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["pulverizador", "estacionario", "profesional"],
    specifications: {
      "Motor": "2 tiempos, 25.4cc, 1.1 HP",
      "Bomba": "Lubricada con aceite",
      "Pistón": "Cerámica para mayor durabilidad",
      "Lanzas": "Dos lanzas de pulverización incluidas"
    }
  },
  {
    id: "multifuncional-bmu-260-g2",
    name: "Multifuncional BMU-260 G2",
    model: "BMU-260 G2",
    description: "Herramienta multifuncional 4 en 1: desbrozadora, bordeadora, cortasetos y podadora. Motor 26cc, 1HP.",
    category: "Maquinaria",
    image: "/images/maquinaria/MultifuncionalBMU-260G2.png",
    price: 4900.00,
    prices: { mayorista: 4350.00 },
    brand: "Brudden",
    unidad: "unidad",
    featured: true,
    tags: ["multifuncional", "4 en 1", "versátil"],
    specifications: {
      "Motor": "26cc, 1HP",
      "Funciones": "Desbrozadora, bordeadora, cortasetos, podadora",
      "Tipo": "Multifuncional 4 en 1"
    }
  },
  {
    id: "motosierra-mb-380",
    name: "Motosierra MB-380 16\"",
    model: "MB-380",
    description: "Motosierra Brudden de 16 pulgadas, ideal para trabajos de poda y corte de madera de tamaño medio.",
    category: "Maquinaria",
    image: "/images/maquinaria/motosierra-mb-380.png",
    price: 2500.00,
    prices: { mayorista: 1760.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["motosierra", "16 pulgadas", "poda"],
    specifications: {
      "Espada": "16 pulgadas",
      "Uso": "Poda y corte medio"
    }
  },
  {
    id: "motosierra-mb-260",
    name: "Motosierra MB-260 20\"",
    model: "MB-260",
    description: "Motosierra Brudden de 20 pulgadas para trabajos pesados de corte y tala de árboles grandes.",
    category: "Maquinaria",
    image: "/images/maquinaria/MotosierraMB-260 20.png",
    price: 3900.00,
    prices: { mayorista: 2990.00 },
    brand: "Brudden",
    unidad: "unidad",
    featured: true,
    tags: ["motosierra", "20 pulgadas", "profesional"],
    specifications: {
      "Espada": "20 pulgadas",
      "Uso": "Trabajos pesados y tala"
    }
  },
  {
    id: "hoyadora-k-52p",
    name: "Hoyadora K-52P",
    model: "K-52P",
    description: "Hoyadora Brudden para perforaciones precisas en tierra. Ideal para plantación y postes.",
    category: "Maquinaria",
    image: "/images/maquinaria/hoyadora-k-52p.jpg",
    price: 4820.00,
    prices: { mayorista: 3859.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["hoyadora", "perforación", "plantación"],
    specifications: {
      "Función": "Perforaciones precisas",
      "Uso": "Plantación y postes"
    }
  },

  // BARRENOS PARA HOYADORA
  {
    id: "barreno-300mm",
    name: "Barreno 300mm",
    description: "Barreno de 300mm de diámetro para hoyadora. Compatible con hoyadora K-52P.",
    category: "Maquinaria",
    image: "/images/maquinaria/barreno-300mm.png",
    price: 1350.00,
    prices: {},
    brand: "Brudden",
    unidad: "unidad",
    tags: ["barreno", "300mm", "accesorio"],
    specifications: {
      "Diámetro": "300mm",
      "Compatibilidad": "Hoyadora K-52P"
    }
  },
  {
    id: "barreno-250mm",
    name: "Barreno 250mm",
    description: "Barreno de 250mm de diámetro para hoyadora. Compatible con hoyadora K-52P.",
    category: "Maquinaria",
    image: "/images/maquinaria/barreno-250mm.png",
    price: 1250.00,
    prices: {},
    brand: "Brudden",
    unidad: "unidad",
    tags: ["barreno", "250mm", "accesorio"],
    specifications: {
      "Diámetro": "250mm",
      "Compatibilidad": "Hoyadora K-52P"
    }
  },
  {
    id: "barreno-150mm",
    name: "Barreno 150mm",
    description: "Barreno de 150mm de diámetro para hoyadora. Compatible con hoyadora K-52P.",
    category: "Maquinaria",
    image: "/images/maquinaria/barreno-150mm.png",
    price: 1150.00,
    prices: {},
    brand: "Brudden",
    unidad: "unidad",
    tags: ["barreno", "150mm", "accesorio"],
    specifications: {
      "Diámetro": "150mm",
      "Compatibilidad": "Hoyadora K-52P"
    }
  },
  {
    id: "barreno-100mm",
    name: "Barreno 100mm",
    description: "Barreno de 100mm de diámetro para hoyadora. Compatible con hoyadora K-52P.",
    category: "Maquinaria",
    image: "/images/maquinaria/barreno-100mm.png",
    price: 1100.00,
    prices: {},
    brand: "Brudden",
    unidad: "unidad",
    tags: ["barreno", "100mm", "accesorio"],
    specifications: {
      "Diámetro": "100mm",
      "Compatibilidad": "Hoyadora K-52P"
    }
  },

  // CORTACÉSPEDES
  {
    id: "cortacesped-cg620-t4",
    name: "Cortacésped CG620-T4 Motor Subaru",
    description: "Cortacésped profesional con motor Subaru. Ideal para áreas grandes de césped.",
    category: "Maquinaria",
    image: "/images/maquinaria/cortacesped-cg620-t41.png",
    price: 5200.00,
    prices: { mayorista: 4680.00 },
    brand: "Brudden",
    unidad: "unidad",
    featured: true,
    tags: ["cortacésped", "subaru", "profesional"],
    specifications: {
      "Motor": "Subaru",
      "Tipo": "Profesional",
      "Uso": "Áreas grandes de césped"
    }
  },
  {
    id: "cortacesped-cg620-t4t",
    name: "Cortacésped CG620-T4T Motor Subaru con Tracción",
    description: "Cortacésped con motor Subaru y tracción en las ruedas traseras. Mayor facilidad de manejo en terrenos irregulares.",
    category: "Maquinaria",
    image: "/images/maquinaria/cortacesped-cg620-t4t.png",
    price: 5650.00,
    prices: { mayorista: 5085.00 },
    brand: "Brudden",
    unidad: "unidad",
    featured: true,
    tags: ["cortacésped", "tracción", "subaru"],
    specifications: {
      "Motor": "Subaru",
      "Tracción": "Ruedas traseras",
      "Ventaja": "Manejo en terrenos irregulares"
    }
  },

  // EQUIPOS ESPECIALIZADOS
  {
    id: "derribadora-dsc-18",
    name: "Derribadora Selectiva de Cosecha DSC-18",
    model: "DSC-18",
    description: "Derribadora selectiva especializada para cosecha. Equipo profesional para trabajos forestales.",
    category: "Maquinaria",
    image: "/images/maquinaria/derribadora-dsc-18.png",
    price: 6900.00,
    prices: { mayorista: 6210.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["derribadora", "forestal", "cosecha"],
    specifications: {
      "Tipo": "Selectiva de cosecha",
      "Uso": "Trabajos forestales profesionales"
    }
  },
  {
    id: "motobomba-k-43m",
    name: "Motobomba K-43M",
    model: "K-43M",
    description: "Motobomba para riego y trasvase de agua. Ideal para sistemas de riego y drenaje.",
    category: "Maquinaria",
    image: "/images/maquinaria/motobomba-k-43m.png",
    price: 3200.00,
    prices: { mayorista: 2560.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["motobomba", "riego", "trasvase"],
    specifications: {
      "Función": "Riego y trasvase",
      "Uso": "Sistemas de riego y drenaje"
    }
  },

  // PULVERIZADORES MANUALES
  {
    id: "pulverizador-s-16",
    name: "Pulverizador Manual S-16",
    model: "S-16",
    description: "Pulverizador manual de 16 litros para aplicaciones domésticas y jardines pequeños.",
    category: "Maquinaria",
    image: "/images/maquinaria/pulverizador-s-16.png",
    price: 515.00,
    prices: { mayorista: 385.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["pulverizador", "manual", "doméstico"],
    specifications: {
      "Capacidad": "16 litros",
      "Tipo": "Manual",
      "Uso": "Doméstico y jardines pequeños"
    }
  },
  {
    id: "pulverizador-s-20",
    name: "Pulverizador Manual S-20",
    model: "S-20",
    description: "Pulverizador manual de 20 litros para aplicaciones medianas en jardín y agricultura.",
    category: "Maquinaria",
    image: "/images/maquinaria/pulverizador-s-20.png",
    price: 575.00,
    prices: { mayorista: 425.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["pulverizador", "manual", "jardín"],
    specifications: {
      "Capacidad": "20 litros",
      "Tipo": "Manual",
      "Uso": "Jardín y agricultura mediana"
    }
  },
  {
    id: "pulverizador-pb-20b",
    name: "Pulverizador Costal a Batería PB-20B",
    model: "PB-20B",
    description: "Pulverizador costal con batería recargable. Elimina el esfuerzo del bombeo manual.",
    category: "Maquinaria",
    image: "/images/maquinaria/pulverizador-pb-20b.png",
    price: 2260.00,
    prices: { mayorista: 1808.00 },
    brand: "Brudden",
    unidad: "unidad",
    featured: true,
    tags: ["pulverizador", "batería", "costal"],
    specifications: {
      "Tipo": "A batería",
      "Ventaja": "Sin bombeo manual",
      "Batería": "Recargable"
    }
  },

  // EQUIPOS DE LIMPIEZA
  {
    id: "sopladora-sb-630",
    name: "Sopladora de Mochila SB-630",
    model: "SB-630",
    description: "Sopladora de mochila potente para limpieza de hojas y residuos. Ideal para mantenimiento de áreas verdes.",
    category: "Maquinaria",
    image: "/images/maquinaria/sopladora-sb-630.png",
    price: 4899.00,
    prices: { mayorista: 3919.20 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["sopladora", "mochila", "limpieza"],
    specifications: {
      "Tipo": "De mochila",
      "Función": "Limpieza de hojas y residuos",
      "Uso": "Mantenimiento de áreas verdes"
    }
  },

  // HERRAMIENTAS DE CORTE
  {
    id: "cortasetos-bcv-260",
    name: "Cortasetos BCV-260",
    model: "BCV-260",
    description: "Cortasetos profesional para poda y mantenimiento de setos y arbustos ornamentales.",
    category: "Maquinaria",
    image: "/images/maquinaria/cortasetos-bcv-260.png",
    price: 3599.00,
    prices: { mayorista: 2879.20 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["cortasetos", "profesional", "ornamental"],
    specifications: {
      "Tipo": "Profesional",
      "Uso": "Setos y arbustos ornamentales"
    }
  },
  {
    id: "desmalezadora-t-26",
    name: "Desmalezadora T-26",
    model: "T-26",
    description: "Desmalezadora T-26 para trabajos exigentes. Ideal para terrenos difíciles y maleza densa.",
    category: "Maquinaria",
    image: "/images/maquinaria/desmalezadora-t-26.png",
    price: 2900.00,
    prices: { mayorista: 2150.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["desmalezadora", "exigente", "maleza densa"],
    specifications: {
      "Tipo": "Para trabajos exigentes",
      "Uso": "Terrenos difíciles y maleza densa"
    }
  },
  {
    id: "desmalezadora-bc-35",
    name: "Desmalezadora BC-35",
    model: "BC-35",
    description: "Desmalezadora BC-35 robusta y eficiente para trabajos profesionales de jardinería y agricultura.",
    category: "Maquinaria",
    image: "/images/maquinaria/desmalezadora-bc-35.png",
    price: 3998.00,
    prices: { mayorista: 3200.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["desmalezadora", "robusta", "profesional"],
    specifications: {
      "Tipo": "Robusta y eficiente",
      "Uso": "Jardinería y agricultura profesional"
    }
  },

  // EQUIPOS ELÉCTRICOS
  {
    id: "atomizador-electrico-1-5l",
    name: "Atomizador Eléctrico 1.5L",
    description: "Atomizador eléctrico portátil de 1.5 litros. Ideal para plantas de interior y aplicaciones domésticas.",
    category: "Maquinaria",
    image: "/images/maquinaria/atomizador-electrico-1-5l.png",
    price: 325.00,
    prices: { mayorista: 280.00 },
    brand: "Brudden",
    unidad: "unidad",
    tags: ["atomizador", "eléctrico", "portátil"],
    specifications: {
      "Capacidad": "1.5 litros",
      "Tipo": "Eléctrico portátil",
      "Uso": "Interior y doméstico"
    }
  }
];

// Funciones de utilidad para el manejo de productos
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured === true);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getProductsByPriceRange = (min: number, max: number): Product[] => {
  return products.filter(product => product.price >= min && product.price <= max);
};

// Constantes para categorías y marcas
export const CATEGORIES = {
  FERTILIZANTES: 'Fertilizantes',
  MAQUINARIA: 'Maquinaria'
} as const;

export const BRANDS = {
  AGROFORESTA: 'Agroforesta',
  BRUDDEN: 'Brudden'
} as const;
