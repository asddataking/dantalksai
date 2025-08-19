import { supabase, TABLES } from './supabase'

export const getBlogPosts = async () => {
  try {
    // Check if Supabase client is properly configured
    if (!supabase) {
      console.error('Supabase client is not initialized')
      return { success: false, error: 'Supabase client not initialized', data: [] }
    }

    console.log('Attempting to fetch blog posts from Supabase...')
    
    const { data, error } = await supabase
      .from(TABLES.BLOG_POSTS)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Supabase error fetching blog posts:', error)
      throw error
    }

    console.log('Successfully fetched blog posts:', data?.length || 0, 'posts')
    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return { success: false, error: error.message, data: [] }
  }
}

export const getAllBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.BLOG_POSTS)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all blog posts:', error)
      throw error
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Failed to fetch all blog posts:', error)
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
    // Validate required fields
    if (!postData.title || !postData.slug || !postData.snippet || !postData.content) {
      return { 
        success: false, 
        error: 'Missing required fields: title, slug, snippet, and content are required' 
      }
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(postData.slug)) {
      return { 
        success: false, 
        error: 'Invalid slug format. Use only lowercase letters, numbers, and hyphens' 
      }
    }

    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from(TABLES.BLOG_POSTS)
      .select('id')
      .eq('slug', postData.slug)
      .single()

    if (existingPost) {
      return { 
        success: false, 
        error: 'A blog post with this slug already exists. Please choose a different slug.' 
      }
    }

    // Prepare data for insertion
    const insertData = {
      title: postData.title.trim(),
      slug: postData.slug.trim(),
      snippet: postData.snippet.trim(),
      content: postData.content.trim(),
      featured_image: postData.featured_image || null,
      created_at: postData.created_at || new Date().toISOString(),
      updated_at: postData.updated_at || new Date().toISOString()
    }

    const { data, error } = await supabase
      .from(TABLES.BLOG_POSTS)
      .insert([insertData])
      .select()

    if (error) {
      console.error('Error creating blog post:', error)
      return { 
        success: false, 
        error: error.message || 'Failed to create blog post' 
      }
    }

    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    }
  }
}

export const deleteBlogPost = async (id) => {
  try {
    const { error } = await supabase
      .from(TABLES.BLOG_POSTS)
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting blog post:', error)
      return { 
        success: false, 
        error: error.message || 'Failed to delete blog post' 
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to delete blog post:', error)
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    }
  }
} 