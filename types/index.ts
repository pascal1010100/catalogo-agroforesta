export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  unidad: string;
  stock?: number;
  featured?: boolean;
  model?: string;
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
