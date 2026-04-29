import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { products } from '../data/products.tsx';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('🚀 Starting migration...');

  // 1. Extract Categories and Brands
  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const uniqueBrands = [...new Set(products.map(p => p.brand))];

  console.log(`Found ${uniqueCategories.length} categories and ${uniqueBrands.length} brands.`);

  // 2. Insert Categories
  const { data: catData, error: catError } = await supabase
    .from('categories')
    .upsert(uniqueCategories.map(name => ({ 
      name, 
      slug: name.toLowerCase().replace(/\s+/g, '-') 
    })), { onConflict: 'slug' })
    .select();

  if (catError) {
    console.error('Error inserting categories:', catError);
    return;
  }
  console.log('✅ Categories inserted/updated.');

  // 3. Insert Brands
  const { data: brandData, error: brandError } = await supabase
    .from('brands')
    .upsert(uniqueBrands.map(name => ({ name })), { onConflict: 'name' })
    .select();

  if (brandError) {
    console.error('Error inserting brands:', brandError);
    return;
  }
  console.log('✅ Brands inserted/updated.');

  // Create maps for lookup
  const categoryMap = Object.fromEntries(catData.map(c => [c.name, c.id]));
  const brandMap = Object.fromEntries(brandData.map(b => [b.name, b.id]));

  // 4. Insert Products
  const productsToInsert = products.map(p => ({
    name: p.name,
    description: p.description,
    category_id: categoryMap[p.category],
    brand_id: brandMap[p.brand],
    image: p.image,
    price: p.price,
    prices: p.prices || {},
    model: p.model,
    unit: p.unidad,
    stock: p.stock || 0,
    rating: p.rating || 0,
    featured: p.featured || false,
    tags: p.tags || [],
    specifications: p.specifications || {},
  }));

  const { error: prodError } = await supabase
    .from('products')
    .insert(productsToInsert);

  if (prodError) {
    console.error('Error inserting products:', prodError);
    return;
  }

  console.log(`✅ Successfully migrated ${productsToInsert.length} products.`);
  console.log('🎉 Migration complete!');
}

migrate();
