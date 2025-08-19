import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase, TABLES, TOOLS_FIELDS } from '../../lib/supabase'

export default function AdminTools() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingTool, setEditingTool] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    pricing: '',
    tags: '',
    rating: 0,
    url: '',
    affiliate_url: '',
    logo_url: '',
    is_new: false,
    is_active: true,
    sort_order: 0
  })

  useEffect(() => {
    fetchTools()
  }, [])

  async function fetchTools() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.TOOLS)
        .select('*')
        .order(TOOLS_FIELDS.SORT_ORDER, { ascending: true })

      if (error) throw error
      setTools(data || [])
    } catch (error) {
      console.error('Error fetching tools:', error)
      alert('Error fetching tools: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      const toolData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        rating: parseFloat(formData.rating),
        sort_order: parseInt(formData.sort_order)
      }

      if (editingTool) {
        // Update existing tool
        const { error } = await supabase
          .from(TABLES.TOOLS)
          .update(toolData)
          .eq(TOOLS_FIELDS.ID, editingTool[TOOLS_FIELDS.ID])

        if (error) throw error
        alert('Tool updated successfully!')
      } else {
        // Create new tool
        const { error } = await supabase
          .from(TABLES.TOOLS)
          .insert([toolData])

        if (error) throw error
        alert('Tool created successfully!')
      }

      // Reset form and refresh
      setEditingTool(null)
      setFormData({
        name: '',
        description: '',
        category: '',
        pricing: '',
        tags: '',
        rating: 0,
        url: '',
        affiliate_url: '',
        logo_url: '',
        is_new: false,
        is_active: true,
        sort_order: 0
      })
      fetchTools()
    } catch (error) {
      console.error('Error saving tool:', error)
      alert('Error saving tool: ' + error.message)
    }
  }

  function editTool(tool) {
    setEditingTool(tool)
    setFormData({
      name: tool[TOOLS_FIELDS.NAME],
      description: tool[TOOLS_FIELDS.DESCRIPTION],
      category: tool[TOOLS_FIELDS.CATEGORY],
      pricing: tool[TOOLS_FIELDS.PRICING],
      tags: tool[TOOLS_FIELDS.TAGS].join(', '),
      rating: tool[TOOLS_FIELDS.RATING],
      url: tool[TOOLS_FIELDS.URL],
      affiliate_url: tool[TOOLS_FIELDS.AFFILIATE_URL] || '',
      logo_url: tool[TOOLS_FIELDS.LOGO_URL] || '',
      is_new: tool[TOOLS_FIELDS.IS_NEW],
      is_active: tool[TOOLS_FIELDS.IS_ACTIVE],
      sort_order: tool[TOOLS_FIELDS.SORT_ORDER]
    })
  }

  async function deleteTool(id) {
    if (!confirm('Are you sure you want to delete this tool?')) return
    
    try {
      const { error } = await supabase
        .from(TABLES.TOOLS)
        .delete()
        .eq(TOOLS_FIELDS.ID, id)

      if (error) throw error
      alert('Tool deleted successfully!')
      fetchTools()
    } catch (error) {
      console.error('Error deleting tool:', error)
      alert('Error deleting tool: ' + error.message)
    }
  }

  async function toggleToolStatus(id, currentStatus) {
    try {
      const { error } = await supabase
        .from(TABLES.TOOLS)
        .update({ [TOOLS_FIELDS.IS_ACTIVE]: !currentStatus })
        .eq(TOOLS_FIELDS.ID, id)

      if (error) throw error
      fetchTools()
    } catch (error) {
      console.error('Error updating tool status:', error)
      alert('Error updating tool status: ' + error.message)
    }
  }

  return (
    <>
      <Head>
        <title>Admin - Manage Tools - Dan Talks AI</title>
        <meta name="description" content="Admin interface for managing affiliate tools" />
      </Head>

      <main className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-cyan-400 mb-8">Manage Affiliate Tools</h1>
          
          {/* Form */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              {editingTool ? 'Edit Tool' : 'Add New Tool'}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Pricing *</label>
                <select
                  value={formData.pricing}
                  onChange={(e) => setFormData({...formData, pricing: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                >
                  <option value="">Select pricing</option>
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  placeholder="shorts, auto-edit, captions"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({...formData, sort_order: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL *</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Affiliate URL</label>
                <input
                  type="url"
                  value={formData.affiliate_url}
                  onChange={(e) => setFormData({...formData, affiliate_url: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Logo URL</label>
                <input
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_new}
                    onChange={(e) => setFormData({...formData, is_new: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">New Tool</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                >
                  {editingTool ? 'Update Tool' : 'Add Tool'}
                </button>
                
                {editingTool && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTool(null)
                      setFormData({
                        name: '',
                        description: '',
                        category: '',
                        pricing: '',
                        tags: '',
                        rating: 0,
                        url: '',
                        affiliate_url: '',
                        logo_url: '',
                        is_new: false,
                        is_active: true,
                        sort_order: 0
                      })
                    }}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tools List */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
            <h2 className="text-2xl font-semibold mb-6">Current Tools</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading tools...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3 px-2">Name</th>
                      <th className="text-left py-3 px-2">Category</th>
                      <th className="text-left py-3 px-2">Pricing</th>
                      <th className="text-left py-3 px-2">Rating</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map((tool) => (
                      <tr key={tool[TOOLS_FIELDS.ID]} className="border-b border-gray-700/50">
                        <td className="py-3 px-2">
                          <div>
                            <div className="font-medium">{tool[TOOLS_FIELDS.NAME]}</div>
                            {tool[TOOLS_FIELDS.IS_NEW] && (
                              <span className="inline-block bg-fuchsia-500/20 text-fuchsia-200 text-xs px-2 py-1 rounded-full">
                                NEW
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-2">{tool[TOOLS_FIELDS.CATEGORY]}</td>
                        <td className="py-3 px-2">{tool[TOOLS_FIELDS.PRICING]}</td>
                        <td className="py-3 px-2">{tool[TOOLS_FIELDS.RATING]}</td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => toggleToolStatus(tool[TOOLS_FIELDS.ID], tool[TOOLS_FIELDS.IS_ACTIVE])}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              tool[TOOLS_FIELDS.IS_ACTIVE] 
                                ? 'bg-green-500/20 text-green-200' 
                                : 'bg-red-500/20 text-red-200'
                            }`}
                          >
                            {tool[TOOLS_FIELDS.IS_ACTIVE] ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => editTool(tool)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteTool(tool[TOOLS_FIELDS.ID])}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
