export interface Product {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  image?: string | null;
  price?: number | null;
  brand?: string | null;
  unidad?: string | null;
  stock?: number | null;
  featured?: boolean | null;
  model?: string | null;
  [key: string]: any;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Brand {
  id: string;
  name: string;
}
