import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { trackHeroRendered, trackCtaClick } from '../lib/analytics/track'

interface HeroProps {
  onOpenRhea: () => void
}

export default function Hero({ onOpenRhea }: HeroProps) {
  useEffect(() => {
    trackHeroRendered()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-screen overflow-hidden">
      {/* Patriotic background with subtle grain overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C2E] via-[#0B1C2E]/95 to-[#0B1C2E]"></div>
      <div className="absolute inset-0 bg-[#C42B2B]/5"></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="50" cy="50" r="1" fill="%23C42B2B"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grain)"/%3E%3C/svg%3E')` }}></div>
      
      {/* Optional real-world imagery background with dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-8 text-[#F5F7FA] leading-tight"
          variants={itemVariants}
        >
          AI That Works As Hard As You Do.
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-[70ch] mx-auto text-gray-300 mb-12 leading-relaxed"
          variants={itemVariants}
        >
          From contractors to coaches, lawyers to garages — I build AI systems that answer calls, send quotes, and book jobs while you're working.
        </motion.p>
        
        <motion.div 
          className="flex justify-center items-center mb-8"
          variants={itemVariants}
        >
          <motion.button 
            className="group bg-[#C42B2B] hover:bg-[#A02020] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#C42B2B]/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              trackCtaClick('see_it_in_action')
              onOpenRhea()
            }}
          >
            See It In Action
          </motion.button>
        </motion.div>
        
        <motion.p 
          className="text-sm text-gray-400 max-w-md mx-auto"
          variants={itemVariants}
        >
          Built in America for hardworking local businesses.
        </motion.p>
      </motion.div>
    </section>
  )
}
