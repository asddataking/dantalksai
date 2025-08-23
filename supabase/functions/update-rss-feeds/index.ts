import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// RSS feed sources with real URLs
const RSS_SOURCES = [
  {
    name: 'OpenAI',
    url: 'https://openai.com/blog/rss.xml',
    tags: ['OpenAI', 'GPT', 'AI', 'Research']
  },
  {
    name: 'Anthropic',
    url: 'https://www.anthropic.com/news/rss.xml',
    tags: ['Anthropic', 'Claude', 'AI', 'Research']
  },
  {
    name: 'Hugging Face',
    url: 'https://huggingface.co/blog/feed.xml',
    tags: ['Hugging Face', 'Open Source', 'LLM', 'AI']
  },
  {
    name: 'Google DeepMind',
    url: 'https://deepmind.com/blog/feed/basic/',
    tags: ['DeepMind', 'Research', 'AI', 'Machine Learning']
  },
  {
    name: 'Microsoft AI',
    url: 'https://blogs.microsoft.com/ai/feed/',
    tags: ['Microsoft', 'AI', 'Copilot', 'Productivity']
  },
  {
    name: 'Meta AI',
    url: 'https://ai.meta.com/blog/rss/',
    tags: ['Meta AI', 'Research', 'Multimodal', 'AI']
  },
  {
    name: 'Stability AI',
    url: 'https://stability.ai/news/rss',
    tags: ['Stability AI', 'Generation', 'AI', 'Creative']
  },
  {
    name: 'NVIDIA AI',
    url: 'https://blogs.nvidia.com/blog/category/ai/feed/',
    tags: ['NVIDIA', 'Infrastructure', 'Training', 'AI']
  },
  // Add some more reliable RSS sources
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/tag/artificial-intelligence/feed/',
    tags: ['TechCrunch', 'AI', 'News', 'Technology']
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/',
    tags: ['VentureBeat', 'AI', 'Business', 'Technology']
  }
]

// Parse RSS feed content
async function parseRSSFeed(url: string): Promise<any[]> {
  try {
    console.log(`Fetching RSS feed from: ${url}`)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const text = await response.text()
    console.log(`RSS feed response length: ${text.length} characters`)
    console.log(`RSS feed first 200 chars: ${text.substring(0, 200)}`)
    
    const articles = []
    
    // Parse RSS items using regex (more reliable in Deno)
    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi
    const entryRegex = /<entry[^>]*>([\s\S]*?)<\/entry>/gi
    
    // Try RSS format first
    let matches = text.match(itemRegex)
    if (matches) {
      console.log(`Found ${matches.length} RSS items using regex`)
      
      for (const item of matches) {
        const title = extractTagContent(item, 'title')
        const description = extractTagContent(item, 'description')
        const link = extractTagContent(item, 'link')
        const pubDate = extractTagContent(item, 'pubDate')
        
        console.log(`Processing RSS item - Title: "${title}", Link: "${link}"`)
        
        if (title && link) {
          articles.push({
            title,
            description: description || '',
            link,
            pubDate: pubDate ? new Date(pubDate) : new Date()
          })
        }
      }
    }
    
    // Try Atom format if no RSS items found
    if (articles.length === 0) {
      matches = text.match(entryRegex)
      if (matches) {
        console.log(`Found ${matches.length} Atom entries using regex`)
        
        for (const entry of matches) {
          const title = extractTagContent(entry, 'title')
          const summary = extractTagContent(entry, 'summary')
          const link = extractLinkHref(entry)
          const published = extractTagContent(entry, 'published')
          
          console.log(`Processing Atom entry - Title: "${title}", Link: "${link}"`)
          
          if (title && link) {
            articles.push({
              title,
              description: summary || '',
              link,
              pubDate: published ? new Date(published) : new Date()
            })
          }
        }
      }
    }
    
    console.log(`Total processed articles: ${articles.length}`)
    
    // Increase limit to get more articles per source
    return articles.slice(0, 10) // Limit to 10 most recent articles per source
  } catch (error) {
    console.error(`Error parsing RSS feed ${url}:`, error)
    return []
  }
}

// Helper function to extract tag content
function extractTagContent(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

// Helper function to extract link href attribute
function extractLinkHref(xml: string): string {
  const regex = /<link[^>]*href=["']([^"']*)["'][^>]*>/i
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

// Generate AI summary using a simple template (you can enhance this later)
function generateSummary(title: string, description: string, source: string): string {
  const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 200)
  return `${source} has published new content: ${title}. ${cleanDescription}${cleanDescription.length >= 200 ? '...' : ''}`
}

// Update the ai_news table
async function updateNewsTable(supabase: any, newsItems: any[], source: any) {
  try {
    // Check for existing items to avoid duplicates
    const existingUrls = newsItems.map(item => item.link)
    const { data: existing } = await supabase
      .from('ai_news')
      .select('url')
      .in('url', existingUrls)
    
    const existingUrlsSet = new Set(existing?.map((item: any) => item.url) || [])
    const newItems = newsItems.filter(item => !existingUrlsSet.has(item.link))
    
    if (newItems.length === 0) {
      console.log(`No new items for ${source.name}`)
      return
    }
    
    // Prepare items for insertion
    const itemsToInsert = newItems.map(item => ({
      title: item.title,
      summary: generateSummary(item.title, item.description, source.name),
      url: item.link,
      source: source.name,
      tags: source.tags,
      is_featured: false,
      is_active: true,
      published_at: item.pubDate,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))
    
    // Insert new items
    const { data, error } = await supabase
      .from('ai_news')
      .insert(itemsToInsert)
    
    if (error) {
      throw error
    }
    
    console.log(`Successfully added ${newItems.length} new items from ${source.name}`)
    
    // Mark one new item as featured (rotate weekly)
    if (newItems.length > 0) {
      const featuredItem = newItems[0]
      await supabase
        .from('ai_news')
        .update({ is_featured: true })
        .eq('url', featuredItem.link)
    }
    
  } catch (error) {
    console.error(`Error updating news table for ${source.name}:`, error)
  }
}

// Clean up old news items
async function cleanupOldNews(supabase: any) {
  try {
    // Keep only the last 100 items
    const { data: oldestItems } = await supabase
      .from('ai_news')
      .select('id')
      .order('created_at', { ascending: true })
      .limit(100)
    
    if (oldestItems && oldestItems.length >= 100) {
      const cutoffId = oldestItems[oldestItems.length - 1].id
      
      const { error } = await supabase
        .from('ai_news')
        .delete()
        .lt('id', cutoffId)
      
      if (error) {
        console.error('Error cleaning up old news:', error)
      } else {
        console.log('Cleaned up old news items')
      }
    }
  } catch (error) {
    console.error('Error during cleanup:', error)
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    console.log('🚀 Starting RSS feed update...')
    
    // Process each RSS source
    for (const source of RSS_SOURCES) {
      try {
        console.log(`Processing ${source.name}...`)
        const articles = await parseRSSFeed(source.url)
        
        console.log(`${source.name}: Found ${articles.length} articles`)
        
        if (articles.length > 0) {
          await updateNewsTable(supabase, articles, source)
        } else {
          console.log(`No articles found for ${source.name}`)
        }
        
        // Small delay between sources to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (error) {
        console.error(`Error processing ${source.name}:`, error)
        continue // Continue with other sources even if one fails
      }
    }
    
    // Clean up old news
    await cleanupOldNews(supabase)
    
    console.log('✅ RSS feed update completed successfully')
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'RSS feeds updated successfully',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
    
  } catch (error) {
    console.error('❌ RSS feed update failed:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
