-- Create tools table for affiliate deals
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  pricing VARCHAR(50) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  rating DECIMAL(3,2) DEFAULT 0.00,
  url VARCHAR(500) NOT NULL,
  affiliate_url VARCHAR(500),
  logo_url VARCHAR(500),
  is_new BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_pricing ON tools(pricing);
CREATE INDEX IF NOT EXISTS idx_tools_is_active ON tools(is_active);
CREATE INDEX IF NOT EXISTS idx_tools_sort_order ON tools(sort_order);

-- Insert sample data
INSERT INTO tools (name, description, category, pricing, tags, rating, url, affiliate_url, logo_url, is_new, sort_order) VALUES
  ('Opus Pro', 'Auto-clips your long videos into shorts with captions and hooks.', 'Video', 'Freemium', ARRAY['shorts', 'auto-edit', 'captions'], 4.7, 'https://www.opus.pro/', 'https://www.opus.pro/?ref=dantalksai', 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', false, 1),
  ('Vapi', 'Build voice/phone agents that actually talk to customers.', 'Agents', 'Paid', ARRAY['voice', 'phone', 'agents'], 4.6, 'https://vapi.ai/', 'https://vapi.ai/?ref=dantalksai', 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', true, 2),
  ('Screen Studio', 'Crisp screen recordings with buttery camera overlay.', 'Video', 'Paid', ARRAY['record', 'overlay', 'tutorials'], 4.8, 'https://www.screen.studio/', 'https://www.screen.studio/?ref=dantalksai', 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', false, 3),
  ('Riverside', 'Podcasts & interviews in studio quality from your browser.', 'Recording', 'Freemium', ARRAY['podcast', 'interview', 'remote'], 4.5, 'https://riverside.fm/', 'https://riverside.fm/?ref=dantalksai', 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', false, 4),
  ('Go High Level', 'All-in-one funnels, CRM, automations — resell your systems.', 'Marketing', 'Paid', ARRAY['crm', 'automation', 'funnels'], 4.4, 'https://www.gohighlevel.com/', 'https://www.gohighlevel.com/?ref=dantalksai', 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', false, 5);

-- Enable RLS (Row Level Security)
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access to active tools' AND tablename = 'tools'
  ) THEN
    CREATE POLICY "Allow public read access to active tools" ON tools
      FOR SELECT USING (is_active = true);
  END IF;
END $$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_tools_updated_at'
  ) THEN
    CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
