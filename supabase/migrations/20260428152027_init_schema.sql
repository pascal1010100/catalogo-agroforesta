-- Create Categories table
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Brands table
CREATE TABLE public.brands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    logo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Products table
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
    image TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    prices JSONB DEFAULT '{}'::jsonb,
    model TEXT,
    unit TEXT DEFAULT 'unidad',
    stock INTEGER DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    specifications JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- RLS (Row Level Security)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies: Everyone can read
CREATE POLICY "Allow public read-only access on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on products" ON public.products FOR SELECT USING (true);

-- Policies: Only authenticated users (admins) can modify
-- Note: In a real app, we would check for a specific 'admin' role or uid
CREATE POLICY "Allow authenticated users to modify categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify brands" ON public.brands FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
