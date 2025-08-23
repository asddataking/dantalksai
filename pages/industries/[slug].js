import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { trackIndustryPageView } from '../../lib/analytics/track'
import TrustBadges from '../../components/TrustBadges'
import Link from 'next/link'

// Industry data - this would typically come from a CMS or database
const industryData = {
  'dumpster-rental': {
    title: 'Dumpster Rental',
    description: 'Never miss a rental request again with AI that handles availability, pricing, and scheduling 24/7.',
    benefits: [
      'Never Miss a Call — instant replies 24/7',
      'Quotes on Autopilot — fast, professional estimates',
      'Book Jobs Faster — follow-ups without extra staff'
    ],
    howItWorks: [
      'Tell Rhea about your dumpster sizes and availability',
      'We build an AI system that handles customer inquiries',
      'You get more bookings while working on other jobs'
    ],
    faqs: [
      {
        question: 'How quickly can you set up the AI system?',
        answer: 'Most systems are ready in 2-3 business days after we gather your business details.'
      },
      {
        question: 'What if a customer needs a custom quote?',
        answer: 'The AI can handle basic pricing and flag complex requests for your review.'
      }
    ]
  },
  'driveway-snow': {
    title: 'Driveway & Snow',
    description: 'Weather-based availability updates and emergency service requests handled automatically.',
    benefits: [
      'Never Miss a Call — instant replies 24/7',
      'Quotes on Autopilot — fast, professional estimates',
      'Book Jobs Faster — follow-ups without extra staff'
    ],
    howItWorks: [
      'Tell Rhea about your service areas and pricing',
      'We build an AI system that handles weather-based requests',
      'You get more bookings while working on other jobs'
    ],
    faqs: [
      {
        question: 'Can the AI handle emergency requests?',
        answer: 'Yes, it can prioritize urgent requests and notify you immediately.'
      }
    ]
  },
  'excavation': {
    title: 'Excavation',
    description: 'Site visits and permits handled with AI that understands your equipment and capabilities.',
    benefits: [
      'Never Miss a Call — instant replies 24/7',
      'Quotes on Autopilot — fast, professional estimates',
      'Book Jobs Faster — follow-ups without extra staff'
    ],
    howItWorks: [
      'Tell Rhea about your equipment and permit process',
      'We build an AI system that handles site assessment requests',
      'You get more bookings while working on other jobs'
    ],
    faqs: []
  },
  'landscaping': {
    title: 'Landscaping',
    description: 'Seasonal maintenance reminders and design consultation requests managed automatically.',
    benefits: [
      'Never Miss a Call — instant replies 24/7',
      'Quotes on Autopilot — fast, professional estimates',
      'Book Jobs Faster — follow-ups without extra staff'
    ],
    howItWorks: [
      'Tell Rhea about your landscaping services and seasons',
      'We build an AI system that handles maintenance scheduling',
      'You get more bookings while working on other jobs'
    ],
    faqs: []
  },
  'painting': {
    title: 'Painting',
    description: 'Color consultations 24/7 and project estimates delivered instantly.',
    benefits: [
      'Never Miss a Call — instant replies 24/7',
      'Quotes on Autopilot — fast, professional estimates',
      'Book Jobs Faster — follow-ups without extra staff'
    ],
    howItWorks: [
      'Tell Rhea about your painting services and pricing',
      'We build an AI system that handles color consultations',
      'You get more bookings while working on other jobs'
    ],
    faqs: []
  },
  'personal-trainer': {
    title: 'Personal Trainer',
    description: 'Workout plans and scheduling handled with AI that understands fitness goals.',
    benefits: [
      'Never Miss a Call — instant replies 24/7',
      'Quotes on Autopilot — fast, professional estimates',
      'Book Jobs Faster — follow-ups without extra staff'
    ],
    howItWorks: [
      'Tell Rhea about your training specialties and availability',
      'We build an AI system that handles fitness consultations',
      'You get more bookings while working on other jobs'
    ],
    faqs: []
  },
  'lawyer': {
    title: 'Lawyer',
    description: 'Case intake and consultations managed with AI that understands legal processes.',
    benefits: [
      'Never Miss a Call — instant replies 24/7',
      'Quotes on Autopilot — fast, professional estimates',
      'Book Jobs Faster — follow-ups without extra staff'
    ],
    howItWorks: [
      'Tell Rhea about your practice areas and consultation process',
      'We build an AI system that handles case intake',
      'You get more bookings while working on other jobs'
    ],
    faqs: []
  },
  'car-garage': {
    title: 'Car Garage',
    description: 'Service requests and parts inquiries handled with AI that knows your services.',
    benefits: [
      'Never Miss a Call — instant replies 24/7',
      'Quotes on Autopilot — fast, professional estimates',
      'Book Jobs Faster — follow-ups without extra staff'
    ],
    howItWorks: [
      'Tell Rhea about your garage services and parts availability',
      'We build an AI system that handles service requests',
      'You get more bookings while working on other jobs'
    ],
    faqs: []
  }
}

export default function IndustryPage() {
  const router = useRouter()
  const { slug } = router.query
  
  useEffect(() => {
    if (slug) {
      trackIndustryPageView(slug)
    }
  }, [slug])

  if (!slug || !industryData[slug]) {
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

  const industry = industryData[slug]

  return (
    <>
      <Head>
        <title>AI for {industry.title} | Dan Talks AI</title>
        <meta 
          name="description" 
          content={`AI systems for ${industry.title.toLowerCase()} that answer calls, send quotes, and book jobs while you're working.`} 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-[#0B1C2E] text-white">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-[60vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C2E] via-[#0B1C2E]/95 to-[#0B1C2E]"></div>
          <div className="absolute inset-0 bg-black/40"></div>
          
          <motion.div 
            className="relative z-10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-[#F5F7FA] leading-tight">
              AI for {industry.title}
            </h1>
            
            <p className="text-xl md:text-2xl max-w-[70ch] mx-auto text-gray-300 mb-12 leading-relaxed">
              {industry.description}
            </p>
            
            <motion.button 
              className="group bg-[#C42B2B] hover:bg-[#A02020] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#C42B2B]/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              See It In Action
            </motion.button>
          </motion.div>
        </section>

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
                How AI Helps Your {industry.title} Business
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {industry.benefits.map((benefit, index) => (
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
                How It Works for {industry.title}
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {industry.howItWorks.map((step, index) => (
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
        {industry.faqs.length > 0 && (
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
                {industry.faqs.map((faq, index) => (
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
