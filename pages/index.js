import Head from 'next/head'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { submitFormResponse } from '../lib/formHandler'
import { getLatestYouTubeVideo } from '../lib/youtubeApi'
import { getBlogPosts } from '../lib/blogHandler'

export default function Home() {
  const router = useRouter()
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    businessFocus: '',
    weeklyLeads: '',
    aiAgent: '',
    monthlyBudget: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [latestVideo, setLatestVideo] = useState(null)
  const [videoLoading, setVideoLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState([])
  const [blogLoading, setBlogLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  
  const heroPhrases = useMemo(() => [
    "Answer Customer Questions While You Sleep",
    "Close Sales While You Sleep",
    "Run Ad Campaigns While You Sleep",
    "Qualify Leads While You Sleep",
    "Write Follow-up Emails While You Sleep",
    "Send Invoices While You Sleep",
    "Rebook Past Clients While You Sleep",
    "Edit Video Clips While You Sleep",
    "Generate Blog Posts While You Sleep",
    "Build Your Email List While You Sleep"
  ], [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % heroPhrases.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const fetchLatestVideo = useCallback(async () => {
    setVideoLoading(true)
    const result = await getLatestYouTubeVideo()
    if (result.success) {
      setLatestVideo(result.video)
    }
    setVideoLoading(false)
  }, [])

  const fetchBlogPosts = useCallback(async () => {
    setBlogLoading(true)
    const result = await getBlogPosts()
    if (result.success) {
      setBlogPosts(result.data)
    }
    setBlogLoading(false)
  }, [])

  useEffect(() => {
    fetchLatestVideo()
  }, [fetchLatestVideo])

  useEffect(() => {
    fetchBlogPosts()
  }, [fetchBlogPosts])

  const simulateTyping = useCallback(async (delay = 1500) => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, delay))
    setIsTyping(false)
  }, [])

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (formStep < 5) {
      // Simulate typing delay before showing next question
      await simulateTyping(1200 + Math.random() * 800) // Random delay between 1.2-2 seconds
      setFormStep(formStep + 1)
    } else {
      setIsLoading(true)
      
      // Submit form data to Supabase
      const result = await submitFormResponse(formData)
      
      if (result.success) {
        // Redirect to thank you page after successful submission
        setTimeout(() => {
          router.push('/thank-you.html')
        }, 2000)
      } else {
        // Handle error - you might want to show an error message
        console.error('Form submission failed:', result.error)
        setIsLoading(false)
      }
    }
  }, [formStep, formData, router, simulateTyping])

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

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

  const formStepVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  }

  // Wave animation variants
  const waveVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Function to render hero phrase with "While you Sleep" in deep purple
  const renderHeroPhrase = (phrase) => {
    if (phrase.includes("While You Sleep")) {
      const parts = phrase.split("While You Sleep")
      return (
        <>
          {parts[0]}
          <span className="text-purple-600">While You Sleep</span>
        </>
      )
    }
    return phrase
  }

  return (
    <>
      <Head>
        <title>Dan Talks AI - Done-For-You AI Systems That Work While You Sleep</title>
        <meta name="description" content="We design done-for-you AI systems that answer leads 24/7, qualify them, and book calls while you sleep. Transform your business with AI automation." />
        <meta name="keywords" content="AI automation, lead generation, CRM automation, AI agents, business automation, lead qualification" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dan Talks AI",
              "description": "We design done-for-you AI systems that answer leads 24/7, qualify them, and book calls while you sleep.",
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
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What does Dan Talks AI actually build?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We design done-for-you AI systems that answer leads 24/7, qualify them, and book calls while you sleep. Our core setup is a software system that manages CRM, automations, and calendars, but we can also deploy chat or voice agents using tools like Vapi, Synthflow, or a custom stack."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need a specific software system?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not necessarily. We usually recommend a central software system because it combines CRM, funnels, and automations in one place. If you're already on another platform, we can integrate with it. For chat or voice agents we often use Vapi or Synthflow and still route leads and bookings into your system."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How fast will I see results?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most clients notice more replies and booked calls within 1–3 weeks. ROI depends on your close rate and service pricing, but just a few extra appointments per week usually covers the cost of the system."
                  }
                }
              ]
            })
          }}
        />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      

      <main className="min-h-screen bg-black text-white">
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
              className="text-6xl md:text-8xl font-bold mb-8"
              variants={itemVariants}
            >
              <span className="text-white">Dan Talks</span>
              <span className="text-cyan-400"> AI</span>
            </motion.h1>
            
            <motion.div 
              className="h-32 md:h-40 mb-8"
              variants={itemVariants}
            >
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={currentPhrase}
                  className="text-4xl md:text-6xl font-bold text-cyan-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderHeroPhrase(heroPhrases[currentPhrase])}
                </motion.h2>
              </AnimatePresence>
            </motion.div>
            
            {/* Animated Talking Waves */}
            <motion.div 
              className="flex justify-center items-center mb-6"
              variants={itemVariants}
            >
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-8 bg-cyan-400 rounded-full"
                    variants={waveVariants}
                    animate="animate"
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 mb-12 leading-relaxed"
              variants={itemVariants}
            >
              AI systems that book, follow up, and convert leads — even while you sleep.
            </motion.p>
            
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <Link 
                href="/faq"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-lg"
              >
                <span>Have questions? Check out our FAQ</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button 
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50 pulse-glow hover:pulse-glow"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <span>Get the AI System</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
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
                  <span>Watch Demo First</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* ChatGPT-Style AI System Builder */}
        <motion.section 
          id="ai-system"
          className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-12 text-cyan-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Chat with Rhea to Build Your AI System
            </motion.h2>
            
            <motion.div className="glass-effect rounded-2xl border border-gray-600/50 overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
              {/* Chat Header */}
              <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-600/50 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center pulse-glow">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white neon-glow">Rhea - Dan Talks AI Assistant</h3>
                    <p className="text-sm text-gray-400">Hi! I'm here to help you build an AI system that works while you sleep</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {/* AI Welcome Message */}
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 pulse-glow">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-sm border border-gray-600/30 shadow-lg">
                    <p className="text-gray-300">Hi there! I'm Rhea, your AI assistant from Dan Talks AI. I'm excited to help you build a system that works while you sleep! First, what's your name?</p>
                  </div>
                </div>

                {/* Name Question */}
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 pulse-glow">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-sm border border-gray-600/30 shadow-lg">
                    <p className="text-gray-300">What's your name?</p>
                  </div>
                </div>

                {/* User Name Answer */}
                {formData.name && (
                  <div className="flex space-x-3 justify-end">
                    <div className="bg-cyan-600/20 backdrop-blur-sm border border-cyan-500/40 rounded-2xl px-4 py-3 max-w-sm shadow-lg">
                      <p className="text-cyan-300 font-medium">{formData.name}</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Question 1 - Business Focus */}
                {formData.name && (
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-4 py-3 max-w-sm">
                      <p className="text-gray-300">Nice to meet you, {formData.name}! What type of business are you in?</p>
                    </div>
                  </div>
                )}

                {/* User Answer 1 */}
                {formData.businessFocus && (
                  <div className="flex space-x-3 justify-end">
                    <div className="bg-cyan-600/20 border border-cyan-500/30 rounded-2xl px-4 py-3 max-w-sm">
                      <p className="text-cyan-300">{formData.businessFocus}</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Typing Indicator */}
                {formData.businessFocus && isTyping && formStep === 2 && (
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                          />
                        </div>
                        <span className="text-gray-400 text-sm">Rhea is typing...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Question 2 */}
                {formData.businessFocus && (
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-4 py-3 max-w-sm">
                      <p className="text-gray-300">That sounds interesting, {formData.name}! How many new leads would make a real difference in your week?</p>
                    </div>
                  </div>
                )}

                {/* User Answer 2 */}
                {formData.weeklyLeads && (
                  <div className="flex space-x-3 justify-end">
                    <div className="bg-cyan-600/20 border border-cyan-500/30 rounded-2xl px-4 py-3 max-w-sm">
                      <p className="text-cyan-300">{formData.weeklyLeads} leads</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Typing Indicator for Step 3 */}
                {formData.weeklyLeads && isTyping && formStep === 3 && (
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                          />
                        </div>
                        <span className="text-gray-400 text-sm">Rhea is typing...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Question 3 */}
                {formData.weeklyLeads && (
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-4 py-3 max-w-sm">
                      <p className="text-gray-300">Got it! Would you like an AI agent to handle your lead conversations, {formData.name}?</p>
                    </div>
                  </div>
                )}

                {/* User Answer 3 */}
                {formData.aiAgent && (
                  <div className="flex space-x-3 justify-end">
                    <div className="bg-cyan-600/20 border border-cyan-500/30 rounded-2xl px-4 py-3 max-w-sm">
                      <p className="text-cyan-300">{formData.aiAgent === 'yes' ? 'Yes, that would be great!' : 'No, I prefer to handle it myself'}</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Question 4 */}
                {formData.aiAgent && (
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-4 py-3 max-w-sm">
                      <p className="text-gray-300">Perfect! Last question, {formData.name}. What's your monthly budget for automation?</p>
                    </div>
                  </div>
                )}

                {/* User Answer 4 */}
                {formData.monthlyBudget && (
                  <div className="flex space-x-3 justify-end">
                    <div className="bg-cyan-600/20 border border-cyan-500/30 rounded-2xl px-4 py-3 max-w-sm">
                      <p className="text-cyan-300">{formData.monthlyBudget}</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* AI Response */}
                {formData.monthlyBudget && (
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-4 py-3 max-w-sm">
                      <p className="text-gray-300">Perfect, {formData.name}! I have everything I need to design your AI system. This is going to be amazing! Ready to get started?</p>
                    </div>
                  </div>
                )}

                {/* Loading State */}
                {isLoading && (
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full"
                        ></motion.div>
                        <span className="text-gray-300">Processing your request...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-700 p-4">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {formStep === 1 && (
                      <motion.div
                        key="step1"
                        variants={formStepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          placeholder="Type your name here..."
                          className="w-full px-4 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-800/60 transition-all duration-300 shadow-lg"
                          required
                        />
                      </motion.div>
                    )}

                    {formStep === 2 && (
                      <motion.div
                        key="step2"
                        variants={formStepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <input
                          type="text"
                          value={formData.businessFocus}
                          onChange={(e) => updateFormData('businessFocus', e.target.value)}
                          placeholder="Type your business focus here..."
                          className="w-full px-4 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-800/60 transition-all duration-300 shadow-lg"
                          required
                        />
                      </motion.div>
                    )}

                    {formStep === 3 && (
                      <motion.div
                        key="step3"
                        variants={formStepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <input
                          type="number"
                          value={formData.weeklyLeads}
                          onChange={(e) => updateFormData('weeklyLeads', e.target.value)}
                          placeholder="Enter number of leads..."
                          className="w-full px-4 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-800/60 transition-all duration-300 shadow-lg"
                          required
                        />
                      </motion.div>
                    )}

                    {formStep === 4 && (
                      <motion.div
                        key="step4"
                        variants={formStepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => updateFormData('aiAgent', 'yes')}
                            className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 shadow-lg ${
                              formData.aiAgent === 'yes'
                                ? 'border-cyan-500 bg-cyan-500 text-black shadow-cyan-500/50'
                                : 'border-gray-600 text-gray-300 hover:border-cyan-500 hover:bg-gray-700/50 hover:shadow-cyan-500/20 backdrop-blur-sm'
                            }`}
                          >
                            Yes, that would be great!
                          </button>
                          <button
                            type="button"
                            onClick={() => updateFormData('aiAgent', 'no')}
                            className={`px-4 py-3 border-2 text-sm font-semibold transition-all duration-300 rounded-xl shadow-lg ${
                              formData.aiAgent === 'no'
                                ? 'border-cyan-500 bg-cyan-500 text-black shadow-cyan-500/50'
                                : 'border-gray-600 text-gray-300 hover:border-cyan-500 hover:bg-gray-700/50 hover:shadow-cyan-500/20 backdrop-blur-sm'
                            }`}
                          >
                            No, I prefer to handle it myself
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {formStep === 5 && (
                      <motion.div
                        key="step5"
                        variants={formStepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <input
                          type="text"
                          value={formData.monthlyBudget}
                          onChange={(e) => updateFormData('monthlyBudget', e.target.value)}
                          placeholder="Enter your monthly budget..."
                          className="w-full px-4 py-3 bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-800/60 transition-all duration-300 shadow-lg"
                          required
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isLoading && (
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed pulse-glow hover:pulse-glow"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>{formStep < 5 ? 'Continue' : 'Build My AI System'}</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </motion.button>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* AI Tools & Talk Section - Substack Style */}
        <motion.section 
          id="blog"
          className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
                AI Tips, Tools & Talk
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Weekly insights on AI automation, lead generation, and building systems that work while you sleep.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogLoading ? (
                // Enhanced loading state with glass effects
                Array.from({ length: 3 }).map((_, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-800/30 backdrop-blur-md p-6 rounded-2xl border border-gray-600/50 shadow-xl hover:shadow-2xl transition-all duration-500"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-700/50 rounded-lg mb-4 shimmer-effect"></div>
                      <div className="h-4 bg-gray-700/50 rounded mb-2 shimmer-effect"></div>
                      <div className="h-4 bg-gray-700/50 rounded mb-2 shimmer-effect"></div>
                      <div className="h-4 bg-gray-700/50 rounded mb-6 shimmer-effect"></div>
                      <div className="h-4 bg-cyan-600/30 rounded w-1/3 shimmer-effect"></div>
                    </div>
                  </motion.div>
                ))
              ) : blogPosts.length > 0 ? (
                // Enhanced blog posts with glass effects and animations
                blogPosts.map((post, index) => (
                  <motion.div 
                    key={post.id}
                    className="group bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-600/50 hover:border-cyan-400/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    {/* Blog Post Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      <img 
                        src={post.image || `https://picsum.photos/400/300?random=${index + 1}`}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-cyan-500/90 text-black text-xs font-semibold px-3 py-1 rounded-full">
                          AI Tips
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="relative overflow-hidden">
                        {/* Glowing border effect on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                            {post.snippet}
                          </p>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-all duration-300 group-hover:translate-x-1"
                          >
                            Read More 
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                // Enhanced no posts found state
                <motion.div 
                  className="col-span-full text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gray-800/30 backdrop-blur-md p-8 rounded-2xl border border-gray-600/50 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-lg mb-2">No blog posts found</p>
                    <p className="text-gray-500">Check back soon for fresh AI insights!</p>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Newsletter signup */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="glass-effect p-8 rounded-2xl border border-gray-600/50 max-w-2xl mx-auto hover:glass-effect-hover transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400 neon-glow">Stay Updated</h3>
                <p className="text-gray-300 mb-6">Get the latest AI automation tips and case studies delivered to your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-700/70 transition-all duration-300 shadow-lg"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50 pulse-glow hover:pulse-glow">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Video Section */}
        <motion.section 
          id="video"
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Latest From Dan Talks AI
            </motion.h2>
            
            <motion.div 
              className="aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {videoLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
                    ></motion.div>
                    <p className="text-xl text-gray-300">Loading video...</p>
                  </div>
                </div>
              ) : latestVideo ? (
                <iframe
                  src={`https://www.youtube.com/embed/${latestVideo.id.videoId}`}
                  title={latestVideo.snippet.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xl text-gray-300">Latest YouTube Video</p>
                    <p className="text-gray-500">Coming soon...</p>
                  </div>
                </div>
              )}
            </motion.div>
            
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More on YouTube
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* FAQ Link Section */}
        <motion.section 
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8 text-cyan-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Have Questions?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Get answers to all your questions about AI automation, lead generation, and building systems that work while you sleep.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/faq"
                className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
              >
                <span>View All FAQs</span>
                <svg className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Social Proof Section */}
        <motion.section 
          id="testimonials"
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Real Results from Real Entrepreneurs
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Real Estate Agent",
                  result: "Increased appointments by 300%",
                  testimonial: "Dan's AI system transformed my business. I went from 5 appointments a month to 15+ while working less."
                },
                {
                  name: "Mike Chen",
                  role: "Consultant",
                  result: "Saved 20+ hours per week",
                  testimonial: "The automation is incredible. My calendar is now full of qualified prospects without any manual work."
                },
                {
                  name: "Lisa Rodriguez",
                  role: "Fitness Coach",
                  result: "Doubled revenue in 3 months",
                  testimonial: "This AI system is like having a full-time assistant that never sleeps. Game changer for my business."
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.testimonial}"</p>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                    <p className="text-green-400 text-sm font-semibold">{testimonial.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="py-16 px-4 bg-gray-900 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Dan Talks AI</h3>
                <p className="text-gray-400 mb-4">
                  Done-for-you AI systems that work while you sleep.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href="https://twitter.com/dantalksai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110 transform duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com/@dantalksai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110 transform duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/company/dantalksai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110 transform duration-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Services */}
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer">AI Lead Qualification</a></li>
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer">CRM Automation</a></li>
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer">Voice Agents</a></li>
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer">Chat Agents</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/#blog" className="hover:text-cyan-400 transition-colors cursor-pointer">Blog</a></li>
                  <li><a href="/#testimonials" className="hover:text-cyan-400 transition-colors cursor-pointer">Case Studies</a></li>
                  <li><a href="/#video" className="hover:text-cyan-400 transition-colors cursor-pointer">YouTube</a></li>
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer">Free Guide</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Michigan, USA</li>
                  <li><a href="mailto:dan@dantalks.ai" className="hover:text-cyan-400 transition-colors">dan@dantalks.ai</a></li>
                  <li><a href="mailto:dan@dantalks.ai?subject=Workshop%20Inquiry" className="hover:text-cyan-400 transition-colors cursor-pointer">Available for workshops</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400 mb-4">
                © 2024 Dan Talks AI. Built by <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Dan Richmond</a>
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>

          {/* Floating Social Button */}
          <motion.a 
            href="https://twitter.com/dantalksai"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-black border-2 border-cyan-500 text-cyan-400 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-cyan-500 hover:text-black transition-all duration-300 z-50 pulse-glow hover:pulse-glow cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Follow on X
          </motion.a>
        </motion.footer>

        {/* Floating Action Button with Particles */}
        <motion.div 
          className="fixed bottom-6 left-6 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Link 
            href="/#ai-system"
            className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-black px-6 py-3 rounded-full font-semibold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 block"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
              </svg>
              <span>Get Started</span>
            </span>
            
            {/* Floating particles around button */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                  y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                  opacity: [0.6, 0, 0.6],
                  scale: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </Link>
        </motion.div>
      </main>
    </>
  )
}
