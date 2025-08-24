import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

import Hero from '../components/Hero'
import LiveTicker from '../components/LiveTicker'
import HowWeWork from '../components/HowWeWork'
import IndustriesGrid from '../components/IndustriesGrid'
import TrustBadges from '../components/TrustBadges'
import RheaModal from '../components/RheaModal'
import AffiliateToolsSection from '../components/AffiliateToolsSection'
import BlogSection from '../components/BlogSection'
import Footer from '../components/Footer'

export default function Home() {
  const router = useRouter()
  const [isRheaModalOpen, setIsRheaModalOpen] = useState(false)
  const [preselectedIndustry, setPreselectedIndustry] = useState()

  const handleOpenRhea = (industry) => {
    setPreselectedIndustry(industry)
    setIsRheaModalOpen(true)
  }

  const handleCloseRhea = () => {
    setIsRheaModalOpen(false)
    setPreselectedIndustry(undefined)
  }

  const handleToolsClick = () => {
    router.push('/tools')
  }

  return (
    <>
      <Head>
        <title>Dan Talks AI | AI Systems for Local Businesses & Contractors</title>
        <meta name="description" content="AI that answers calls, sends quotes, and books jobs while you work. From contractors to coaches, lawyers to garages — see it in action." />
        <meta name="keywords" content="AI automation, lead generation, CRM automation, AI agents, business automation, local business, contractors, dumpster rentals, landscaping, painting, personal trainers, lawyers, car garages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dan Talks AI",
              "description": "AI systems that answer calls, send quotes, and book jobs while you're working.",
              "url": "https://dantalksai.com",
              "logo": "https://dantalksai.com/logo.png",
              "sameAs": [
                "https://twitter.com/dantalksai",
                "https://youtube.com/@dantalksai"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "serviceArea": {
                "@type": "State",
                "name": "Michigan"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Automation Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Lead Qualification System",
                      "description": "Automated lead qualification and appointment booking system"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "CRM Automation Setup",
                      "description": "Complete CRM automation with AI agents"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-[#0B1C2E] text-white">
        {/* Hero Section */}
        <Hero onOpenRhea={handleOpenRhea} />
        
        {/* Live Ticker */}
        <LiveTicker />
        
        {/* How We Work */}
        <HowWeWork onOpenRhea={handleOpenRhea} />
        
        {/* Trust Badges */}
        <TrustBadges />
        
        {/* Industries Grid */}
        <IndustriesGrid onOpenRhea={handleOpenRhea} />
        
        {/* Blog Section */}
        <BlogSection />
        
        {/* Affiliate Tools Section */}
        <AffiliateToolsSection />
        
        {/* Footer */}
        <Footer />
      </main>

      {/* Rhea Modal */}
      <RheaModal 
        isOpen={isRheaModalOpen}
        onClose={handleCloseRhea}
        preselectedIndustry={preselectedIndustry}
      />
    </>
  )
}
