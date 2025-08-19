import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FormData {
  name: string
  businessFocus: string
  weeklyLeads: number
  aiAgent: string
  monthlyBudget: string
}

interface RateLimitData {
  count: number
  resetTime: number
}

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, RateLimitData>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(ip)
  
  if (!limit) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return false
  }
  
  if (now > limit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 })
    return false
  }
  
  if (limit.count >= 5) { // Max 5 submissions per minute
    return true
  }
  
  limit.count++
  return false
}

function validateFormData(data: FormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  
  if (!data.businessFocus || data.businessFocus.trim().length < 3) {
    errors.push('Business focus must be at least 3 characters long')
  }
  
  if (!data.weeklyLeads || data.weeklyLeads < 1 || data.weeklyLeads > 1000) {
    errors.push('Weekly leads must be between 1 and 1000')
  }
  
  if (!data.aiAgent || !['yes', 'no'].includes(data.aiAgent)) {
    errors.push('AI agent preference must be yes or no')
  }
  
  if (!data.monthlyBudget || !['<$100', '$100-$500', '$500-$2K', '$2K+'].includes(data.monthlyBudget)) {
    errors.push('Invalid budget range selected')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

function enrichFormData(data: FormData): any {
  return {
    ...data,
    created_at: new Date().toISOString(),
    ip_address: '', // Will be set by the client
    user_agent: '', // Will be set by the client
    lead_score: calculateLeadScore(data),
    estimated_roi: calculateEstimatedROI(data),
    recommended_package: getRecommendedPackage(data)
  }
}

function calculateLeadScore(data: FormData): number {
  let score = 50 // Base score
  
  // Business focus scoring
  const highValueBusinesses = ['real estate', 'consulting', 'coaching', 'fitness', 'healthcare', 'legal']
  if (highValueBusinesses.some(business => data.businessFocus.toLowerCase().includes(business))) {
    score += 20
  }
  
  // Weekly leads scoring
  if (data.weeklyLeads >= 20) score += 15
  else if (data.weeklyLeads >= 10) score += 10
  else if (data.weeklyLeads >= 5) score += 5
  
  // Budget scoring
  if (data.monthlyBudget === '$2K+') score += 15
  else if (data.monthlyBudget === '$500-$2K') score += 10
  else if (data.monthlyBudget === '$100-$500') score += 5
  
  // AI agent preference
  if (data.aiAgent === 'yes') score += 10
  
  return Math.min(score, 100)
}

function calculateEstimatedROI(data: FormData): string {
  const baseROI = data.weeklyLeads * 0.3 * 12 // Assuming 30% conversion rate
  if (baseROI > 10000) return '$10K+ annually'
  if (baseROI > 5000) return '$5K-10K annually'
  if (baseROI > 2000) return '$2K-5K annually'
  return '$1K-2K annually'
}

function getRecommendedPackage(data: FormData): string {
  if (data.monthlyBudget === '$2K+' && data.weeklyLeads >= 20) {
    return 'Enterprise AI Suite'
  } else if (data.monthlyBudget === '$500-$2K' || data.weeklyLeads >= 10) {
    return 'Professional AI System'
  } else {
    return 'Starter AI Package'
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limiting
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a minute.' 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const formData: FormData = await req.json()
    
    // Validate form data
    const validation = validateFormData(formData)
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          details: validation.errors 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Enrich form data with analytics
    const enrichedData = enrichFormData(formData)
    
    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Insert into database
    const { data, error } = await supabase
      .from('form_responses')
      .insert([enrichedData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save form data' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Return success response with enriched data
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: data.id,
          lead_score: enrichedData.lead_score,
          estimated_roi: enrichedData.estimated_roi,
          recommended_package: enrichedData.recommended_package,
          message: `Thank you ${formData.name}! Your AI system is being designed.`
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
