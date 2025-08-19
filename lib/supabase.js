import { createClient } from '@supabase/supabase-js'

// Check if environment variables are properly set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set (length: ' + supabaseAnonKey.length + ')' : 'Missing')
  
  if (typeof window !== 'undefined') {
    console.error('This will cause Supabase operations to fail in the browser')
  }
} else {
  console.log('Supabase environment variables loaded successfully:')
  console.log('URL:', supabaseUrl)
  console.log('Key length:', supabaseAnonKey.length)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Test the connection
if (typeof window !== 'undefined') {
  console.log('Supabase client created, testing connection...')
  // Test the connection by making a simple query
  supabase.from('blog_posts').select('count', { count: 'exact', head: true })
    .then(({ count, error }) => {
      if (error) {
        console.error('Supabase connection test failed:', error)
      } else {
        console.log('Supabase connection test successful, blog_posts table accessible')
      }
    })
    .catch(err => {
      console.error('Supabase connection test error:', err)
    })
}

// Database table schemas
export const TABLES = {
  FORM_RESPONSES: 'form_responses',
  BLOG_POSTS: 'blog_posts',
  YOUTUBE_CONFIG: 'youtube_config'
}

// Form response types
export const FORM_FIELDS = {
  BUSINESS_FOCUS: 'business_focus',
  WEEKLY_LEADS: 'weekly_leads',
  AI_AGENT: 'ai_agent',
  MONTHLY_BUDGET: 'monthly_budget',
  CREATED_AT: 'created_at'
}

// Blog post types
export const BLOG_FIELDS = {
  TITLE: 'title',
  SLUG: 'slug',
  SNIPPET: 'snippet',
  CONTENT: 'content',
  FEATURED_IMAGE: 'featured_image',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at'
}

// YouTube configuration types
export const YOUTUBE_CONFIG_FIELDS = {
  API_KEY: 'api_key',
  CHANNEL_ID: 'channel_id',
  UPDATED_AT: 'updated_at'
} 