-- Create store_settings table
CREATE TABLE public.store_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    whatsapp TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    store_name TEXT NOT NULL DEFAULT 'Agroforesta',
    default_message TEXT NOT NULL DEFAULT 'Hola Agroforesta, me interesa este producto...',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add updated_at trigger
CREATE TRIGGER store_settings_updated_at
    BEFORE UPDATE ON public.store_settings
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- RLS (Row Level Security)
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read-only access on settings" 
ON public.store_settings FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to modify settings" 
ON public.store_settings FOR ALL USING (auth.role() = 'authenticated');

-- Insert default row
INSERT INTO public.store_settings (id, whatsapp, email, address, store_name, default_message)
VALUES (
    '00000000-0000-0000-0000-000000000000', -- Fixed ID for singleton
    '+50200000000', 
    'ventas@agroforesta.com', 
    'Guatemala', 
    'Agroforesta', 
    'Hola Agroforesta, me interesa este producto...'
) ON CONFLICT DO NOTHING;
