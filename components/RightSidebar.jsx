import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFeaturedTools } from '../lib/hooks/useFeaturedTools'
import { useAINews } from '../lib/hooks/useAINews'
import { TOOLS_FIELDS, AI_NEWS_FIELDS } from '../lib/supabase'

export default function RightSidebar() {
  const { pinnedTool, otherTools, loading: toolsLoading, error: toolsError } = useFeaturedTools()
  const { featuredNews, latestNews, loading: newsLoading, error: newsError } = useAINews()
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateSidebar = () => {
      if (Math.abs(lastScrollY - window.scrollY) > 50) {
        setIsVisible(lastScrollY > window.scrollY)
        lastScrollY = window.scrollY
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

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:block fixed right-0 top-0 h-screen w-80 bg-gradient-to-b from-[#0B0B18] to-[#05050A] border-l border-white/10 z-40 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: isVisible ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Cosmic background */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]">
          <div className="absolute -top-32 right-10 h-80 w-80 rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(100,92,255,0.35),transparent_60%)]" />
          <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(0,199,255,0.35),transparent_60%)]" />
        </div>

        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 mb-3">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
              </svg>
              <span>Dan's Dashboard</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Live Updates</h2>
            <p className="text-sm text-white/60 mt-1">Tools + AI Pulse</p>
          </div>

          {/* Dan's Tools Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg font-semibold text-white">Dan's Picks</h3>
            </div>
            
            {toolsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-white/5 rounded-xl border border-white/10" />
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
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-3 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    onMouseEnter={(e) => handleToolHover(e, pinnedTool)}
                    onMouseLeave={handleToolLeave}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={pinnedTool[TOOLS_FIELDS.LOGO_URL] || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"} 
                        alt={pinnedTool[TOOLS_FIELDS.NAME]} 
                        className="h-8 w-8 rounded-lg bg-black/40 p-1 ring-1 ring-white/10" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {pinnedTool[TOOLS_FIELDS.NAME]}
                          </h4>
                          {getToolBadge(pinnedTool) && (
                            <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 ${getToolBadge(pinnedTool).color}`}>
                              {getToolBadge(pinnedTool).text}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/70 line-clamp-2 mt-1">
                          {pinnedTool[TOOLS_FIELDS.DESCRIPTION]}
                        </p>
                      </div>
                    </div>
                    <a
                      href={pinnedTool[TOOLS_FIELDS.AFFILIATE_URL] || pinnedTool[TOOLS_FIELDS.URL]}
                      className="absolute inset-0 z-10"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  </motion.div>
                )}

                {/* Other Tools */}
                {otherTools.map((tool) => (
                  <motion.div
                    key={tool[TOOLS_FIELDS.ID]}
                    className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2.5 cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    onMouseEnter={(e) => handleToolHover(e, tool)}
                    onMouseLeave={handleToolLeave}
                  >
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={tool[TOOLS_FIELDS.LOGO_URL] || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"} 
                        alt={tool[TOOLS_FIELDS.NAME]} 
                        className="h-6 w-6 rounded-lg bg-black/40 p-1 ring-1 ring-white/10 flex-shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-medium text-white truncate">
                            {tool[TOOLS_FIELDS.NAME]}
                          </h4>
                          {getToolBadge(tool) && (
                            <span className={`inline-flex items-center rounded-full px-1 py-0.5 text-[9px] font-medium ring-1 ${getToolBadge(tool).color}`}>
                              {getToolBadge(tool).text.split(' ')[0]}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-white/60 line-clamp-1 mt-0.5">
                          {tool[TOOLS_FIELDS.DESCRIPTION]}
                        </p>
                      </div>
                    </div>
                    <a
                      href={tool[TOOLS_FIELDS.AFFILIATE_URL] || tool[TOOLS_FIELDS.URL]}
                      className="absolute inset-0 z-10"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  </motion.div>
                ))}
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
                {/* Featured News */}
                {featuredNews.map((item) => (
                  <motion.div
                    key={item[AI_NEWS_FIELDS.ID]}
                    className="group relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent p-3 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-medium text-cyan-200 ring-1 ring-cyan-400/30">
                          ⭐ FEATURED
                        </span>
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

                {/* Latest News */}
                {latestNews.map((item) => (
                  <motion.div
                    key={item[AI_NEWS_FIELDS.ID]}
                    className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2.5 cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-medium text-white line-clamp-2 leading-tight flex-1">
                          {item[AI_NEWS_FIELDS.TITLE]}
                        </h4>
                        <span className="text-[9px] text-white/50 flex-shrink-0">
                          {formatTimeAgo(item[AI_NEWS_FIELDS.PUBLISHED_AT])}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/60 line-clamp-2">
                        {item[AI_NEWS_FIELDS.SUMMARY]}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-white/50">
                          {item[AI_NEWS_FIELDS.SOURCE]}
                        </span>
                        {item[AI_NEWS_FIELDS.TAGS].length > 0 && (
                          <span className="inline-flex items-center rounded-full bg-white/5 px-1 py-0.5 text-[8px] text-white/60 ring-1 ring-white/10">
                            {item[AI_NEWS_FIELDS.TAGS][0]}
                          </span>
                        )}
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

          {/* Footer */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-[10px] text-white/40 text-center">
              Updates every hour • Some links are affiliates
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Toggle Button */}
      <motion.button
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileExpanded && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileExpanded(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileExpanded && (
          <motion.aside
            className="lg:hidden fixed right-0 top-0 h-screen w-80 bg-gradient-to-b from-[#0B0B18] to-[#05050A] border-l border-white/10 z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Same content as desktop but with close button */}
            <div className="p-6 space-y-8">
              {/* Close button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMobileExpanded(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 mb-3">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                  </svg>
                  <span>Dan's Dashboard</span>
                </div>
                <h2 className="text-xl font-semibold text-white">Live Updates</h2>
                <p className="text-sm text-white/60 mt-1">Tools + AI Pulse</p>
              </div>

              {/* Dan's Tools Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-lg font-semibold text-white">Dan's Picks</h3>
                </div>
                
                {toolsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-white/5 rounded-xl border border-white/10" />
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
                      <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={pinnedTool[TOOLS_FIELDS.LOGO_URL] || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"} 
                            alt={pinnedTool[TOOLS_FIELDS.NAME]} 
                            className="h-8 w-8 rounded-lg bg-black/40 p-1 ring-1 ring-white/10" 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-white truncate">
                                {pinnedTool[TOOLS_FIELDS.NAME]}
                              </h4>
                              {getToolBadge(pinnedTool) && (
                                <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 ${getToolBadge(pinnedTool).color}`}>
                                  {getToolBadge(pinnedTool).text}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/70 line-clamp-2 mt-1">
                              {pinnedTool[TOOLS_FIELDS.DESCRIPTION]}
                            </p>
                          </div>
                        </div>
                        <a
                          href={pinnedTool[TOOLS_FIELDS.AFFILIATE_URL] || pinnedTool[TOOLS_FIELDS.URL]}
                          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-200 transition hover:bg-indigo-500/20"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Try Now
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    )}

                    {/* Other Tools */}
                    {otherTools.map((tool) => (
                      <div
                        key={tool[TOOLS_FIELDS.ID]}
                        className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={tool[TOOLS_FIELDS.LOGO_URL] || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"} 
                            alt={tool[TOOLS_FIELDS.NAME]} 
                            className="h-6 w-6 rounded-lg bg-black/40 p-1 ring-1 ring-white/10 flex-shrink-0" 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-medium text-white truncate">
                                {tool[TOOLS_FIELDS.NAME]}
                              </h4>
                              {getToolBadge(tool) && (
                                <span className={`inline-flex items-center rounded-full px-1 py-0.5 text-[9px] font-medium ring-1 ${getToolBadge(tool).color}`}>
                                  {getToolBadge(tool).text.split(' ')[0]}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-white/60 line-clamp-1 mt-0.5">
                              {tool[TOOLS_FIELDS.DESCRIPTION]}
                            </p>
                          </div>
                        </div>
                        <a
                          href={tool[TOOLS_FIELDS.AFFILIATE_URL] || tool[TOOLS_FIELDS.URL]}
                          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Try Now
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    ))}
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
                    {/* Featured News */}
                    {featuredNews.map((item) => (
                      <div
                        key={item[AI_NEWS_FIELDS.ID]}
                        className="group relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent p-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-medium text-cyan-200 ring-1 ring-cyan-400/30">
                              ⭐ FEATURED
                            </span>
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
                          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-200 transition hover:bg-cyan-500/20"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read More
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    ))}

                    {/* Latest News */}
                    {latestNews.map((item) => (
                      <div
                        key={item[AI_NEWS_FIELDS.ID]}
                        className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2.5"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-medium text-white line-clamp-2 leading-tight flex-1">
                              {item[AI_NEWS_FIELDS.TITLE]}
                            </h4>
                            <span className="text-[9px] text-white/50 flex-shrink-0">
                              {formatTimeAgo(item[AI_NEWS_FIELDS.PUBLISHED_AT])}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/60 line-clamp-2">
                            {item[AI_NEWS_FIELDS.SUMMARY]}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-white/50">
                              {item[AI_NEWS_FIELDS.SOURCE]}
                            </span>
                            {item[AI_NEWS_FIELDS.TAGS].length > 0 && (
                              <span className="inline-flex items-center rounded-full bg-white/5 px-1 py-0.5 text-[8px] text-white/60 ring-1 ring-white/10">
                                {item[AI_NEWS_FIELDS.TAGS][0]}
                              </span>
                            )}
                          </div>
                        </div>
                        <a
                          href={item[AI_NEWS_FIELDS.URL]}
                          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read More
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] text-white/40 text-center">
                  Updates every hour • Some links are affiliates
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: 'translateY(-100%)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-black/90 text-white text-xs p-2 rounded-lg max-w-xs shadow-2xl border border-white/20">
              {tooltipContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
