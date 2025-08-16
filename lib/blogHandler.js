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

export const getBlogPostBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.BLOG_POSTS)
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      return { success: false, error: 'Post not found', data: null }
    }

    return { success: true, data: data }
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return { success: false, error: error.message, data: null }
  }
}

export const createBlogPost = async (postData) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.BLOG_POSTS)
      .insert([postData])
      .select()

    if (error) {
      console.error('Error creating blog post:', error)
      throw error
    }

    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return { success: false, error: error.message, data: null }
  }
} 