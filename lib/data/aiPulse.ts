import { supabase, TABLES, AI_NEWS_FIELDS } from '../supabase'

export interface PulseItem {
  id: string
  title: string
  summary: string
  url: string
  source: string
  tags: string[]
  is_featured: boolean
  published_at: string
  created_at: string
}

export interface PulseData {
  featured: PulseItem[]
  latest: PulseItem[]
  trending: string[]
  allItems: PulseItem[]
}

// Cache with revalidation
let cache: {
  data: PulseData | null
  timestamp: number
  revalidateAt: number
} = {
  data: null,
  timestamp: 0,
  revalidateAt: 0
}

const REVALIDATE_INTERVAL = 600 * 1000 // 600 seconds

export async function getAIPulse(): Promise<PulseData> {
  const now = Date.now()
  
  // Return cached data if still valid
  if (cache.data && now < cache.revalidateAt) {
    return cache.data
  }

  try {
    // Fetch fresh data from Supabase
    const { data, error } = await supabase
      .from(TABLES.AI_NEWS)
      .select('*')
      .eq(AI_NEWS_FIELDS.IS_ACTIVE, true)
      .order(AI_NEWS_FIELDS.PUBLISHED_AT, { ascending: false })
      .limit(20)

    if (error) {
      throw error
    }

    const pulseItems: PulseItem[] = data || []
    
    // Extract trending topics from tags
    const allTags = pulseItems.flatMap(item => item[AI_NEWS_FIELDS.TAGS] || [])
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const trending = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag)

    const result: PulseData = {
      featured: pulseItems.filter(item => item[AI_NEWS_FIELDS.IS_FEATURED]),
      latest: pulseItems.filter(item => !item[AI_NEWS_FIELDS.IS_FEATURED]).slice(0, 15),
      trending,
      allItems: pulseItems
    }

    // Update cache
    cache = {
      data: result,
      timestamp: now,
      revalidateAt: now + REVALIDATE_INTERVAL
    }

    return result
  } catch (error) {
    console.error('Error fetching AI Pulse data:', error)
    
    // Return cached data if available, even if stale
    if (cache.data) {
      return cache.data
    }
    
    // Return empty data structure
    return {
      featured: [],
      latest: [],
      trending: [],
      allItems: []
    }
  }
}

// Get limited items for hero display (1-2 items max)
export async function getHeroPulse(): Promise<PulseItem[]> {
  const data = await getAIPulse()
  return data.featured.slice(0, 2)
}

// Get trending topics for search chips
export async function getTrendingTopics(): Promise<string[]> {
  const data = await getAIPulse()
  return data.trending.slice(0, 6)
}

// Check if a topic has a matching AI for page
export async function checkTopicExists(slug: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('ai_for_topics')
      .select('slug')
      .eq('slug', slug)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error
    }

    return !!data
  } catch (error) {
    console.error('Error checking topic existence:', error)
    return false
  }
}

// Create placeholder AI for topic
export async function createPlaceholderTopic(slug: string, query: string): Promise<void> {
  try {
    const topic = slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')

    const { error } = await supabase
      .from('ai_for_topics')
      .insert({
        slug,
        query_raw: query,
        topic,
        tools: [],
        explainer: `Yes—there are useful AI tools for ${topic.toLowerCase()}. Here's how I'd approach it in the real world, plus a few tools I actually use or recommend.`,
        faqs: [
          {
            q: `What AI tools work best for ${topic.toLowerCase()}?`,
            a: `For ${topic.toLowerCase()}, I recommend starting with ChatGPT for general tasks, then adding specialized tools based on your specific needs. The key is to start simple and build up.`
          },
          {
            q: `How much should I expect to spend on AI tools for ${topic.toLowerCase()}?`,
            a: `Most AI tools range from $10-50/month. Start with free tiers to test, then upgrade as you see results. The ROI usually justifies the investment within 1-2 months.`
          }
        ],
        search_count: 1
      })

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error creating placeholder topic:', error)
  }
}

// Get latest pulse items for a specific topic
export async function getTopicPulse(topic: string): Promise<PulseItem[]> {
  const data = await getAIPulse()
  const topicLower = topic.toLowerCase()
  
  return data.allItems.filter(item => 
    item[AI_NEWS_FIELDS.TAGS]?.some(tag => 
      tag.toLowerCase().includes(topicLower)
    ) ||
    item[AI_NEWS_FIELDS.TITLE].toLowerCase().includes(topicLower) ||
    item[AI_NEWS_FIELDS.SUMMARY].toLowerCase().includes(topicLower)
  ).slice(0, 3)
}
