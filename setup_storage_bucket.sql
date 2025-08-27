-- Setup Storage Bucket for Images
-- Run this in your Supabase SQL Editor

-- Create storage bucket for images (only if it doesn't exist)
DO $$
BEGIN
  -- Check if the bucket already exists
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'images'
  ) THEN
    -- Create storage bucket for images
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'images',
      'images',
      true,
      52428800, -- 50MB
      ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    );
    
    RAISE NOTICE 'Storage bucket "images" created successfully';
  ELSE
    RAISE NOTICE 'Storage bucket "images" already exists';
  END IF;
END $$;

-- Set up storage policies for public read access
DO $$
BEGIN
  -- Check if the policy already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public Access' AND tablename = 'objects'
  ) THEN
    -- Create policy for public read access
    CREATE POLICY "Public Access" ON storage.objects
      FOR SELECT USING (bucket_id = 'images');
    
    RAISE NOTICE 'Public read access policy created successfully';
  ELSE
    RAISE NOTICE 'Public read access policy already exists';
  END IF;
END $$;

-- Allow authenticated users to upload images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can upload images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Authenticated users can upload images" ON storage.objects
      FOR INSERT WITH CHECK (
        bucket_id = 'images' 
        AND auth.role() = 'authenticated'
      );
    
    RAISE NOTICE 'Authenticated upload policy created successfully';
  ELSE
    RAISE NOTICE 'Authenticated upload policy already exists';
  END IF;
END $$;

-- Verify the setup
SELECT 
  'Storage bucket created successfully!' as status,
  id,
  name,
  public,
  file_size_limit
FROM storage.buckets 
WHERE id = 'images';
