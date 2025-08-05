import { supabase, TABLES } from './supabase'

export const getBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.BLOG_POSTS)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return { success: false, error: error.message, data: [] }
  }
} 