// Edge Functions Client Utility
const EDGE_FUNCTION_BASE = '/functions/v1'

export const edgeFunctions = {
  // Submit form with Edge Function optimization
  async submitForm(formData) {
    try {
      const response = await fetch(`${EDGE_FUNCTION_BASE}/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Form submission failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Edge function error:', error)
      throw error
    }
  },

  // Get blog posts with caching and search
  async getBlogPosts(options = {}) {
    try {
      const params = new URLSearchParams()
      if (options.page) params.append('page', options.page)
      if (options.limit) params.append('limit', options.limit)
      if (options.search) params.append('search', options.search)
      if (options.category) params.append('category', options.category)
      if (options.sortBy) params.append('sortBy', options.sortBy)
      if (options.sortOrder) params.append('sortOrder', options.sortOrder)

      const response = await fetch(`${EDGE_FUNCTION_BASE}/get-blog-posts?${params}`)
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch blog posts')
      }

      return await response.json()
    } catch (error) {
      console.error('Edge function error:', error)
      throw error
    }
  },

  // Get analytics data
  async getAnalytics(period = 'month') {
    try {
      const response = await fetch(`${EDGE_FUNCTION_BASE}/analytics?period=${period}`)
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch analytics')
      }

      return await response.json()
    } catch (error) {
      console.error('Edge function error:', error)
      throw error
    }
  }
}

// Migration helper - gradually replace old functions
export const migrateToEdgeFunctions = {
  // Replace submitFormResponse
  async submitFormResponse(formData) {
    console.log('Using Edge Function for form submission...')
    return await edgeFunctions.submitForm(formData)
  },

  // Replace getBlogPosts
  async getBlogPosts() {
    console.log('Using Edge Function for blog posts...')
    const result = await edgeFunctions.getBlogPosts()
    return {
      success: result.success,
      data: result.data.posts
    }
  }
}
