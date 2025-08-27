-- Create AI news table for RSS feeds
CREATE TABLE IF NOT EXISTS ai_news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  summary TEXT,
  url VARCHAR(1000) NOT NULL,
  source VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_ai_news_source ON ai_news(source);
CREATE INDEX IF NOT EXISTS idx_ai_news_published_at ON ai_news(published_at);
CREATE INDEX IF NOT EXISTS idx_ai_news_is_active ON ai_news(is_active);
CREATE INDEX IF NOT EXISTS idx_ai_news_is_featured ON ai_news(is_featured);

-- Insert sample AI news data
INSERT INTO ai_news (title, summary, url, source, tags, is_featured, published_at) VALUES
  ('OpenAI Releases GPT-4 Turbo with 128K Context Window', 'OpenAI has announced GPT-4 Turbo, featuring a massive 128K context window and improved performance across multiple modalities.', 'https://openai.com/blog/gpt-4-turbo', 'OpenAI', ARRAY['GPT-4', 'AI', 'Research'], true, NOW() - INTERVAL '2 hours'),
  ('Anthropic Introduces Claude 3.5 Sonnet with Enhanced Reasoning', 'Claude 3.5 Sonnet demonstrates significant improvements in reasoning, coding, and mathematical problem-solving capabilities.', 'https://anthropic.com/news/claude-3-5-sonnet', 'Anthropic', ARRAY['Claude', 'AI', 'Reasoning'], false, NOW() - INTERVAL '4 hours'),
  ('Hugging Face Launches New Open Source LLM Models', 'Hugging Face releases several new open-source language models with improved performance and efficiency.', 'https://huggingface.co/blog/new-models', 'Hugging Face', ARRAY['Open Source', 'LLM', 'AI'], false, NOW() - INTERVAL '6 hours'),
  ('Google DeepMind Announces Breakthrough in Protein Folding', 'DeepMind researchers achieve new milestone in protein structure prediction using advanced AI techniques.', 'https://deepmind.com/research/protein-folding', 'Google DeepMind', ARRAY['Research', 'Biology', 'AI'], false, NOW() - INTERVAL '8 hours'),
  ('Microsoft Integrates Copilot Across Office 365 Suite', 'Microsoft announces comprehensive integration of AI Copilot features across all Office 365 applications.', 'https://microsoft.com/copilot', 'Microsoft', ARRAY['Copilot', 'Office 365', 'Productivity'], false, NOW() - INTERVAL '10 hours'),
  ('Meta Releases New AI Research on Multimodal Learning', 'Meta AI researchers publish findings on improved multimodal learning approaches combining text, image, and audio.', 'https://ai.meta.com/research', 'Meta AI', ARRAY['Research', 'Multimodal', 'AI'], false, NOW() - INTERVAL '12 hours'),
  ('Stability AI Launches New Text-to-Video Model', 'Stability AI introduces advanced text-to-video generation with improved quality and consistency.', 'https://stability.ai/video', 'Stability AI', ARRAY['Video', 'Generation', 'AI'], false, NOW() - INTERVAL '14 hours'),
  ('NVIDIA Announces New AI Training Infrastructure', 'NVIDIA reveals next-generation AI training infrastructure designed for large-scale model development.', 'https://nvidia.com/ai-infrastructure', 'NVIDIA', ARRAY['Infrastructure', 'Training', 'AI'], false, NOW() - INTERVAL '16 hours');

-- Enable RLS (Row Level Security)
ALTER TABLE ai_news ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access to active AI news' AND tablename = 'ai_news'
  ) THEN
    CREATE POLICY "Allow public read access to active AI news" ON ai_news
      FOR SELECT USING (is_active = true);
  END IF;
END $$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ai_news_updated_at()
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
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_ai_news_updated_at'
  ) THEN
    CREATE TRIGGER update_ai_news_updated_at BEFORE UPDATE ON ai_news
      FOR EACH ROW EXECUTE FUNCTION update_ai_news_updated_at();
  END IF;
END $$;
