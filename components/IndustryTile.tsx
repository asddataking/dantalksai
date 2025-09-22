import { motion } from 'framer-motion'
import Link from 'next/link'
import ImageBanner from './ImageBanner'
import { Industry } from '../lib/industries/registry'
import { getImageUrl } from '../lib/storage'

interface IndustryTileProps {
  industry: Industry
  pageExists: boolean
  onOpenRhea: (industry: string) => void
}

export default function IndustryTile({ industry, pageExists, onOpenRhea }: IndustryTileProps) {
  const handleClick = () => {
    if (!pageExists) {
      onOpenRhea(industry.rheaLabel || industry.title)
    }
  }

  const tileContent = (
    <div className="relative h-full">
      {/* Background Image */}
      {industry.image && (
        <ImageBanner
          src={getImageUrl(industry.image)}
          alt={`${industry.title} - ${industry.benefit}`}
          overlay={0.3}
          className="absolute inset-0"
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold mb-3 leading-tight">
            {industry.title}
          </h3>
          <p className="text-gray-200 text-sm leading-relaxed">
            {industry.benefit}
          </p>
        </div>
        
        {/* CTA */}
        <div className="mt-4">
          {pageExists ? (
            <div className="flex items-center gap-2 text-[#C42B2B] font-medium text-sm group">
              <span>Explore {industry.title.split(' ').slice(-1)[0]}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          ) : (
            <button
              onClick={handleClick}
              className="flex items-center gap-2 text-[#C42B2B] font-medium text-sm hover:text-[#A02020] transition-colors"
            >
              <span>Show me how it works</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Hover Reveal - Benefits */}
      <motion.div
        className="absolute inset-0 bg-[#0B1C2E]/95 text-white p-6 flex flex-col justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <h4 className="text-lg font-bold mb-4 text-[#C42B2B]">
          How AI Helps Your {industry.title.split(' ').slice(-1)[0]} Business
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-[#C42B2B] mt-1">•</span>
            <span>Never miss a call — instant replies 24/7</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#C42B2B] mt-1">•</span>
            <span>Quotes on autopilot — fast, professional estimates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#C42B2B] mt-1">•</span>
            <span>Book jobs faster — follow-ups without extra staff</span>
          </li>
        </ul>
      </motion.div>
    </div>
  )

  if (pageExists) {
    // Map industry slugs to actual page routes
    const getPageRoute = (slug: string) => {
      switch (slug) {
        case 'dumpster-rental':
          return '/dumpsterai'
        case 'concrete-excavation':
          return '/concrete-excavation-ai'
        case 'landscaping':
          return '/landscaping-ai'
        case 'snow-removal':
          return '/snow-removal-ai'
        default:
          return `/industries/${slug}`
      }
    }
    
    return (
      <Link href={getPageRoute(industry.slug)}>
        <motion.div
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {tileContent}
        </motion.div>
      </Link>
    )
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      {tileContent}
    </motion.div>
  )
}
