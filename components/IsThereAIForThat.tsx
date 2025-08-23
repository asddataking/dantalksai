import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { getTrendingTopics } from '../lib/data/aiPulse'
import { trackAIForQuery } from '../lib/analytics'

export default function IsThereAIForThat() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [trending, setTrending] = useState<string[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTrending()
  }, [])

  const fetchTrending = async () => {
    try {
      const topics = await getTrendingTopics()
      setTrending(topics)
    } catch (err) {
      console.error('Failed to fetch trending topics:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ai-for/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Track the search
        trackAIForQuery(query.trim(), data.slug)

        // Navigate to the AI for page
        router.push(`/ai-for/${data.slug}`)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTrendingClick = (topic: string) => {
    const slug = topic.toLowerCase().replace(/\s+/g, '-')
    router.push(`/ai-for/${slug}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Is there AI for that?
          </h3>
          <p className="text-lg text-gray-300">
            I'll show you the best tools + how to use them.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you want to automate..."
              className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-lg"
              disabled={isLoading}
              aria-label="Describe what you want to automate"
              aria-describedby="search-helper"
            />
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Search
                </div>
              ) : (
                'Search'
              )}
            </button>
          </div>
          <div id="search-helper" className="text-sm text-gray-400 mt-2 text-center">
            Press Enter to search
          </div>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-center mb-4"
          >
            {error}
          </motion.div>
        )}

        {/* Trending Topics */}
        {trending.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400 text-center">🔥 Trending searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {trending.map((topic) => (
                <motion.button
                  key={topic}
                  onClick={() => handleTrendingClick(topic)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all hover:border-cyan-500/50"
                >
                  {topic}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
