import { motion } from 'framer-motion'
import { trackUsecaseTileClick } from '../lib/analytics/track'

interface UseCaseTilesProps {
  onOpenRhea: (industry?: string) => void
}

const industries = [
  'Contractors',
  'Dumpster Rentals', 
  'Driveway/Snow',
  'Excavation',
  'Landscaping',
  'Painting',
  'Personal Trainers',
  'Lawyers',
  'Car Garages'
]

export default function UseCaseTiles({ onOpenRhea }: UseCaseTilesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  }

  const handleTileClick = (industry: string) => {
    trackUsecaseTileClick(industry)
    onOpenRhea(industry)
  }

  return (
    <section className="py-20 px-4 bg-[#0B1C2E]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-[#F5F7FA] mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Built for Real-World Work
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry, index) => (
            <motion.button
              key={industry}
              className="group bg-white/5 hover:bg-white/10 border border-gray-700 hover:border-[#C42B2B] rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#C42B2B]/20"
              variants={itemVariants}
              onClick={() => handleTileClick(industry)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold text-[#F5F7FA] mb-3 group-hover:text-[#C42B2B] transition-colors">
                {industry}
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                See a 2-minute demo →
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
