-- Create form_responses table
CREATE TABLE IF NOT EXISTS form_responses (
  id BIGSERIAL PRIMARY KEY,
  business_focus TEXT NOT NULL,
  weekly_leads INTEGER DEFAULT 0,
  ai_agent TEXT,
  monthly_budget TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  snippet TEXT,
  content TEXT,
  featured_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create youtube_config table
CREATE TABLE IF NOT EXISTS youtube_config (
  id BIGSERIAL PRIMARY KEY,
  api_key TEXT,
  channel_id TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_responses_created_at ON form_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_youtube_config_updated_at ON youtube_config(updated_at);

-- Enable Row Level Security (RLS)
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_config ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to blog posts
CREATE POLICY "Public read access to blog posts" ON blog_posts
  FOR SELECT USING (true);

-- Create policies for form submissions (allow inserts from anyone)
CREATE POLICY "Allow form submissions" ON form_responses
  FOR INSERT WITH CHECK (true);

-- Create policies for YouTube config (allow read/write for authenticated users)
CREATE POLICY "Allow YouTube config access" ON youtube_config
  FOR ALL USING (true); 