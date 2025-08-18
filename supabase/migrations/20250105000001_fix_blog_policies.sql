-- Fix RLS policies for blog_posts table to allow admin operations

-- Drop existing policies
DROP POLICY IF EXISTS "Public read access to blog posts" ON blog_posts;

-- Create comprehensive policies for blog_posts
CREATE POLICY "Public read access to blog posts" ON blog_posts
  FOR SELECT USING (true);

-- Allow authenticated users to create blog posts (for admin)
CREATE POLICY "Allow authenticated users to create blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update blog posts (for admin)
CREATE POLICY "Allow authenticated users to update blog posts" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blog posts (for admin)
CREATE POLICY "Allow authenticated users to delete blog posts" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Add a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for blog_posts table
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
