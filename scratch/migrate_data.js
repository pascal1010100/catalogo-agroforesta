require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const productsToMigrate = [
  { name: "Green Garden Universal", category: "Fertilizantes", brand: "Agroforesta", price: 89.50, unit: "unidad", image: "/images/fertilizantes/happy-plant-floracion.png", featured: true },
  { name: "Happy Plant Floración", category: "Fertilizantes", brand: "Agroforesta", price: 77.80, unit: "unidad", image: "/images/fertilizantes/happy-plant-floracion.png", featured: true },
  { name: "Happy Plant Multivitamínico Forte", category: "Fertilizantes", brand: "Agroforesta", price: 89.50, unit: "unidad", image: "/images/fertilizantes/happy-plant-multivitaminico.png" },
  { name: "Happy Plant Reverdesciente", category: "Fertilizantes", brand: "Agroforesta", price: 77.80, unit: "unidad", image: "/images/fertilizantes/happy-plant-reverdesciente.png" },
  { name: "Atomizador ATB-18", category: "Maquinaria", brand: "Brudden", price: 4990.00, unit: "unidad", image: "/images/maquinaria/atomizador-atb-18.png", featured: true },
  { name: "Pulverizador de Mochila Motorizado BS-500", category: "Maquinaria", brand: "Brudden", price: 4990.00, unit: "unidad", image: "/images/maquinaria/brudden-bs-500.png" },
  { name: "Desmalezadora BR-45", category: "Maquinaria", brand: "Brudden", price: 4990.00, unit: "unidad", image: "/images/maquinaria/desmalezadora-br-45.png" },
  { name: "Podadora de Altura Telescópica PB-26", category: "Maquinaria", brand: "Brudden", price: 5500.00, unit: "unidad", image: "/images/maquinaria/podadora-pb-26.png", featured: true },
  { name: "Multifuncional BMU-260 G2", category: "Maquinaria", brand: "Brudden", price: 4900.00, unit: "unidad", image: "/images/maquinaria/MultifuncionalBMU-260G2.png", featured: true },
  { name: "Motosierra MB-260 20\"", category: "Maquinaria", brand: "Brudden", price: 3900.00, unit: "unidad", image: "/images/maquinaria/MotosierraMB-260 20.png", featured: true },
  { name: "Cortacésped CG620-T4 Motor Subaru", category: "Maquinaria", brand: "Brudden", price: 5200.00, unit: "unidad", image: "/images/maquinaria/cortacesped-cg620-t41.png", featured: true },
  { name: "Pulverizador Costal a Batería PB-20B", category: "Maquinaria", brand: "Brudden", price: 2260.00, unit: "unidad", image: "/images/maquinaria/pulverizador-pb-20b.png", featured: true },
  { name: "Sopladora de Mochila SB-630", category: "Maquinaria", brand: "Brudden", price: 4899.00, unit: "unidad", image: "/images/maquinaria/sopladora-sb-630.png" },
  { name: "Kit de Riego por Goteo", category: "Sistemas de Riego", brand: "AquaFlow", price: 650.00, unit: "kit", image: "/images/placeholder.jpg" }
];

async function migrate() {
  console.log("Iniciando carga de catálogo extendido...");
  
  for (const p of productsToMigrate) {
    const { data: catData } = await supabase.from('categories').upsert({ name: p.category, slug: p.category.toLowerCase().replace(/\s+/g, '-') }, { onConflict: 'slug' }).select('id').single();
    const { data: brandData } = await supabase.from('brands').upsert({ name: p.brand }, { onConflict: 'name' }).select('id').single();

    if (catData && brandData) {
      const { error } = await supabase.from('products').upsert({
        name: p.name,
        category_id: catData.id,
        brand_id: brandData.id,
        price: p.price,
        unit: p.unit,
        image: p.image,
        featured: p.featured || false,
        description: `Producto profesional de ${p.brand}.`
      }, { onConflict: 'id' }); // No unique name constraint yet, so this might duplicate if IDs change, but it's safe for now.
      
      if (error) console.error(`❌ Error en ${p.name}:`, error.message);
      else console.log(`✅ ${p.name} cargado.`);
    }
  }
  console.log("Carga masiva completada.");
}

migrate();
