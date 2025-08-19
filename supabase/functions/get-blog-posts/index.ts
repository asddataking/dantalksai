import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BlogQuery {
  page?: number
  limit?: number
  search?: string
  category?: string
  sortBy?: 'created_at' | 'title' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}

interface CacheEntry {
  data: any
  timestamp: number
  ttl: number
}

// Simple in-memory cache (in production, use Redis or similar)
const blogCache = new Map<string, CacheEntry>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCacheKey(query: BlogQuery): string {
  return `blog:${JSON.stringify(query)}`
}

function getFromCache(key: string): any | null {
  const entry = blogCache.get(key)
  if (!entry) return null
  
  if (Date.now() - entry.timestamp > entry.ttl) {
    blogCache.delete(key)
    return null
  }
  
  return entry.data
}

function setCache(key: string, data: any): void {
  blogCache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: CACHE_TTL
  })
}

function buildQuery(query: BlogQuery) {
  let supabaseQuery = supabase
    .from('blog_posts')
    .select('id, title, slug, snippet, featured_image, created_at, updated_at, category, read_time')
  
  // Apply search filter
  if (query.search) {
    supabaseQuery = supabaseQuery.or(`title.ilike.%${query.search}%,snippet.ilike.%${query.search}%`)
  }
  
  // Apply category filter
  if (query.category) {
    supabaseQuery = supabaseQuery.eq('category', query.category)
  }
  
  // Apply sorting
  const sortBy = query.sortBy || 'created_at'
  const sortOrder = query.sortOrder || 'desc'
  supabaseQuery = supabaseQuery.order(sortBy, { ascending: sortOrder === 'asc' })
  
  // Apply pagination
  const page = query.page || 1
  const limit = Math.min(query.limit || 10, 50) // Max 50 posts per request
  const from = (page - 1) * limit
  const to = from + limit - 1
  
  supabaseQuery = supabaseQuery.range(from, to)
  
  return supabaseQuery
}

function enrichBlogPosts(posts: any[]): any[] {
  return posts.map(post => ({
    ...post,
    estimated_read_time: post.read_time || Math.ceil(post.snippet.length / 200), // ~200 chars per minute
    excerpt: post.snippet.length > 150 ? post.snippet.substring(0, 150) + '...' : post.snippet,
    url: `/blog/${post.slug}`,
    formatted_date: new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    is_recent: Date.now() - new Date(post.created_at).getTime() < 7 * 24 * 60 * 60 * 1000 // 7 days
  }))
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse query parameters
    const url = new URL(req.url)
    const query: BlogQuery = {
      page: parseInt(url.searchParams.get('page') || '1'),
      limit: parseInt(url.searchParams.get('limit') || '10'),
      search: url.searchParams.get('search') || undefined,
      category: url.searchParams.get('category') || undefined,
      sortBy: (url.searchParams.get('sortBy') as any) || 'created_at',
      sortOrder: (url.searchParams.get('sortOrder') as any) || 'desc'
    }
    
    // Validate query parameters
    if (query.page < 1) query.page = 1
    if (query.limit < 1 || query.limit > 50) query.limit = 10
    
    // Check cache first
    const cacheKey = getCacheKey(query)
    const cachedData = getFromCache(cacheKey)
    
    if (cachedData) {
      return new Response(
        JSON.stringify({
          success: true,
          data: cachedData,
          cached: true,
          timestamp: new Date().toISOString()
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Build and execute query
    const supabaseQuery = buildQuery(query)
    const { data: posts, error, count } = await supabaseQuery
    
    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch blog posts' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Enrich blog posts with additional data
    const enrichedPosts = enrichBlogPosts(posts || [])
    
    // Prepare response data
    const responseData = {
      posts: enrichedPosts,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: count || enrichedPosts.length,
        pages: Math.ceil((count || enrichedPosts.length) / query.limit),
        hasNext: (query.page * query.limit) < (count || enrichedPosts.length),
        hasPrev: query.page > 1
      },
      meta: {
        search: query.search,
        category: query.category,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder
      }
    }
    
    // Cache the response
    setCache(cacheKey, responseData)
    
    // Return response
    return new Response(
      JSON.stringify({
        success: true,
        data: responseData,
        cached: false,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
