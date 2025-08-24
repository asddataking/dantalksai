import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { trackTickerRendered, trackTickerClick } from '../lib/analytics/track'
import { getAIPulse } from '../lib/data/aiPulse'

interface PulseItem {
  id: string
  title: string
  tags: string[]
  url?: string
}

export default function LiveTicker() {
  const [pulseItems, setPulseItems] = useState<PulseItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    trackTickerRendered()
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const fetchPulseData = async () => {
      try {
        const data = await getAIPulse()
        // Get top 1-2 items, prioritizing featured ones
        const topItems = [...data.featured, ...data.latest].slice(0, 2)
        setPulseItems(topItems)
      } catch (error) {
        console.error('Error fetching pulse data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPulseData()
    
    // Refresh every 10 minutes (600 seconds)
    const interval = setInterval(fetchPulseData, 600 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white border-y border-gray-200 py-3 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <span className="text-[#C42B2B] font-semibold">LIVE</span> • Loading updates...
        </div>
      </div>
    )
  }

  if (pulseItems.length === 0) {
    return (
      <div className="bg-white border-y border-gray-200 py-3 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <span className="text-[#C42B2B] font-semibold">LIVE</span> • Updates available soon.
        </div>
      </div>
    )
  }

  const tickerContent = pulseItems.map((item, index) => (
    <button
      key={item.id}
      onClick={() => {
        trackTickerClick(item.id)
        if (item.url) window.open(item.url, '_blank')
      }}
      className="inline-flex items-center gap-2 mr-8 hover:text-[#C42B2B] transition-colors cursor-pointer text-black"
    >
      <span>{item.title.length > 60 ? item.title.substring(0, 60) + '...' : item.title}</span>
      {item.tags && item.tags.length > 0 && (
        <span className="text-[#C42B2B] text-sm">· {item.tags[0]}</span>
      )}
    </button>
  ))

  return (
    <div className="bg-white border-y border-gray-200 py-3 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#C42B2B] font-semibold text-sm">LIVE</span>
          
          {prefersReducedMotion ? (
            // Static display for users who prefer reduced motion
            <div className="flex gap-6 text-black text-sm">
              {pulseItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    trackTickerClick(item.id)
                    if (item.url) window.open(item.url, '_blank')
                  }}
                  className="hover:text-[#C42B2B] transition-colors cursor-pointer"
                >
                  {item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title}
                  {item.tags && item.tags.length > 0 && (
                    <span className="text-[#C42B2B] ml-2">· {item.tags[0]}</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            // Marquee animation for users who don't prefer reduced motion
            <motion.div
              className="flex text-black text-sm whitespace-nowrap"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear" as const
              }}
            >
              {tickerContent}
              {/* Duplicate content for seamless loop */}
              {tickerContent}
            </motion.div>
          )}
        </div>
        
        <button
          onClick={() => trackTickerClick('view_updates')}
          className="text-[#C42B2B] hover:text-[#A02020] text-sm font-medium transition-colors"
        >
          View updates →
        </button>
      </div>
    </div>
  )
}
