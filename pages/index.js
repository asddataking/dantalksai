import Head from 'next/head'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { submitFormResponse } from '../lib/formHandler'
import { getLatestYouTubeVideo } from '../lib/youtubeApi'
import { getBlogPosts } from '../lib/blogHandler'
import AffiliateToolsSection from '../components/AffiliateToolsSection'

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
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
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
                  <span>Watch Demo First</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* ChatGPT-Style AI System Builder */}
        <motion.section 
          id="ai-system"
          className="py-20 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
                Build Your AI System in 5 Simple Steps
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Answer a few questions and get a personalized AI automation strategy that works while you sleep.
              </p>
            </motion.div>

            <motion.div 
              className="glass-effect rounded-3xl border border-white/10 p-8 md:p-12"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                  {formStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">👋</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Welcome! What's your name?</h3>
                        <p className="text-gray-400">Let's start building your AI system together.</p>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          placeholder="Enter your name..."
                          className="w-full px-6 py-4 bg-gray-800/40 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-800/60 transition-all duration-300 shadow-lg"
                          required
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">What's your main business focus?</h3>
                        <p className="text-gray-400">This helps us tailor your AI strategy.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Lead Generation', 'Customer Service', 'Sales Automation', 'Content Creation', 'Data Analysis', 'Other'].map((focus) => (
                          <motion.button
                            key={focus}
                            type="button"
                            onClick={() => updateFormData('businessFocus', focus)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                              formData.businessFocus === focus
                                ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                                : 'border-gray-600/50 bg-gray-800/30 text-gray-300 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                            }`}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="font-medium">{focus}</span>
                            {formData.businessFocus === focus && (
                              <motion.div 
                                className="inline-block ml-2 text-cyan-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                ✓
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">How many leads do you want weekly?</h3>
                        <p className="text-gray-400">Let's set realistic AI-powered goals.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['1-10', '11-50', '51-100', '100-500', '500+'].map((range) => (
                          <motion.button
                            key={range}
                            type="button"
                            onClick={() => updateFormData('weeklyLeads', range)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center group ${
                              formData.weeklyLeads === range
                                ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                                : 'border-gray-600/50 bg-gray-800/30 text-gray-300 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                            }`}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="font-medium">{range}</span>
                            {formData.weeklyLeads === range && (
                              <motion.div 
                                className="inline-block ml-2 text-cyan-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                ✓
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {formStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">🤖</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">What type of AI agent do you need?</h3>
                        <p className="text-gray-400">Choose the automation that fits your workflow.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Chat Agent', 'Voice Agent', 'Email Agent', 'Social Media Agent', 'Multi-Channel Agent'].map((agent) => (
                          <motion.button
                            key={agent}
                            type="button"
                            onClick={() => updateFormData('aiAgent', agent)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                              formData.aiAgent === agent
                                ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                                : 'border-gray-600/50 bg-gray-800/30 text-gray-300 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                            }`}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="font-medium">{agent}</span>
                            {formData.aiAgent === agent && (
                              <motion.div 
                                className="inline-block ml-2 text-cyan-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                ✓
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {formStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">💰</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">What's your monthly budget for AI tools?</h3>
                        <p className="text-gray-400">We'll recommend solutions that fit your investment level.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['$0-100', '$100-500', '$500-1000', '$1000-2500', '$2500+'].map((budget) => (
                          <motion.button
                            key={budget}
                            type="button"
                            onClick={() => updateFormData('monthlyBudget', budget)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center group ${
                              formData.monthlyBudget === budget
                                ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                                : 'border-gray-600/50 bg-gray-800/30 text-gray-300 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                            }`}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="font-medium">{budget}</span>
                            {formData.monthlyBudget === budget && (
                              <motion.div 
                                className="inline-block ml-2 text-cyan-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                ✓
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
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

                {isLoading && (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-cyan-400 font-medium text-lg">Building your AI system...</p>
                    <p className="text-gray-400 text-sm mt-2">This will only take a moment</p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.section>

        {/* AI Tools & Talk Section - Substack Style */}
        <motion.section 
          id="blog"
          className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 mb-6 shadow-cyan-glow">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>Latest Insights</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-strong">
                <span className="text-white">AI Tips, Tools & Talk</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto text-shadow-medium">
                Weekly insights on AI automation, lead generation, and building systems that work while you sleep.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogLoading ? (
                // Enhanced loading state with premium effects
                Array.from({ length: 3 }).map((_, index) => (
                  <motion.div 
                    key={index}
                    className="card-premium p-6 rounded-2xl border border-gray-600/50 shadow-premium hover:shadow-premium-hover"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="loading-premium rounded-lg h-48 mb-4"></div>
                    <div className="space-y-3">
                      <div className="loading-premium h-6 rounded-lg"></div>
                      <div className="loading-premium h-4 rounded w-3/4"></div>
                      <div className="loading-premium h-4 rounded w-1/2"></div>
                      <div className="loading-premium h-4 rounded w-2/3"></div>
                    </div>
                  </motion.div>
                ))
              ) : blogPosts.length > 0 ? (
                // Enhanced blog posts with premium effects
                blogPosts.map((post, index) => (
                  <motion.div 
                    key={post.id}
                    className="card-premium group overflow-hidden rounded-2xl border border-gray-600/50 shadow-premium hover:shadow-premium-hover"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    {/* Enhanced Blog Post Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      <img 
                        src={post.image || `https://picsum.photos/400/300?random=${index + 1}`}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Enhanced Category Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-cyan-glow">
                          AI Tips
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="relative overflow-hidden">
                        {/* Enhanced glowing border effect on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300 text-shadow-soft">
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
                  <div className="card-premium p-8 rounded-2xl border border-gray-600/50 max-w-md mx-auto shadow-premium">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-cyan-glow">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-lg mb-2 text-shadow-soft">No blog posts found</p>
                    <p className="text-gray-500">Check back soon for fresh AI insights!</p>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Newsletter signup */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-effect p-8 rounded-2xl border border-gray-600/50 max-w-2xl mx-auto hover:glass-effect-hover transition-all duration-500">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Stay Updated</h3>
                <p className="text-gray-300 mb-6">Get the latest AI automation tips and case studies delivered to your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-700/70 transition-all duration-300 shadow-lg"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50">
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
          className="py-20 px-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-shadow-strong"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-white">Latest From</span>
              <br />
              <span className="text-gradient-primary neon-glow-cyan">Dan Talks AI</span>
            </motion.h2>
            
            <motion.div 
              className="aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 border border-gray-600/50"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
            >
              {videoLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4 shadow-cyan-glow"
                    ></motion.div>
                    <p className="text-xl text-cyan-400 font-medium text-shadow-soft">Loading video...</p>
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
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-cyan-glow">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xl text-cyan-400 font-medium mb-2 text-shadow-soft">Latest YouTube Video</p>
                    <p className="text-gray-500">Coming soon...</p>
                  </div>
                </div>
              )}
            </motion.div>
            
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="btn-premium px-8 py-4 rounded-xl font-bold text-lg text-white shadow-premium hover:shadow-premium-hover"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                More on YouTube
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* FAQ Link Section */}
        <motion.section 
          className="py-20 px-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8 text-shadow-strong"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-white">Have Questions?</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto text-shadow-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Get answers to all your questions about AI automation, lead generation, and building systems that work while you sleep.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/faq"
                className="btn-premium inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white shadow-premium hover:shadow-premium-hover"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View FAQ</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
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

        {/* Enhanced Footer */}
        <motion.footer 
          className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800/50 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Enhanced Company Info */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gradient-primary neon-glow-cyan mb-4">Dan Talks AI</h3>
                <p className="text-gray-400 mb-4 text-shadow-soft">
                  Building AI systems that work while you sleep. Transform your business with intelligent automation.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href="https://twitter.com/dantalksai" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/dantalksai" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Enhanced Services */}
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-white mb-4 text-shadow-soft">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">AI System Design</a></li>
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">Lead Generation</a></li>
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">CRM Automation</a></li>
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">Voice Agents</a></li>
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">Chat Agents</a></li>
                </ul>
              </div>

              {/* Enhanced Resources */}
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-white mb-4 text-shadow-soft">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/#blog" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">Blog</a></li>
                  <li><a href="/#testimonials" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">Case Studies</a></li>
                  <li><a href="/#video" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">YouTube</a></li>
                  <li><a href="/#ai-system" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">Free Guide</a></li>
                </ul>
              </div>

              {/* Enhanced Contact */}
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-white mb-4 text-shadow-soft">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="text-shadow-soft">Michigan, USA</li>
                  <li><a href="mailto:dan@dantalks.ai" className="hover:text-cyan-400 transition-colors text-shadow-soft">dan@dantalks.ai</a></li>
                  <li><a href="mailto:dan@dantalks.ai?subject=Workshop%20Inquiry" className="hover:text-cyan-400 transition-colors cursor-pointer text-shadow-soft">Available for workshops</a></li>
                </ul>
              </div>
            </div>

            {/* Enhanced Bottom Section */}
            <div className="border-t border-gray-800/50 pt-8 text-center">
              <p className="text-gray-400 mb-4 text-shadow-soft">
                © 2024 Dan Talks AI. Built by <a href="#" className="text-gradient-primary hover:text-cyan-300 transition-colors">Dan Richmond</a>
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-cyan-400 transition-colors text-shadow-soft">Privacy Policy</a>
                <a href="#" className="hover:text-cyan-400 transition-colors text-shadow-soft">Terms of Service</a>
                <a href="#" className="hover:text-cyan-400 transition-colors text-shadow-soft">Cookie Policy</a>
              </div>
            </div>
          </div>

          {/* Enhanced Floating Social Button */}
          <motion.a 
            href="https://twitter.com/dantalksai"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-black border-2 border-cyan-500 text-cyan-400 px-6 py-3 rounded-full font-semibold shadow-cyan-glow hover:shadow-premium-hover transition-all duration-300 z-50 cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
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
