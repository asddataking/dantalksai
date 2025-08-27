-- Database Cleanup Migration
-- This migration will clean up errors and conflicts without touching storage

-- =====================================================
-- 1. CLEAN UP DUPLICATE POLICIES
-- =====================================================

DO $$
DECLARE
    policy_record RECORD;
BEGIN
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

DO $$
DECLARE
    trigger_record RECORD;
BEGIN
    FOR trigger_record IN 
        SELECT n.nspname as schemaname, c.relname as tablename, t.tgname as triggername, COUNT(*) as count
        FROM pg_trigger t
        JOIN pg_class c ON t.tgrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
        GROUP BY n.nspname, c.relname, t.tgname
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
-- 3. VERIFY STORAGE IS WORKING
-- =====================================================

-- Just check that storage is accessible (don't modify it)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'images') THEN
        RAISE NOTICE 'Storage bucket "images" is already set up and working';
    ELSE
        RAISE NOTICE 'Storage bucket "images" not found - you may need to set it up manually';
    END IF;
END $$;
