import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import RheaChatbot from '../components/RheaChatbot'
import RheaModal from '../components/RheaModal'
import { getImageUrl } from '../lib/storage'

export default function DumpsterAI() {
  const router = useRouter()
  const [isRheaModalOpen, setIsRheaModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceArea: '',
    notes: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [consent, setConsent] = useState(false)

  const handleOpenRhea = () => {
    console.log('Dumpster AI: Opening Rhea modal...')
    setIsRheaModalOpen(true)
    console.log('Dumpster AI: Modal state set to:', true)
  }

  const handleCloseRhea = () => {
    setIsRheaModalOpen(false)
  }

  // Industry-specific content variables (easy to swap for other industries)
  const industryConfig = {
    industryName: 'Dumpster Rental',
    headline: 'AI for Dumpster Rentals',
    subheadline: 'Book pickups and deliveries while you\'re on the road.',
    benefits: [
      'Never Miss a Call — instant replies 24/7',
      'Quotes on Autopilot — fast, professional estimates',
      'Book Jobs Faster — follow-ups without extra staff'
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'Tell Rhea about your business and services',
        icon: '🤖'
      },
      {
        step: 'Step 2',
        title: 'We build an AI system that handles customer inquiries',
        icon: '⚙️'
      },
      {
        step: 'Step 3',
        title: 'You get more bookings while working on other jobs',
        icon: '🚀'
      }
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) return

    setIsLoading(true)
    
    try {
      // Submit to unified API endpoint
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          business_focus: 'Dumpster Rental',
          weekly_leads: 'Industry Specific',
          ai_agent: 'Customer Service & Booking',
          monthly_budget: 'Custom',
          source: 'dumpster_rental_landing'
        }),
      })

      if (response.ok) {
        // Track successful form submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit_success', {
            event_category: 'conversion',
            event_label: 'dumpster_rental_landing',
            value: 1,
            custom_parameters: {
              business_focus: 'Dumpster Rental',
              source: 'dumpster_rental_landing'
            }
          })
        }
        
        // Redirect to thank you page
        router.push('/thank-you.html')
      } else {
        console.error('Form submission failed')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <Head>
        <title>{industryConfig.industryName} AI - Dan Talks AI</title>
        <meta name="description" content={industryConfig.subheadline} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-[#0B1C2E] text-white font-['Inter']">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-screen overflow-hidden">
          {/* Header Photo Background */}
          <div className="absolute inset-0">
            <img
              src={getImageUrl('Home/dumpsterrental1.jpg')}
              alt="Dumpster Rental Business"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0B1C2E]/80"></div>
          </div>
          
          <motion.div 
            className="relative z-10 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-[#F5F7FA]">{industryConfig.headline}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {industryConfig.subheadline}
            </motion.p>
            
            {/* Benefits List */}
            <motion.div 
              className="mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {industryConfig.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl">
                      {index === 0 && '📞'}
                      {index === 1 && '💰'}
                      {index === 2 && '📅'}
                    </div>
                    <p className="text-gray-800 font-semibold text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Single CTA Button */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <motion.button 
                className="group bg-[#C42B2B] hover:bg-[#A02020] text-white px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-[#C42B2B]/25"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenRhea}
              >
                <span className="flex items-center space-x-3">
                  <span>See It In Action</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-[#0B1C2E]">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                How It Works for Rentals
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {industryConfig.howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-4xl">
                    {step.icon}
                  </div>
                  <div className="text-white font-semibold mb-2">{step.step}</div>
                  <p className="text-gray-300 text-lg">{step.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-6">
              {industryConfig.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
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

        {/* Lead Capture Form */}
        <section id="lead-form" className="py-20 px-4 bg-gradient-to-b from-[#0B1C2E] via-gray-900/50 to-[#0B1C2E]">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#C42B2B]">
                Let's Get Your AI System Running
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Fill out the form below and I'll get back to you within 24 hours with your personalized AI solution. No sales calls, just straight talk about what you need.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-600/50 shadow-xl p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#C42B2B] focus:outline-none focus:ring-2 focus:ring-[#C42B2B]/30 focus:bg-gray-700/70 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => updateFormData('company', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#C42B2B] focus:outline-none focus:ring-2 focus:ring-[#C42B2B]/30 focus:bg-gray-700/70 transition-all duration-300"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#C42B2B] focus:outline-none focus:ring-2 focus:ring-[#C42B2B]/30 focus:bg-gray-700/70 transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#C42B2B] focus:outline-none focus:ring-2 focus:ring-[#C42B2B]/30 focus:bg-gray-700/70 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-300 mb-2">
                    Service Area *
                  </label>
                  <input
                    type="text"
                    id="serviceArea"
                    value={formData.serviceArea}
                    onChange={(e) => updateFormData('serviceArea', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#C42B2B] focus:outline-none focus:ring-2 focus:ring-[#C42B2B]/30 focus:bg-gray-700/70 transition-all duration-300"
                    placeholder="e.g., Metro Detroit, Southeast Michigan"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#C42B2B] focus:outline-none focus:ring-2 focus:ring-[#C42B2B]/30 focus:bg-gray-700/70 transition-all duration-300"
                    placeholder="Tell us about your current setup, challenges, or specific needs..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="w-5 h-5 text-[#C42B2B] bg-gray-700 border-gray-600 rounded focus:ring-[#C42B2B] focus:ring-2"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-300">
                    I agree to receive a demo link and texts about my AI system. I can unsubscribe at any time.
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={!consent || isLoading}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                    consent && !isLoading
                      ? 'bg-[#C42B2B] hover:bg-[#A02020] text-white hover:scale-105 shadow-lg hover:shadow-[#C42B2B]/25'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={consent && !isLoading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={consent && !isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Get My AI System'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>



        {/* Footer */}
        <footer className="bg-[#0B1C2E] border-t border-gray-800 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#C42B2B] mb-4">
                Dan Talks AI
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                I build AI systems that work while you work. Transform your dumpster rental business with intelligent automation that never sleeps.
              </p>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2024 Dan Talks AI. Built by Dan Richmond
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Rhea Chatbot */}
      <RheaChatbot />

      {/* Rhea Modal */}
      <RheaModal 
        isOpen={isRheaModalOpen}
        onClose={handleCloseRhea}
        preselectedIndustry="Dumpster Rentals"
      />
      
      {/* Debug indicator */}
      {isRheaModalOpen && (
        <div className="fixed top-4 left-4 bg-red-500 text-white p-2 rounded z-[99998]">
          Modal should be open: {isRheaModalOpen.toString()}
        </div>
      )}
    </>
  )
}

