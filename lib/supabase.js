import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://prxioffyzjmygsliuabt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeGlvZmZ5emJteWdzbGl1YWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MzUyNDksImV4cCI6MjA3MDAxMTI0OX0.7DvL23VV5yvySRRJ92-XSjk6ECBxzSuYrjQ9HK9Da2w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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