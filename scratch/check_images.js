import fs from 'fs';
import path from 'path';
import { products } from './data/products.js';

const publicDir = path.join(process.cwd(), 'public');

console.log("Checking product images...");
products.forEach(p => {
  const fullPath = path.join(publicDir, p.image);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ Missing: ${p.image} (Product: ${p.name})`);
  } else {
    console.log(`✅ Found: ${p.image}`);
  }
});
