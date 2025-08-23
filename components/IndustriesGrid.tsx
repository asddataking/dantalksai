import { motion } from 'framer-motion'
import Link from 'next/link'
import { trackIndustryTileOpen, trackIndustryTileRheaPreselect } from '../lib/analytics/track'

interface IndustriesGridProps {
  onOpenRhea: (industry: string) => void
}

const industries = [
  {
    slug: 'dumpster-rental',
    title: 'Dumpster Rental',
    description: 'Never miss a rental request again'
  },
  {
    slug: 'driveway-snow',
    title: 'Driveway & Snow',
    description: 'Weather-based availability updates'
  },
  {
    slug: 'excavation',
    title: 'Excavation',
    description: 'Site visits and permits handled'
  },
  {
    slug: 'landscaping',
    title: 'Landscaping',
    description: 'Seasonal maintenance reminders'
  },
  {
    slug: 'painting',
    title: 'Painting',
    description: 'Color consultations 24/7'
  },
  {
    slug: 'personal-trainer',
    title: 'Personal Trainer',
    description: 'Workout plans and scheduling'
  },
  {
    slug: 'lawyer',
    title: 'Lawyer',
    description: 'Case intake and consultations'
  },
  {
    slug: 'car-garage',
    title: 'Car Garage',
    description: 'Service requests and parts'
  }
]

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

  const handleRheaClick = (industry: string, slug: string) => {
    trackIndustryTileRheaPreselect(slug)
    onOpenRhea(industry)
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
            Is There AI For That?
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Pick your industry to see how it works.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.slug}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-[#0B1C2E] mb-3">
                <Link 
                  href={`/industries/${industry.slug}`}
                  onClick={() => trackIndustryTileOpen(industry.slug)}
                  className="hover:text-[#C42B2B] transition-colors"
                >
                  {industry.title}
                </Link>
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {industry.description}
              </p>
              
              <button
                onClick={() => handleRheaClick(industry.title, industry.slug)}
                className="w-full bg-[#C42B2B] hover:bg-[#A02020] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                See a 2-minute demo →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
