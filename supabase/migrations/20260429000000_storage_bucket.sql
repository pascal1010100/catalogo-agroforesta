-- Create 'catalog' bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('catalog', 'catalog', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the 'catalog' bucket

-- Public can read images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'catalog');

-- Authenticated users can insert/upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'catalog');

-- Authenticated users can update their images
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'catalog');

-- Authenticated users can delete images
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'catalog');
