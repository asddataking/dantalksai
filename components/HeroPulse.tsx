import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getHeroPulse, PulseItem } from '../lib/data/aiPulse'
import { trackPulseItemClick } from '../lib/analytics'

export default function HeroPulse() {
  const [pulseItems, setPulseItems] = useState<PulseItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetchPulseData()
  }, [])

  const fetchPulseData = async () => {
    try {
      setLoading(true)
      const items = await getHeroPulse()
      setPulseItems(items)
    } catch (error) {
      console.error('Error fetching hero pulse data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-rotate through items if there are multiple
  useEffect(() => {
    if (pulseItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % pulseItems.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [pulseItems.length])

  if (loading || pulseItems.length === 0) {
    return null
  }

  const currentItem = pulseItems[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-sm font-medium">Live now:</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-white text-sm font-medium line-clamp-1">
                    {currentItem.title}
                  </span>
                  {currentItem.tags && currentItem.tags.length > 0 && (
                    <span className="text-cyan-300 text-xs bg-cyan-500/20 px-2 py-1 rounded-full">
                      {currentItem.tags[0]}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          <Link
            href="/#sidebar"
            onClick={() => trackPulseItemClick(currentItem.id, 'hero', currentItem.title)}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors flex items-center gap-1 group"
          >
            View all
            <svg 
              className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
