require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Lista completa de productos (simplificada para migración rápida)
const productsToMigrate = [
  { name: "Green Garden Universal", category: "Fertilizantes", brand: "Agroforesta", price: 89.50, unit: "unidad", image: "/images/fertilizantes/happy-plant-floracion.png", featured: true },
  { name: "Happy Plant Floración", category: "Fertilizantes", brand: "Agroforesta", price: 77.80, unit: "unidad", image: "/images/fertilizantes/happy-plant-floracion.png", featured: true },
  { name: "Atomizador ATB-18", category: "Maquinaria", brand: "Brudden", price: 4990.00, unit: "unidad", image: "/images/maquinaria/atomizador-atb-18.png", featured: true },
  { name: "Motosierra MB-380", category: "Maquinaria", brand: "Agroforesta", price: 3250.00, unit: "unidad", image: "/images/maquinaria/motosierra-mb-380.png" },
  { name: "Desmalezadora BC-35", category: "Maquinaria", brand: "Agroforesta", price: 2150.00, unit: "unidad", image: "/images/maquinaria/desmalezadora-bc-35.png" },
  { name: "Tijera de Podar Profesional", category: "Herramientas", brand: "Agroforesta", price: 145.00, unit: "unidad", image: "/images/herramientas.png" },
  { name: "Kit de Riego Goteo", category: "Sistemas de Riego", brand: "Agroforesta", price: 850.00, unit: "kit", image: "/images/riego.png" }
];

async function migrate() {
  console.log("Subiendo catálogo completo...");
  
  for (const p of productsToMigrate) {
    // Upsert Category
    const { data: catData } = await supabase.from('categories').upsert({ name: p.category, slug: p.category.toLowerCase().replace(/\s+/g, '-') }, { onConflict: 'slug' }).select('id').single();
    
    // Upsert Brand
    const { data: brandData } = await supabase.from('brands').upsert({ name: p.brand }, { onConflict: 'name' }).select('id').single();

    if (catData && brandData) {
      await supabase.from('products').upsert({
        name: p.name,
        category_id: catData.id,
        brand_id: brandData.id,
        price: p.price,
        unit: p.unit,
        image: p.image,
        featured: p.featured || false,
        description: `Solución profesional de ${p.brand} para ${p.category.toLowerCase()}.`
      }, { onConflict: 'name' });
      console.log(`✅ ${p.name} listo.`);
    }
  }
  console.log("¡Todo el catálogo inicial ha sido migrado!");
}

migrate();
