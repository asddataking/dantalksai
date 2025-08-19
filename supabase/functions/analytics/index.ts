import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalyticsQuery {
  period?: 'day' | 'week' | 'month' | 'year'
  startDate?: string
  endDate?: string
  groupBy?: 'hour' | 'day' | 'week' | 'month'
}

interface FormAnalytics {
  total_submissions: number
  conversion_rate: number
  average_lead_score: number
  top_business_categories: Array<{ category: string; count: number }>
  budget_distribution: Array<{ budget: string; count: number; percentage: number }>
  ai_agent_preference: { yes: number; no: number }
  weekly_trends: Array<{ date: string; submissions: number }>
  roi_estimates: {
    total_estimated_roi: string
    average_roi_per_lead: string
    high_value_leads: number
  }
}

interface BlogAnalytics {
  total_posts: number
  total_views: number
  average_read_time: number
  top_categories: Array<{ category: string; count: number; views: number }>
  popular_posts: Array<{ title: string; views: number; read_time: number }>
  engagement_metrics: {
    average_comments: number
    average_shares: number
    bounce_rate: number
  }
}

interface SystemMetrics {
  uptime: number
  response_time: number
  cache_hit_rate: number
  active_users: number
  database_connections: number
}

function calculateFormAnalytics(data: any[], period: string): FormAnalytics {
  const total = data.length
  const now = new Date()
  const periodStart = getPeriodStart(now, period)
  
  // Filter data by period
  const periodData = data.filter(item => new Date(item.created_at) >= periodStart)
  
  // Calculate lead scores
  const leadScores = periodData.map(item => item.lead_score || 50)
  const averageLeadScore = leadScores.length > 0 ? 
    Math.round(leadScores.reduce((a, b) => a + b, 0) / leadScores.length) : 0
  
  // Business categories
  const categories = periodData.reduce((acc, item) => {
    const category = item.business_focus?.toLowerCase() || 'other'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const topCategories = Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }))
  
  // Budget distribution
  const budgets = periodData.reduce((acc, item) => {
    const budget = item.monthly_budget || 'unknown'
    acc[budget] = (acc[budget] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const budgetDistribution = Object.entries(budgets).map(([budget, count]) => ({
    budget,
    count,
    percentage: Math.round((count / total) * 100)
  }))
  
  // AI agent preference
  const aiPreferences = periodData.reduce((acc, item) => {
    if (item.ai_agent === 'yes') acc.yes++
    else acc.no++
    return acc
  }, { yes: 0, no: 0 })
  
  // Weekly trends
  const weeklyTrends = getWeeklyTrends(periodData, period)
  
  // ROI estimates
  const roiEstimates = calculateROIEstimates(periodData)
  
  return {
    total_submissions: total,
    conversion_rate: total > 0 ? Math.round((periodData.length / total) * 100) : 0,
    average_lead_score: averageLeadScore,
    top_business_categories: topCategories,
    budget_distribution: budgetDistribution,
    ai_agent_preference: aiPreferences,
    weekly_trends: weeklyTrends,
    roi_estimates: roiEstimates
  }
}

function getPeriodStart(now: Date, period: string): Date {
  const start = new Date(now)
  switch (period) {
    case 'day':
      start.setHours(0, 0, 0, 0)
      break
    case 'week':
      start.setDate(start.getDate() - 7)
      break
    case 'month':
      start.setMonth(start.getMonth() - 1)
      break
    case 'year':
      start.setFullYear(start.getFullYear() - 1)
      break
  }
  return start
}

function getWeeklyTrends(data: any[], period: string): Array<{ date: string; submissions: number }> {
  const trends: Record<string, number> = {}
  const now = new Date()
  
  // Generate date range
  const days = period === 'week' ? 7 : period === 'month' ? 30 : 365
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    trends[dateStr] = 0
  }
  
  // Count submissions per day
  data.forEach(item => {
    const dateStr = new Date(item.created_at).toISOString().split('T')[0]
    if (trends[dateStr] !== undefined) {
      trends[dateStr]++
    }
  })
  
  return Object.entries(trends).map(([date, submissions]) => ({
    date,
    submissions
  }))
}

function calculateROIEstimates(data: any[]): { total_estimated_roi: string; average_roi_per_lead: string; high_value_leads: number } {
  let totalROI = 0
  let highValueLeads = 0
  
  data.forEach(item => {
    const weeklyLeads = item.weekly_leads || 0
    const estimatedROI = weeklyLeads * 0.3 * 12 * 100 // Assuming $100 average value per conversion
    totalROI += estimatedROI
    
    if (estimatedROI > 5000) highValueLeads++
  })
  
  const averageROI = data.length > 0 ? totalROI / data.length : 0
  
  return {
    total_estimated_roi: `$${Math.round(totalROI / 1000)}K+`,
    average_roi_per_lead: `$${Math.round(averageROI)}`,
    high_value_leads: highValueLeads
  }
}

function calculateBlogAnalytics(posts: any[]): BlogAnalytics {
  const totalPosts = posts.length
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0)
  const averageReadTime = posts.length > 0 ? 
    Math.round(posts.reduce((sum, post) => sum + (post.read_time || 0), 0) / posts.length) : 0
  
  // Categories
  const categories = posts.reduce((acc, post) => {
    const category = post.category || 'uncategorized'
    if (!acc[category]) {
      acc[category] = { count: 0, views: 0 }
    }
    acc[category].count++
    acc[category].views += post.views || 0
    return acc
  }, {} as Record<string, { count: number; views: number }>)
  
  const topCategories = Object.entries(categories)
    .sort(([,a], [,b]) => b.views - a.views)
    .slice(0, 5)
    .map(([category, data]) => ({ category, ...data }))
  
  // Popular posts
  const popularPosts = posts
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)
    .map(post => ({
      title: post.title,
      views: post.views || 0,
      read_time: post.read_time || 0
    }))
  
  return {
    total_posts: totalPosts,
    total_views: totalViews,
    average_read_time: averageReadTime,
    top_categories: topCategories,
    popular_posts: popularPosts,
    engagement_metrics: {
      average_comments: 0, // Would need comments table
      average_shares: 0,   // Would need tracking
      bounce_rate: 0       // Would need analytics
    }
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse query parameters
    const url = new URL(req.url)
    const query: AnalyticsQuery = {
      period: (url.searchParams.get('period') as any) || 'month',
      startDate: url.searchParams.get('startDate') || undefined,
      endDate: url.searchParams.get('endDate') || undefined,
      groupBy: (url.searchParams.get('groupBy') as any) || 'day'
    }
    
    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Fetch form responses
    const { data: formData, error: formError } = await supabase
      .from('form_responses')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (formError) {
      console.error('Form data error:', formError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch form data' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Fetch blog posts
    const { data: blogData, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (blogError) {
      console.error('Blog data error:', blogError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch blog data' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    // Calculate analytics
    const formAnalytics = calculateFormAnalytics(formData || [], query.period)
    const blogAnalytics = calculateBlogAnalytics(blogData || [])
    
    // System metrics (mock data for now)
    const systemMetrics: SystemMetrics = {
      uptime: 99.9,
      response_time: 150,
      cache_hit_rate: 85,
      active_users: formData?.length || 0,
      database_connections: 5
    }
    
    // Return analytics
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          form_analytics: formAnalytics,
          blog_analytics: blogAnalytics,
          system_metrics: systemMetrics,
          period: query.period,
          generated_at: new Date().toISOString()
        }
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
