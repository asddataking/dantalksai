import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { trackIndustryPageView } from '../../lib/analytics/track'
import TrustBadges from '../../components/TrustBadges'
import Link from 'next/link'
import ImageBanner from '../../components/ImageBanner'
import { getIndustryBySlug } from '../../lib/industries/registry'

// Standard benefits and how-it-works for all industries
const standardBenefits = [
  'Never Miss a Call — instant replies 24/7',
  'Quotes on Autopilot — fast, professional estimates',
  'Book Jobs Faster — follow-ups without extra staff'
]

const standardHowItWorks = [
  'Tell Rhea about your business and services',
  'We build an AI system that handles customer inquiries',
  'You get more bookings while working on other jobs'
]

// FAQ data for industries that have specific questions
const industryFaqs = {
  'dumpster-rental': [
    {
      question: 'How quickly can you set up the AI system?',
      answer: 'Most systems are ready in 2-3 business days after we gather your business details.'
    },
    {
      question: 'What if a customer needs a custom quote?',
      answer: 'The AI can handle basic pricing and flag complex requests for your review.'
    }
  ],
  'driveway-snow': [
    {
      question: 'Can the AI handle emergency requests?',
      answer: 'Yes, it can prioritize urgent requests and notify you immediately.'
    }
  ]
}

export default function IndustryPage() {
  const router = useRouter()
  const { slug } = router.query
  
  useEffect(() => {
    if (slug) {
      trackIndustryPageView(slug)
    }
  }, [slug])

  if (!slug) {
    return null
  }

  const industry = getIndustryBySlug(slug)
  
  if (!industry) {
    return (
      <div className="min-h-screen bg-[#0B1C2E] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Industry Not Found</h1>
          <Link href="/" className="text-[#C42B2B] hover:text-[#A02020]">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const faqs = industryFaqs[slug] || []
  const industryName = industry.title.split(' ').slice(-1)[0] // Get last word for dynamic content

  return (
    <>
      <Head>
        <title>AI for {industryName} | Dan Talks AI</title>
        <meta 
          name="description" 
          content={`AI systems for ${industryName.toLowerCase()} that answer calls, send quotes, and book jobs while you're working.`} 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-[#0B1C2E] text-white">
        {/* Hero Section with ImageBanner */}
        <ImageBanner
          src={industry.image ? `https://prxioffyzbmygsliuabt.supabase.co/storage/v1/object/public/images/${industry.image}` : '/images/industries/default.jpg'}
          alt={`${industry.title} - ${industry.benefit}`}
          overlay={0.4}
          className="min-h-[60vh] flex items-center justify-center"
          priority={true}
        >
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 text-[#F5F7FA] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {industry.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-[70ch] mx-auto text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {industry.benefit}
            </motion.p>
            
            <motion.button 
              className="group bg-[#C42B2B] hover:bg-[#A02020] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#C42B2B]/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              See It In Action
            </motion.button>
          </div>
        </ImageBanner>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-[#F5F7FA]">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0B1C2E] mb-6">
                How AI Helps Your {industryName} Business
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {standardBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">
                    {index === 0 ? '📞' : index === 1 ? '💰' : '📅'}
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1C2E] mb-4">
                    {benefit}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-[#0B1C2E]">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-6">
                How It Works for {industryName}
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {standardHowItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-6xl mb-4">
                    {index === 0 ? '🤖' : index === 1 ? '⚙️' : '🚀'}
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F7FA] mb-3">
                    Step {index + 1}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="py-20 px-4 bg-[#F5F7FA]">
            <div className="mx-auto max-w-4xl">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0B1C2E] mb-6">
                  Frequently Asked Questions
                </h2>
              </motion.div>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-bold text-[#0B1C2E] mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trust Badges */}
        <TrustBadges />

        {/* Back to Industries */}
        <section className="py-12 px-4 bg-[#0B1C2E]">
          <div className="mx-auto max-w-6xl text-center">
            <Link 
              href="/#industries"
              className="text-[#C42B2B] hover:text-[#A02020] font-medium transition-colors"
            >
              ← Back to All Industries
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
