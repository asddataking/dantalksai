-- Supabase Database Cleanup Script
-- Run this in your Supabase SQL Editor to clear out errors and conflicts

-- =====================================================
-- 1. CLEAN UP DUPLICATE POLICIES
-- =====================================================

-- Remove duplicate policies that might be causing conflicts
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Find and drop duplicate policies
    FOR policy_record IN 
        SELECT schemaname, tablename, policyname, COUNT(*) as count
        FROM pg_policies 
        GROUP BY schemaname, tablename, policyname 
        HAVING COUNT(*) > 1
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "%s" ON %s.%s', 
                      policy_record.policyname, 
                      policy_record.schemaname, 
                      policy_record.tablename);
        RAISE NOTICE 'Dropped duplicate policy: % on %.%', 
                    policy_record.policyname, 
                    policy_record.schemaname, 
                    policy_record.tablename;
    END LOOP;
END $$;

-- =====================================================
-- 2. CLEAN UP DUPLICATE TRIGGERS
-- =====================================================

-- Remove duplicate triggers
DO $$
DECLARE
    trigger_record RECORD;
BEGIN
    FOR trigger_record IN 
        SELECT schemaname, tablename, triggername, COUNT(*) as count
        FROM pg_trigger t
        JOIN pg_class c ON t.tgrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
        GROUP BY schemaname, tablename, triggername 
        HAVING COUNT(*) > 1
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS "%s" ON %s.%s', 
                      trigger_record.triggername, 
                      trigger_record.schemaname, 
                      trigger_record.tablename);
        RAISE NOTICE 'Dropped duplicate trigger: % on %.%', 
                    trigger_record.triggername, 
                    trigger_record.schemaname, 
                    trigger_record.tablename;
    END LOOP;
END $$;

-- =====================================================
-- 3. CLEAN UP MIGRATION TABLES
-- =====================================================

-- Reset migration tracking to clean state
DO $$
BEGIN
    -- Drop the problematic migration tables if they exist
    DROP TABLE IF EXISTS supabase_migrations CASCADE;
    DROP TABLE IF EXISTS schema_migrations CASCADE;
    
    RAISE NOTICE 'Cleaned up migration tables';
END $$;

-- =====================================================
-- 4. SET UP STORAGE BUCKET (CLEAN)
-- =====================================================

-- Create storage bucket for images (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM storage.buckets WHERE id = 'images'
    ) THEN
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

-- =====================================================
-- 4.5. CREATE FOLDER STRUCTURE (OPTIONAL)
-- =====================================================

-- Note: Supabase storage automatically creates folders when you upload files
-- You don't need to create them manually, but here's the recommended structure:
/*
Supabase Storage Bucket: images/
├── industries/           (for industry-specific images)
│   ├── dumpsterrental1.jpg
│   ├── excavation-grid.jpg
│   └── other-industry-images.jpg
├── branding/            (for logo, Rhea image, etc.)
│   ├── logo.png
│   ├── Rhea.png
│   └── other-brand-assets.jpg
├── blog/                (for blog post images)
│   └── blog-post-images.jpg
└── misc/                (for other site images)
    └── other-images.jpg
*/

-- =====================================================
-- 5. SET UP STORAGE POLICIES (CLEAN)
-- =====================================================

-- Set up storage policies for public read access
DO $$
BEGIN
    -- Drop existing policies first to avoid conflicts
    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
    
    -- Create clean policies
    CREATE POLICY "Public Access" ON storage.objects
        FOR SELECT USING (bucket_id = 'images');
    
    CREATE POLICY "Authenticated users can upload images" ON storage.objects
        FOR INSERT WITH CHECK (
            bucket_id = 'images' 
            AND auth.role() = 'authenticated'
        );
    
    RAISE NOTICE 'Storage policies created successfully';
END $$;

-- =====================================================
-- 6. VERIFY STORAGE SETUP
-- =====================================================

-- Check storage bucket status
SELECT 
    'Storage Setup Complete!' as status,
    id,
    name,
    public,
    file_size_limit,
    created_at
FROM storage.buckets 
WHERE id = 'images';

-- Check storage policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';

-- =====================================================
-- 7. CLEAN UP ANY REMAINING ERRORS
-- =====================================================

-- Reset any sequences that might be out of sync
DO $$
DECLARE
    seq_record RECORD;
BEGIN
    FOR seq_record IN 
        SELECT schemaname, sequencename
        FROM pg_sequences 
        WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
    LOOP
        EXECUTE format('ALTER SEQUENCE %I.%I RESTART WITH 1', 
                      seq_record.schemaname, 
                      seq_record.sequencename);
    END LOOP;
    RAISE NOTICE 'Reset all sequences to clean state';
END $$;

-- =====================================================
-- 8. FINAL STATUS CHECK
-- =====================================================

-- Show final status
SELECT 
    'Database cleanup completed successfully!' as message,
    NOW() as cleanup_time;

-- Show current storage status
SELECT 
    'Current Storage Status:' as info,
    COUNT(*) as total_buckets,
    COUNT(CASE WHEN public = true THEN 1 END) as public_buckets
FROM storage.buckets;
