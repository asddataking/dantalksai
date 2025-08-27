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

  return (
    <>
      <Head>
        <title>Concrete & Excavation AI - Dan Talks AI</title>
        <meta name="description" content="AI that answers calls, sends quotes, and books jobs while you're out on the job site. Transform your concrete & excavation business with intelligent automation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-[#0B1C2E] text-white font-['Inter']">
        {/* Hero Section with Header Photo */}
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-screen overflow-hidden">
          {/* Header Photo Background */}
          <div className="absolute inset-0">
                                      <img
              src={getImageUrl('Home/Excavation1.jpg')}
              alt="Concrete & Excavation Business"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0B1C2E]/80"></div>
          </div>
          
          {/* Enhanced background with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C2E] via-[#0B1C2E]/95 to-[#0B1C2E]"></div>
          <div className="absolute inset-0 bg-[#C42B2B]/5"></div>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="50" cy="50" r="1" fill="%23C42B2B"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grain)"/%3E%3C/svg%3E')` }}></div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#C42B2B] rounded-full opacity-20"
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
              <span className="text-[#F5F7FA]">AI That Works As Hard As Your Concrete & Excavation Business.</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Stop playing phone tag with leads. I build AI systems that answer calls, send quotes, and book jobs while you're out on the job site.
            </motion.p>
            
            {/* Benefits List */}
            <motion.div 
              className="mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Never miss a lead again - AI responds instantly to every inquiry',
                  'Book jobs automatically - customers schedule themselves 24/7',
                  'Follow up until they say yes - AI nurtures prospects automatically',
                  'Cut phone calls by 80% - let AI handle the routine questions'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                  >
                    <div className="w-6 h-6 bg-[#C42B2B] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-200">{benefit}</p>
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
                  <span>Get my AI system</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
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
