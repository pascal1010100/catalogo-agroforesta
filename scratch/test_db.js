require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('tu-proyecto')) {
  console.log("❌ Error: Debes configurar tus credenciales reales en .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
  console.log("Intentando conectar a Supabase...");
  const { data, error } = await supabase.from('products').select('count', { count: 'exact', head: true });
  
  if (error) {
    console.log("❌ Error al conectar:", error.message);
  } else {
    console.log("✅ Conexión exitosa. Productos en DB:", data || 0);
  }
}

checkConnection();
