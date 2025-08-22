#!/usr/bin/env node

/**
 * RSS Feed Update Script for Dan Talks AI
 * 
 * This script fetches RSS feeds from various AI sources and updates the Supabase ai_news table.
 * Can be run manually or set up as a cron job to run hourly.
 * 
 * Usage:
 * - Manual: node scripts/update-rss-feeds.js
 * - Cron: 0 * * * * cd /path/to/dantalksai && node scripts/update-rss-feeds.js
 */

const { createClient } = require('@supabase/supabase-js')
const Parser = require('rss-parser')
const parser = new Parser()

// RSS feed sources
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
  }
]

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
  console.error('SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'Set' : 'Missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchRSSFeed(source) {
  try {
    console.log(`Fetching RSS feed from ${source.name}...`)
    const feed = await parser.parseURL(source.url)
    
    const items = feed.items.slice(0, 5).map(item => ({
      title: item.title,
      summary: item.contentSnippet || item.content?.substring(0, 200) || 'No summary available',
      url: item.link,
      source: source.name,
      tags: source.tags,
      published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      is_featured: false,
      is_active: true
    }))
    
    console.log(`  Found ${items.length} items from ${source.name}`)
    return items
  } catch (error) {
    console.error(`  Error fetching ${source.name}:`, error.message)
    return []
  }
}

async function updateNewsTable(newsItems) {
  try {
    console.log(`Updating Supabase ai_news table with ${newsItems.length} items...`)
    
    // Check for existing items to avoid duplicates
    const existingUrls = newsItems.map(item => item.url)
    const { data: existing } = await supabase
      .from('ai_news')
      .select('url')
      .in('url', existingUrls)
    
    const existingUrlsSet = new Set(existing?.map(item => item.url) || [])
    const newItems = newsItems.filter(item => !existingUrlsSet.has(item.url))
    
    if (newItems.length === 0) {
      console.log('  No new items to add')
      return
    }
    
    // Insert new items
    const { data, error } = await supabase
      .from('ai_news')
      .insert(newItems)
    
    if (error) {
      throw error
    }
    
    console.log(`  Successfully added ${newItems.length} new items`)
    
    // Mark one item as featured (rotate weekly)
    if (newItems.length > 0) {
      const featuredItem = newItems[0]
      const { error: updateError } = await supabase
        .from('ai_news')
        .update({ is_featured: true })
        .eq('url', featuredItem.url)
      
      if (updateError) {
        console.error('  Error marking item as featured:', updateError.message)
      } else {
        console.log(`  Marked "${featuredItem.title}" as featured`)
      }
    }
    
  } catch (error) {
    console.error('  Error updating news table:', error.message)
  }
}

async function cleanupOldNews() {
  try {
    console.log('Cleaning up old news items...')
    
    // Keep only the last 50 items
    const { error } = await supabase
      .from('ai_news')
      .delete()
      .lt('id', (
        await supabase
          .from('ai_news')
          .select('id')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()
      ).data?.id - 50)
    
    if (error) {
      console.error('  Error cleaning up old news:', error.message)
    } else {
      console.log('  Cleaned up old news items')
    }
  } catch (error) {
    console.error('  Error during cleanup:', error.message)
  }
}

async function main() {
  console.log('🚀 Starting RSS feed update...')
  console.log(`📅 ${new Date().toISOString()}`)
  console.log('')
  
  try {
    // Fetch all RSS feeds
    const allNews = []
    for (const source of RSS_SOURCES) {
      const items = await fetchRSSFeed(source)
      allNews.push(...items)
      
      // Small delay to be respectful to RSS servers
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    console.log('')
    console.log(`📊 Total items found: ${allNews.length}`)
    
    if (allNews.length > 0) {
      // Update the database
      await updateNewsTable(allNews)
      
      // Clean up old items
      await cleanupOldNews()
    }
    
    console.log('')
    console.log('✅ RSS feed update completed successfully!')
    
  } catch (error) {
    console.error('❌ RSS feed update failed:', error.message)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = { main, fetchRSSFeed, updateNewsTable }
