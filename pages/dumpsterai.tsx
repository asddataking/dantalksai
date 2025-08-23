import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function DumpsterAI() {
  const router = useRouter()
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

  // Industry-specific content variables (easy to swap for other industries)
  const industryConfig = {
    industryName: 'Dumpster Rental',
    headline: 'More Dumpster Rentals, Less Phone Tag.',
    subheadline: 'AI answers leads 24/7, books jobs on your calendar, and follows up until they say yes.',
    benefits: [
      'Never miss a lead - AI responds instantly to every inquiry',
      'Book jobs automatically - customers schedule themselves 24/7',
      'Follow up automatically - AI nurtures prospects until they convert',
      'Reduce phone calls by 80% - let AI handle the routine questions'
    ],
    stats: [
      { number: '60%', label: 'faster responses' },
      { number: '24/7', label: 'coverage' },
      { number: '80%', label: 'fewer missed calls' },
      { number: '3x', label: 'more bookings' }
    ],
    faqs: [
      {
        question: 'Do I need new software?',
        answer: 'Not necessarily. We can integrate with your existing systems or recommend the best solution for your needs.'
      },
      {
        question: 'How fast is setup?',
        answer: 'Most systems are up and running within 1-2 weeks, with full automation within 3-4 weeks.'
      },
      {
        question: 'What if I get too many leads?',
        answer: 'Our AI systems can handle unlimited volume and will prioritize leads based on your criteria.'
      },
      {
        question: 'Can I customize the responses?',
        answer: 'Absolutely. We train the AI on your specific services, pricing, and company voice.'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <>
      <Head>
        <title>{industryConfig.industryName} AI - Dan Talks AI</title>
        <meta name="description" content={industryConfig.subheadline} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-black text-white font-['Inter']">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-screen overflow-hidden">
          {/* Enhanced background with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.1),transparent_50%)]"></div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
          
          <motion.div 
            className="relative z-10 max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8"
              variants={itemVariants}
            >
              <span className="text-white">{industryConfig.headline}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 mb-12 leading-relaxed"
              variants={itemVariants}
            >
              {industryConfig.subheadline}
            </motion.p>
            
            {/* Benefits List */}
            <motion.div 
              className="mb-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industryConfig.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-200">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button 
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center space-x-2">
                  <span>Get Started Today</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </span>
              </motion.button>
              
              <motion.button 
                className="group glass-effect hover:glass-effect-hover border-2 border-cyan-500 text-cyan-400 hover:text-cyan-300 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-500 hover:scale-105 hover-lift"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Watch Demo</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Lead Capture Form */}
        <section id="lead-form" className="py-20 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
                Get Your AI System
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you within 24 hours with your personalized AI solution.
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
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-700/70 transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-700/70 transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-700/70 transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-700/70 transition-all duration-300"
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
                    className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-700/70 transition-all duration-300"
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
                    className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-700/70 transition-all duration-300"
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
                    className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
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
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black hover:scale-105 shadow-lg hover:shadow-cyan-500/50'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={consent && !isLoading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={consent && !isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
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

        {/* Social Proof Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
                Proven Results
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See how AI automation is transforming {industryConfig.industryName.toLowerCase()} businesses
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {industryConfig.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-600/50 p-6 hover:border-cyan-500/50 transition-colors duration-300">
                    <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-600/50 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd" />
                  </svg>
                </div>
                <blockquote className="text-xl text-gray-200 mb-6 italic">
                  "Dan's AI system transformed our dumpster rental business. We went from missing 60% of leads to booking every single one. The AI handles all the routine questions and schedules jobs automatically. It's like having a full-time sales team that never sleeps."
                </blockquote>
                <div className="text-cyan-400 font-semibold">
                  Mike Johnson, Owner
                </div>
                <div className="text-gray-400 text-sm">
                  Johnson Dumpster Services
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Everything you need to know about AI automation for your {industryConfig.industryName.toLowerCase()} business
              </p>
            </motion.div>

            <div className="space-y-6">
              {industryConfig.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-600/50 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800/50 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                Dan Talks AI
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Building AI systems that work while you sleep. Transform your {industryConfig.industryName.toLowerCase()} business with intelligent automation.
              </p>
            </div>
            
            <div className="border-t border-gray-800/50 pt-8">
              <p className="text-gray-400">
                © 2024 Dan Talks AI. Built by Dan Richmond
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
