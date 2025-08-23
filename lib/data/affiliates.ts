import { supabase, TABLES, TOOLS_FIELDS } from '../supabase'

export interface AffiliateTool {
  id: string
  name: string
  url: string
  category: string
  rank: number
  description: string
  pricing: string
  tags: string[]
  rating?: number
  affiliate_url: string
  logo_url?: string
  is_new?: boolean
  is_featured?: boolean
}

export interface AffiliateCategory {
  name: string
  tools: AffiliateTool[]
}

export interface AffiliatesData {
  categories: AffiliateCategory[]
  allTools: AffiliateTool[]
  featured: AffiliateTool[]
  newTools: AffiliateTool[]
}

// Cache with revalidation
let cache: {
  data: AffiliatesData | null
  timestamp: number
  revalidateAt: number
} = {
  data: null,
  timestamp: 0,
  revalidateAt: 0
}

const REVALIDATE_INTERVAL = 600 * 1000 // 600 seconds

export async function getAffiliates(): Promise<AffiliatesData> {
  const now = Date.now()
  
  // Return cached data if still valid
  if (cache.data && now < cache.revalidateAt) {
    return cache.data
  }

  try {
    // Fetch all active tools from Supabase
    const { data, error } = await supabase
      .from(TABLES.TOOLS)
      .select('*')
      .eq(TOOLS_FIELDS.IS_ACTIVE, true)
      .order(TOOLS_FIELDS.RATING, { ascending: false })

    if (error) {
      throw error
    }

    const tools: AffiliateTool[] = data || []
    
    // Group tools by category
    const categoryMap = new Map<string, AffiliateTool[]>()
    
    tools.forEach(tool => {
      const category = tool[TOOLS_FIELDS.CATEGORY] || 'Other'
      if (!categoryMap.has(category)) {
        categoryMap.set(category, [])
      }
      categoryMap.get(category)!.push({
        id: tool[TOOLS_FIELDS.ID],
        name: tool[TOOLS_FIELDS.NAME],
        url: tool[TOOLS_FIELDS.URL],
        category: tool[TOOLS_FIELDS.CATEGORY],
        rank: tool[TOOLS_FIELDS.RATING] || 0,
        description: tool[TOOLS_FIELDS.DESCRIPTION],
        pricing: tool[TOOLS_FIELDS.PRICING],
        tags: tool[TOOLS_FIELDS.TAGS] || [],
        rating: tool[TOOLS_FIELDS.RATING],
        affiliate_url: tool[TOOLS_FIELDS.AFFILIATE_URL],
        logo_url: tool[TOOLS_FIELDS.LOGO_URL],
        is_new: tool[TOOLS_FIELDS.IS_NEW],
        is_featured: tool[TOOLS_FIELDS.IS_FEATURED]
      })
    })

    // Sort tools within each category by rank
    const categories: AffiliateCategory[] = Array.from(categoryMap.entries())
      .map(([name, tools]) => ({
        name,
        tools: tools.sort((a, b) => b.rank - a.rank)
      }))
      .sort((a, b) => {
        // Sort categories by highest ranked tool
        const aMaxRank = Math.max(...a.tools.map(t => t.rank))
        const bMaxRank = Math.max(...b.tools.map(t => t.rank))
        return bMaxRank - aMaxRank
      })

    const result: AffiliatesData = {
      categories,
      allTools: tools,
      featured: tools.filter(tool => tool.is_featured).slice(0, 6),
      newTools: tools.filter(tool => tool.is_new).slice(0, 6)
    }

    // Update cache
    cache = {
      data: result,
      timestamp: now,
      revalidateAt: now + REVALIDATE_INTERVAL
    }

    return result
  } catch (error) {
    console.error('Error fetching affiliates data:', error)
    
    // Return cached data if available, even if stale
    if (cache.data) {
      return cache.data
    }
    
    // Return empty data structure
    return {
      categories: [],
      allTools: [],
      featured: [],
      newTools: []
    }
  }
}

// Get tools for a specific category
export async function getCategoryTools(category: string): Promise<AffiliateTool[]> {
  const data = await getAffiliates()
  const categoryData = data.categories.find(cat => 
    cat.name.toLowerCase() === category.toLowerCase()
  )
  return categoryData?.tools || []
}

// Get featured tools for hero display
export async function getFeaturedTools(): Promise<AffiliateTool[]> {
  const data = await getAffiliates()
  return data.featured
}

// Get new tools
export async function getNewTools(): Promise<AffiliateTool[]> {
  const data = await getAffiliates()
  return data.newTools
}

// Get tools by search query
export async function searchTools(query: string): Promise<AffiliateTool[]> {
  const data = await getAffiliates()
  const queryLower = query.toLowerCase()
  
  return data.allTools.filter(tool =>
    tool.name.toLowerCase().includes(queryLower) ||
    tool.description.toLowerCase().includes(queryLower) ||
    tool.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
    tool.category.toLowerCase().includes(queryLower)
  )
}

// Get tools for AI for page recommendations
export async function getToolsForTopic(topic: string): Promise<AffiliateTool[]> {
  const data = await getAffiliates()
  const topicLower = topic.toLowerCase()
  
  return data.allTools.filter(tool =>
    tool.name.toLowerCase().includes(topicLower) ||
    tool.description.toLowerCase().includes(topicLower) ||
    tool.tags.some(tag => tag.toLowerCase().includes(topicLower)) ||
    tool.category.toLowerCase().includes(topicLower)
  ).slice(0, 5) // Limit to 5 recommendations
}
