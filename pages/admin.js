import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getYouTubeConfig, updateYouTubeConfig } from '../lib/youtubeApi'
import { getFormResponses } from '../lib/formHandler'
import { getAllBlogPosts, createBlogPost, deleteBlogPost } from '../lib/blogHandler'
import { useAuth } from '../lib/authContext'
import ProtectedRoute from '../components/ProtectedRoute'
import { getImageUrl } from '../lib/storage'

export default function Admin() {
  const { user, signOut } = useAuth()
  const [youtubeConfig, setYoutubeConfig] = useState({ api_key: '', channel_id: '' })
  const [formResponses, setFormResponses] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    slug: '',
    snippet: '',
    content: '',
    featured_image: getImageUrl('Home/logo.png')
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    
    // Load YouTube config
    const configResult = await getYouTubeConfig()
    if (configResult.success) {
      setYoutubeConfig(configResult.data || { api_key: '', channel_id: '' })
    }

    // Load form responses
    const responsesResult = await getFormResponses()
    if (responsesResult.success) {
      setFormResponses(responsesResult.data || [])
    }

    // Load blog posts
    const blogResult = await getAllBlogPosts()
    if (blogResult.success) {
      setBlogPosts(blogResult.data || [])
    }

    setLoading(false)
  }

  const handleYouTubeConfigSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const result = await updateYouTubeConfig(youtubeConfig.api_key, youtubeConfig.channel_id)
    
    if (result.success) {
      setMessage('YouTube configuration updated successfully!')
    } else {
      setMessage(`Error: ${result.error}`)
    }

    setLoading(false)
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleDeleteBlogPost = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const result = await deleteBlogPost(id)
      
      if (result.success) {
        setMessage('Blog post deleted successfully!')
        loadData() // Reload blog posts
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleBlogPostSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // Generate slug from title if not provided
      if (!newBlogPost.slug) {
        newBlogPost.slug = generateSlug(newBlogPost.title)
      }

      // Validate slug format
      if (!/^[a-z0-9-]+$/.test(newBlogPost.slug)) {
        setMessage('Error: Invalid slug format. Use only lowercase letters, numbers, and hyphens.')
        setLoading(false)
        return
      }

      const result = await createBlogPost({
        ...newBlogPost,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      
      if (result.success) {
        setMessage('Blog post created successfully!')
        setNewBlogPost({
          title: '',
          slug: '',
          snippet: '',
          content: '',
          featured_image: getImageUrl('Home/logo.png')
        })
        loadData() // Reload blog posts
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>Admin Dashboard - Dan Talks AI</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        
        <main className="bg-black text-white min-h-screen font-['Inter'] p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header with User Info and Sign Out */}
            <div className="flex items-center justify-between mb-12">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-cyan-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Admin Dashboard
              </motion.h1>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Signed in as</p>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <motion.button
                  onClick={signOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Out
                </motion.button>
              </div>
            </div>

            {message && (
              <motion.div 
                className={`p-4 rounded-lg mb-6 ${
                  message.includes('Error') ? 'bg-red-900/50 border border-red-500' : 'bg-green-900/50 border border-green-500'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {message}
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* YouTube Configuration */}
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">YouTube Configuration</h2>
                
                <form onSubmit={handleYouTubeConfigSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">YouTube API Key</label>
                    <input
                      type="password"
                      value={youtubeConfig.api_key}
                      onChange={(e) => setYoutubeConfig(prev => ({ ...prev, api_key: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                      placeholder="Enter your YouTube API key"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Channel ID</label>
                    <input
                      type="text"
                      value={youtubeConfig.channel_id}
                      onChange={(e) => setYoutubeConfig(prev => ({ ...prev, channel_id: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                      placeholder="Enter your YouTube channel ID"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? 'Saving...' : 'Save Configuration'}
                  </motion.button>
                </form>
              </motion.div>

              {/* Form Responses */}
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Form Responses ({formResponses.length})</h2>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {formResponses.map((response, index) => (
                    <div key={index} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-cyan-400 font-semibold">Business:</span> {response.business_focus}
                        </div>
                        <div>
                          <span className="text-cyan-400 font-semibold">Leads:</span> {response.weekly_leads}
                        </div>
                        <div>
                          <span className="text-cyan-400 font-semibold">AI Agent:</span> {response.ai_agent}
                        </div>
                        <div>
                          <span className="text-cyan-400 font-semibold">Budget:</span> {response.monthly_budget}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(response.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  
                  {formResponses.length === 0 && (
                    <p className="text-gray-400 text-center py-8">No form responses yet.</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Blog Post Management */}
            <motion.div 
              className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-cyan-400">Blog Post Management</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create New Blog Post */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">Create New Blog Post</h3>
                  <form onSubmit={handleBlogPostSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                      <input
                        type="text"
                        value={newBlogPost.title}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Slug (optional - auto-generated)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newBlogPost.slug}
                          onChange={(e) => setNewBlogPost(prev => ({ ...prev, slug: e.target.value }))}
                          className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                          placeholder="blog-post-slug"
                        />
                        <button
                          type="button"
                          onClick={() => setNewBlogPost(prev => ({ ...prev, slug: generateSlug(prev.title) }))}
                          className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                          disabled={!newBlogPost.title}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Snippet/Excerpt</label>
                      <textarea
                        value={newBlogPost.snippet}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, snippet: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                        placeholder="Brief description of the blog post"
                        rows="3"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Content (HTML)</label>
                      <textarea
                        value={newBlogPost.content}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, content: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                        placeholder="<h1>Your HTML content here</h1>"
                        rows="8"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Featured Image URL</label>
                      <input
                        type="text"
                        value={newBlogPost.featured_image}
                        onChange={(e) => setNewBlogPost(prev => ({ ...prev, featured_image: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                        placeholder={getImageUrl('Home/logo.png')}
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? 'Creating...' : 'Create Blog Post'}
                    </motion.button>
                  </form>
                </div>

                {/* Existing Blog Posts */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white">Existing Blog Posts ({blogPosts.length})</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {blogPosts.map((post, index) => (
                      <div key={post.id || index} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-white">{post.title}</h4>
                          <button
                            onClick={() => handleDeleteBlogPost(post.id)}
                            className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded transition-colors"
                            title="Delete blog post"
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{post.snippet}</p>
                        <div className="text-xs text-gray-400">
                          <span>Slug: {post.slug}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                    
                    {blogPosts.length === 0 && (
                      <p className="text-gray-400 text-center py-8">No blog posts yet. Create your first one!</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </>
    </ProtectedRoute>
  )
} 