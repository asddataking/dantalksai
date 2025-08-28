import { motion } from 'framer-motion'
import { trackIndustryTileClick } from '../lib/analytics/track'
import { INDUSTRIES, industryPageExists } from '../lib/industries/registry'
import IndustryTile from './IndustryTile'

interface IndustriesGridProps {
  onOpenRhea: (industry: string) => void
}

export default function IndustriesGrid({ onOpenRhea }: IndustriesGridProps) {
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



  return (
    <section id="industries" className="py-20 px-4 bg-[#F5F7FA]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0B1C2E] mb-6">
            See What AI Can Do in Your Industry
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Pick your business to get a tailored walkthrough.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {INDUSTRIES.map((industry) => {
            const pageExists = industryPageExists(industry.slug)
            
            return (
              <motion.div
                key={industry.slug}
                variants={itemVariants}
                className="h-80"
              >
                <IndustryTile
                  industry={industry}
                  pageExists={pageExists}
                  onOpenRhea={(industryName) => {
                    trackIndustryTileClick(industry.slug, pageExists ? 'page' : 'rhea')
                    onOpenRhea(industryName)
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
