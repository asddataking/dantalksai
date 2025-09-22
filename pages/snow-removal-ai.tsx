import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import RheaChatbot from '../components/RheaChatbot'
import RheaModal from '../components/RheaModal'
import Footer from '../components/Footer'
import { getImageUrl } from '../lib/storage'

export default function SnowRemovalAI() {
  const router = useRouter()
  const [isRheaModalOpen, setIsRheaModalOpen] = useState(false)

  const handleOpenRhea = () => {
    setIsRheaModalOpen(true)
  }

  const handleCloseRhea = () => {
    setIsRheaModalOpen(false)
  }

  const industryConfig = {
    industryName: 'Snow Removal',
    headline: 'AI for Residential & Commercial Snow Removal',
    subheadline: 'Never miss a plow route, quote, or service call — even during storms. Our AI answers, books, and dispatches while you’re clearing snow.',
    benefits: [
      '24/7 Call + SMS — instant responses during peak storms',
      'Automated Quotes — per push, seasonal, and emergency pricing',
      'Smart Dispatch — priority routing for residential and commercial'
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'Leads come in from your website and ads',
        icon: '📞'
      },
      {
        step: 'Step 2',
        title: 'AI quotes, qualifies, and books priority service windows',
        icon: '🤖'
      },
      {
        step: 'Step 3',
        title: 'Jobs auto-assign to routes; you plow more with less chaos',
        icon: '🚜'
      }
    ],
    faqs: [
      {
        question: 'Can this handle both residential and commercial?',
        answer: 'Yes. Configure different pricing, SLAs, and priority rules for residential driveways, HOAs, small businesses, and large commercial lots.'
      },
      {
        question: 'Does it support emergency or on-demand pushes?',
        answer: 'Absolutely. Mark requests as emergency, apply surge pricing, and slot them into the next available route automatically.'
      },
      {
        question: 'Can it estimate per-push vs seasonal contracts?',
        answer: 'Yes. The AI can collect driveway/lot details, apply your pricing tables, and send quotes via SMS/email for approval.'
      }
    ]
  }

  return (
    <>
      <Head>
        <title>{industryConfig.industryName} AI - Dan Talks AI</title>
        <meta name="description" content={industryConfig.subheadline} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-[#0B1C2E] text-white font-['Outfit']">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-16 px-4 min-h-[60vh] overflow-hidden">
          {/* Header Photo Background */}
          <div className="absolute inset-0">
            <img
              src={getImageUrl('industries/snow-removal-hero.jpg')}
              alt="Snow removal crews clearing residential driveways and commercial lots"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0B1C2E]/60" />
          </div>

          <motion.div 
            className="relative z-10 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-[#F5F7FA]">{industryConfig.headline}</span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-200 mb-12 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {industryConfig.subheadline}
            </motion.p>

            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button 
                className="group bg-[#C42B2B] hover:bg-[#A02020] text-white px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-[#C42B2B]/25"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenRhea}
              >
                <span className="flex items-center space-x-3">
                  <span>Get My AI System</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                How AI Helps Your Snow Removal Business
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white rounded-2xl p-8 text-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <p className="text-gray-800 font-semibold text-xl">{industryConfig.benefits[0]}</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-8 text-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-16 h-16 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                  </svg>
                </div>
                <p className="text-gray-800 font-semibold text-xl">{industryConfig.benefits[1]}</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-8 text-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <p className="text-gray-800 font-semibold text-xl">{industryConfig.benefits[2]}</p>
              </motion.div>
            </div>
          </div>
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
                How It Works for Snow Removal
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-4xl">
                  {industryConfig.howItWorks[0].icon}
                </div>
                <div className="text-white font-semibold mb-2">{industryConfig.howItWorks[0].step}</div>
                <p className="text-gray-300 text-lg">{industryConfig.howItWorks[0].title}</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-4xl">
                  {industryConfig.howItWorks[1].icon}
                </div>
                <div className="text-white font-semibold mb-2">{industryConfig.howItWorks[1].step}</div>
                <p className="text-gray-300 text-lg">{industryConfig.howItWorks[1].title}</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-4xl">
                  {industryConfig.howItWorks[2].icon}
                </div>
                <div className="text-white font-semibold mb-2">{industryConfig.howItWorks[2].step}</div>
                <p className="text-gray-300 text-lg">{industryConfig.howItWorks[2].title}</p>
              </motion.div>
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

        {/* Footer */}
        <Footer />
      </main>

      {/* Rhea Chatbot */}
      <RheaChatbot />

      {/* Rhea Modal */}
      <RheaModal 
        isOpen={isRheaModalOpen}
        onClose={handleCloseRhea}
        preselectedIndustry="Snow Removal"
      />
    </>
  )
}


