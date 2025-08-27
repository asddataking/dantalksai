import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import RheaChatbot from '../components/RheaChatbot'
import RheaModal from '../components/RheaModal'
import { getImageUrl } from '../lib/storage'

export default function ConcreteExcavationAI() {
  const [isRheaModalOpen, setIsRheaModalOpen] = useState(false)

  const handleOpenRhea = () => {
    console.log('Concrete & Excavation AI: Opening Rhea modal...')
    setIsRheaModalOpen(true)
    console.log('Concrete & Excavation AI: Modal state set to:', true)
  }

  const handleCloseRhea = () => {
    setIsRheaModalOpen(false)
  }

  // Industry-specific content variables for Concrete & Excavation
  const industryConfig = {
    industryName: 'Concrete & Excavation',
    headline: 'AI for Concrete & Excavation',
    subheadline: 'Capture site details and schedule walk-throughs automatically.',
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

  return (
    <>
      <Head>
        <title>{industryConfig.industryName} AI - Dan Talks AI</title>
        <meta name="description" content={industryConfig.subheadline} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-[#0B1C2E] text-white font-['Inter']">
        {/* Hero Section with Header Photo */}
        <section className="relative flex flex-col items-center justify-center text-center py-16 px-4 min-h-[60vh] overflow-hidden">
          {/* Header Photo Background */}
          <div className="absolute inset-0">
                                      <img
              src="https://prxioffyzbmygsliuabt.supabase.co/storage/v1/object/public/images/Home/Excavation1.jpg"
              alt="Concrete & Excavation Business"
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
                How It Works for Excavation
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
                  🤖
                </div>
                <div className="text-white font-semibold mb-2">Step 1</div>
                <p className="text-gray-300 text-lg">Tell Rhea about your business and services</p>
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-4xl">
                  ⚙️
                </div>
                <div className="text-white font-semibold mb-2">Step 2</div>
                <p className="text-gray-300 text-lg">We build an AI system that handles customer inquiries</p>
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-4xl">
                  🚀
                </div>
                <div className="text-white font-semibold mb-2">Step 3</div>
                <p className="text-gray-300 text-lg">You get more bookings while working on other jobs</p>
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
      </main>

      {/* Rhea Chatbot */}
      <RheaChatbot />

      {/* Rhea Modal */}
      <RheaModal 
        isOpen={isRheaModalOpen}
        onClose={handleCloseRhea}
        preselectedIndustry="Excavation"
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
