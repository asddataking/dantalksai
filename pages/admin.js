import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getYouTubeConfig, updateYouTubeConfig } from '../lib/youtubeApi'
import { getFormResponses } from '../lib/formHandler'

export default function Admin() {
  const [youtubeConfig, setYoutubeConfig] = useState({ api_key: '', channel_id: '' })
  const [formResponses, setFormResponses] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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

  return (
    <>
      <Head>
        <title>Admin Dashboard - Dan Talks AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      
      <main className="bg-black text-white min-h-screen font-['Inter'] p-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-12 text-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Admin Dashboard
          </motion.h1>

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
        </div>
      </main>
    </>
  )
} 