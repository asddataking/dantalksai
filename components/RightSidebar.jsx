import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFeaturedTools } from '../lib/hooks/useFeaturedTools'
import { useAINews } from '../lib/hooks/useAINews'
import { TOOLS_FIELDS, AI_NEWS_FIELDS } from '../lib/supabase'

export default function RightSidebar() {
  const { pinnedTool, otherTools, loading: toolsLoading, error: toolsError } = useFeaturedTools()
  const { featuredNews, latestNews, loading: newsLoading, error: newsError } = useAINews()
  const [isVisible, setIsVisible] = useState(false)
  const [isWidgetMode, setIsWidgetMode] = useState(false)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  // Auto-hide on scroll down, show on scroll up, and transform to widget
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateSidebar = () => {
      const currentScrollY = window.scrollY
      const heroHeight = 800 // Increased hero section height for better detection
      
      // Transform to widget mode when past hero section
      if (currentScrollY > heroHeight) {
        setIsWidgetMode(true)
      } else {
        setIsWidgetMode(false)
      }
      
      // Show/hide based on scroll direction with improved threshold
      if (Math.abs(lastScrollY - currentScrollY) > 30) {
        setIsVisible(lastScrollY > currentScrollY)
        lastScrollY = currentScrollY
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateSidebar)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tooltip state
  const [tooltipContent, setTooltipContent] = useState('')
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)

  const handleToolHover = (e, tool) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipContent(`Why Dan likes this tool: ${tool[TOOLS_FIELDS.DESCRIPTION]}`)
    setTooltipPosition({ x: rect.left, y: rect.top - 10 })
    setShowTooltip(true)
  }

  const handleToolLeave = () => {
    setShowTooltip(false)
  }

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  // Get badge for tool
  const getToolBadge = (tool) => {
    if (tool[TOOLS_FIELDS.IS_NEW]) return { text: '🔥 NEW', color: 'bg-fuchsia-500/20 text-fuchsia-200 ring-fuchsia-400/30' }
    if (tool[TOOLS_FIELDS.RATING] >= 4.8) return { text: '⭐ FAVORITE', color: 'bg-amber-500/20 text-amber-200 ring-amber-400/30' }
    if (tool[TOOLS_FIELDS.RATING] >= 4.5) return { text: '🔥 TRENDING', color: 'bg-orange-500/20 text-orange-200 ring-orange-400/30' }
    return null
  }

  // Limit AI pulse items to 5 total
  const getLimitedAINews = () => {
    const allNews = [...featuredNews, ...latestNews]
    return allNews.slice(0, 5)
  }

  // Widget mode styles with improved positioning
  const widgetStyles = isWidgetMode ? {
    position: 'fixed',
    right: '24px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '340px',
    maxHeight: '85vh',
    borderRadius: '24px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    zIndex: 50
  } : {}

  return (
    <>
      {/* Desktop Sidebar/Widget */}
      <AnimatePresence>
        {isVisible && (
          <motion.aside
            className={`hidden lg:block overflow-y-auto transition-all duration-700 ${
              isWidgetMode 
                ? 'bg-black/85 backdrop-blur-2xl border border-white/25' 
                : 'fixed right-0 top-0 h-screen w-80 bg-gradient-to-b from-[#0B0B18] to-[#05050A] border-l border-white/10'
            }`}
            style={widgetStyles}
            initial={{ 
              x: isWidgetMode ? '100%' : '100%',
              scale: isWidgetMode ? 0.85 : 1,
              opacity: 0
            }}
            animate={{ 
              x: 0,
              scale: 1,
              opacity: 1
            }}
            exit={{ 
              x: '100%',
              scale: isWidgetMode ? 0.85 : 1,
              opacity: 0
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 280, 
              damping: 25 
            }}
          >
            {/* Cosmic background - only show in full sidebar mode */}
            {!isWidgetMode && (
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]">
                <div className="absolute -top-32 right-10 h-80 w-80 rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(100,92,255,0.35),transparent_60%)]" />
                <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(0,199,255,0.35),transparent_60%)]" />
              </div>
            )}

            <div className={`${isWidgetMode ? 'p-5' : 'p-6'} space-y-6`}>
              {/* Header */}
              <div className="text-center">
                <div className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 mb-3 ${
                  isWidgetMode ? 'text-[10px] px-2 py-0.5' : ''
                }`}>
                  <svg className={`${isWidgetMode ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                  </svg>
                  <span>{isWidgetMode ? 'Live Updates' : 'Dan\'s Dashboard'}</span>
                </div>
                <h2 className={`font-semibold text-white ${isWidgetMode ? 'text-lg' : 'text-xl'}`}>
                  {isWidgetMode ? 'AI Pulse' : 'Live Updates'}
                </h2>
                {!isWidgetMode && <p className="text-sm text-white/60 mt-1">Tools + AI Pulse</p>}
              </div>

              {/* Content - Show different content based on mode */}
              {isWidgetMode ? (
                // Widget mode - Show only AI Pulse (limited to 5 items)
                <div className="space-y-4">
                  {newsLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-16 bg-white/5 rounded-lg border border-white/10" />
                        </div>
                      ))}
                    </div>
                  ) : newsError ? (
                    <div className="text-red-400 text-sm text-center py-4">
                      Error loading news: {newsError}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Limited AI Pulse Items - Max 5 total */}
                      {getLimitedAINews().map((item, index) => (
                        <motion.div
                          key={item[AI_NEWS_FIELDS.ID]}
                          className={`group relative overflow-hidden rounded-lg border p-3 cursor-pointer ${
                            index === 0 
                              ? 'border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent' 
                              : 'border-white/10 bg-white/5'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {index === 0 && (
                                <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-medium text-cyan-200 ring-1 ring-cyan-400/30">
                                  ⭐ FEATURED
                                </span>
                              )}
                              <span className="text-[10px] text-white/60">
                                {formatTimeAgo(item[AI_NEWS_FIELDS.PUBLISHED_AT])}
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                              {item[AI_NEWS_FIELDS.TITLE]}
                            </h4>
                            <p className="text-xs text-white/70 line-clamp-2">
                              {item[AI_NEWS_FIELDS.SUMMARY]}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-white/50">
                                {item[AI_NEWS_FIELDS.SOURCE]}
                              </span>
                            </div>
                          </div>
                          <a
                            href={item[AI_NEWS_FIELDS.URL]}
                            className="absolute inset-0 z-10"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Full sidebar mode - Show everything with limited AI Pulse
                <>
                  {/* Dan's Picks Section */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">⚡</span>
                      <h3 className="text-lg font-semibold text-white">Dan's Picks</h3>
                    </div>
                    
                    {toolsLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-20 bg-white/5 rounded-xl border border-white/10" />
                          </div>
                        ))}
                      </div>
                    ) : toolsError ? (
                      <div className="text-red-400 text-sm text-center py-4">
                        Error loading tools: {toolsError}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Pinned Tool */}
                        {pinnedTool && (
                          <motion.div
                            className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent p-3 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                            onMouseEnter={(e) => handleToolHover(e, pinnedTool)}
                            onMouseLeave={handleToolLeave}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-200 ring-1 ring-amber-400/30">
                                  🎯 PINNED
                                </span>
                                <span className="text-[10px] text-white/60">
                                  {pinnedTool[TOOLS_FIELDS.CATEGORY]}
                                </span>
                              </div>
                              <h4 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                                {pinnedTool[TOOLS_FIELDS.NAME]}
                              </h4>
                              <p className="text-xs text-white/70 line-clamp-2">
                                {pinnedTool[TOOLS_FIELDS.DESCRIPTION]}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-white/50">
                                  {pinnedTool[TOOLS_FIELDS.PRICING]}
                                </span>
                                <div className="flex gap-1">
                                  {pinnedTool[TOOLS_FIELDS.TAGS].slice(0, 2).map((tag) => (
                                    <span key={tag} className="inline-flex items-center rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] text-white/60 ring-1 ring-white/10">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <a
                              href={pinnedTool[TOOLS_FIELDS.AFFILIATE_URL]}
                              className="absolute inset-0 z-10"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          </motion.div>
                        )}

                        {/* Other Tools */}
                        {otherTools.slice(0, 2).map((tool) => {
                          const badge = getToolBadge(tool)
                          return (
                            <motion.div
                              key={tool[TOOLS_FIELDS.ID]}
                              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2.5 cursor-pointer"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                              onMouseEnter={(e) => handleToolHover(e, tool)}
                              onMouseLeave={handleToolLeave}
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  {badge && (
                                    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium ring-1 ${badge.color}`}>
                                      {badge.text}
                                    </span>
                                  )}
                                  <span className="text-[10px] text-white/60">
                                    {tool[TOOLS_FIELDS.CATEGORY]}
                                  </span>
                                </div>
                                <h4 className="text-xs font-medium text-white line-clamp-2 leading-tight">
                                  {tool[TOOLS_FIELDS.NAME]}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] text-white/50">
                                    {tool[TOOLS_FIELDS.PRICING]}
                                  </span>
                                  {tool[TOOLS_FIELDS.RATING] && (
                                    <span className="text-[9px] text-white/50">
                                      ⭐ {tool[TOOLS_FIELDS.RATING]}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <a
                                href={tool[TOOLS_FIELDS.AFFILIATE_URL]}
                                className="absolute inset-0 z-10"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            </motion.div>
                          )
                        })}
                      </div>
                    )}
                  </section>

                  {/* AI Pulse Section - Limited to 5 items total */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">📰</span>
                      <h3 className="text-lg font-semibold text-white">AI Pulse</h3>
                      <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-full">Max 5</span>
                    </div>
                    
                    {newsLoading ? (
                      <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-20 bg-white/5 rounded-xl border border-white/10" />
                          </div>
                        ))}
                      </div>
                    ) : newsError ? (
                      <div className="text-red-400 text-sm text-center py-4">
                        Error loading news: {newsError}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Limited AI Pulse Items - Max 5 total */}
                        {getLimitedAINews().map((item, index) => (
                          <motion.div
                            key={item[AI_NEWS_FIELDS.ID]}
                            className={`group relative overflow-hidden rounded-xl border p-3 cursor-pointer ${
                              index === 0 
                                ? 'border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent' 
                                : 'border-white/10 bg-white/5'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                {index === 0 && (
                                  <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-medium text-cyan-200 ring-1 ring-cyan-400/30">
                                    ⭐ FEATURED
                                  </span>
                                )}
                                <span className="text-[10px] text-white/60">
                                  {formatTimeAgo(item[AI_NEWS_FIELDS.PUBLISHED_AT])}
                                </span>
                              </div>
                              <h4 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                                {item[AI_NEWS_FIELDS.TITLE]}
                              </h4>
                              <p className="text-xs text-white/70 line-clamp-2">
                                {item[AI_NEWS_FIELDS.SUMMARY]}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-white/50">
                                  {item[AI_NEWS_FIELDS.SOURCE]}
                                </span>
                                <div className="flex gap-1">
                                  {item[AI_NEWS_FIELDS.TAGS].slice(0, 2).map((tag) => (
                                    <span key={tag} className="inline-flex items-center rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] text-white/60 ring-1 ring-white/10">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <a
                              href={item[AI_NEWS_FIELDS.URL]}
                              className="absolute inset-0 z-10"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </section>
                </>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileExpanded && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileExpanded(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-[#0B0B18] to-[#05050A] border-l border-white/10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile content - same as desktop */}
              <div className="p-6 space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Live Updates</h2>
                  <button
                    onClick={() => setIsMobileExpanded(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Dan's Picks Section */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">⚡</span>
                    <h3 className="text-lg font-semibold text-white">Dan's Picks</h3>
                  </div>
                  
                  {toolsLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-20 bg-white/5 rounded-xl border border-white/10" />
                        </div>
                      ))}
                    </div>
                  ) : toolsError ? (
                    <div className="text-red-400 text-sm text-center py-4">
                      Error loading tools: {toolsError}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Pinned Tool */}
                      {pinnedTool && (
                        <motion.div
                          className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent p-3 cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                          onMouseEnter={(e) => handleToolHover(e, pinnedTool)}
                          onMouseLeave={handleToolLeave}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-200 ring-1 ring-amber-400/30">
                                🎯 PINNED
                              </span>
                              <span className="text-[10px] text-white/60">
                                {pinnedTool[TOOLS_FIELDS.CATEGORY]}
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                              {pinnedTool[TOOLS_FIELDS.NAME]}
                            </h4>
                            <p className="text-xs text-white/70 line-clamp-2">
                              {pinnedTool[TOOLS_FIELDS.DESCRIPTION]}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-white/50">
                                {pinnedTool[TOOLS_FIELDS.PRICING]}
                              </span>
                              <div className="flex gap-1">
                                {pinnedTool[TOOLS_FIELDS.TAGS].slice(0, 2).map((tag) => (
                                  <span key={tag} className="inline-flex items-center rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] text-white/60 ring-1 ring-white/10">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <a
                            href={pinnedTool[TOOLS_FIELDS.AFFILIATE_URL]}
                            className="absolute inset-0 z-10"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        </motion.div>
                      )}

                      {/* Other Tools */}
                      {otherTools.slice(0, 2).map((tool) => {
                        const badge = getToolBadge(tool)
                        return (
                          <motion.div
                            key={tool[TOOLS_FIELDS.ID]}
                            className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2.5 cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                            onMouseEnter={(e) => handleToolHover(e, tool)}
                            onMouseLeave={handleToolLeave}
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                {badge && (
                                  <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium ring-1 ${badge.color}`}>
                                    {badge.text}
                                  </span>
                                )}
                                <span className="text-[10px] text-white/60">
                                  {tool[TOOLS_FIELDS.CATEGORY]}
                                </span>
                              </div>
                              <h4 className="text-xs font-medium text-white line-clamp-2 leading-tight">
                                {tool[TOOLS_FIELDS.NAME]}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] text-white/50">
                                  {tool[TOOLS_FIELDS.PRICING]}
                                </span>
                                {tool[TOOLS_FIELDS.RATING] && (
                                  <span className="text-[9px] text-white/50">
                                    ⭐ {tool[TOOLS_FIELDS.RATING]}
                                  </span>
                                )}
                              </div>
                            </div>
                            <a
                              href={tool[TOOLS_FIELDS.AFFILIATE_URL]}
                              className="absolute inset-0 z-10"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          </motion.div>
                        )
                      })}
                    </div>
                  )}
                </section>

                {/* AI Pulse Section */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">📰</span>
                    <h3 className="text-lg font-semibold text-white">AI Pulse</h3>
                  </div>
                  
                  {newsLoading ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-20 bg-white/5 rounded-xl border border-white/10" />
                        </div>
                      ))}
                    </div>
                  ) : newsError ? (
                    <div className="text-red-400 text-sm text-center py-4">
                      Error loading news: {newsError}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Limited AI Pulse Items - Max 5 total */}
                      {getLimitedAINews().map((item, index) => (
                        <motion.div
                          key={item[AI_NEWS_FIELDS.ID]}
                          className={`group relative overflow-hidden rounded-xl border p-3 cursor-pointer ${
                            index === 0 
                              ? 'border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent' 
                              : 'border-white/10 bg-white/5'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {index === 0 && (
                                <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-medium text-cyan-200 ring-1 ring-cyan-400/30">
                                  ⭐ FEATURED
                                </span>
                              )}
                              <span className="text-[10px] text-white/60">
                                {formatTimeAgo(item[AI_NEWS_FIELDS.PUBLISHED_AT])}
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                              {item[AI_NEWS_FIELDS.TITLE]}
                            </h4>
                            <p className="text-xs text-white/70 line-clamp-2">
                              {item[AI_NEWS_FIELDS.SUMMARY]}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-white/50">
                                {item[AI_NEWS_FIELDS.SOURCE]}
                              </span>
                              <div className="flex gap-1">
                                {item[AI_NEWS_FIELDS.TAGS].slice(0, 2).map((tag) => (
                                  <span key={tag} className="inline-flex items-center rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] text-white/60 ring-1 ring-white/10">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <a
                            href={item[AI_NEWS_FIELDS.URL]}
                            className="absolute inset-0 z-10"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="fixed z-50 bg-black/90 text-white p-3 rounded-lg text-sm max-w-xs shadow-xl border border-white/20"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y - 10,
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
