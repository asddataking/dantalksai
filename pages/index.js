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

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (formStep < 4) {
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
  }, [formStep, formData, router])

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
        <title>Dan Talks AI - AI-Powered Appointment Booking System</title>
        <meta
          name="description"
          content="AI systems that book, follow up, and convert leads — even while you sleep."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      

      <main className="bg-black text-white min-h-screen font-['Inter']">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
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
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get the AI System
              </motion.button>
              <motion.button 
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo First
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Multi-Step Form Section */}
        <motion.section 
          className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-12 text-cyan-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Get Your AI System
            </motion.h2>
            
            <motion.div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
              <form onSubmit={handleFormSubmit} className="space-y-8">
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
                      <label className="block text-xl font-semibold mb-4 text-white">
                        What's your business focus?
                      </label>
                      <input
                        type="text"
                        value={formData.businessFocus}
                        onChange={(e) => updateFormData('businessFocus', e.target.value)}
                        placeholder="e.g., Real estate, Consulting, Fitness..."
                        className="w-full px-6 py-4 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none text-lg"
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
                      <label className="block text-xl font-semibold mb-4 text-white">
                        How many new leads would change your week?
                      </label>
                      <input
                        type="number"
                        value={formData.weeklyLeads}
                        onChange={(e) => updateFormData('weeklyLeads', e.target.value)}
                        placeholder="e.g., 5, 10, 20..."
                        className="w-full px-6 py-4 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none text-lg"
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
                      <label className="block text-xl font-semibold mb-4 text-white">
                        Would you like an AI agent to contact your leads?
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => updateFormData('aiAgent', 'yes')}
                          className={`px-6 py-4 rounded-xl border-2 text-lg font-semibold transition-all ${
                            formData.aiAgent === 'yes'
                              ? 'border-cyan-500 bg-cyan-500 text-black'
                              : 'border-gray-600 text-gray-300 hover:border-cyan-500'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => updateFormData('aiAgent', 'no')}
                          className={`px-6 py-4 rounded-xl border-2 text-lg font-semibold transition-all ${
                            formData.aiAgent === 'no'
                              ? 'border-cyan-500 bg-cyan-500 text-black'
                              : 'border-gray-600 text-gray-300 hover:border-cyan-500'
                          }`}
                        >
                          No
                        </button>
                      </div>
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
                      <label className="block text-xl font-semibold mb-4 text-white">
                        What's your monthly budget for automation?
                      </label>
                      <select
                        value={formData.monthlyBudget}
                        onChange={(e) => updateFormData('monthlyBudget', e.target.value)}
                        className="w-full px-6 py-4 rounded-xl bg-gray-700 border border-gray-600 text-white focus:border-cyan-500 focus:outline-none text-lg"
                        required
                      >
                        <option value="">Select budget range</option>
                        <option value="<$100">Less than $100</option>
                        <option value="$100-$500">$100 – $500</option>
                        <option value="$500-$2K">$500 – $2K</option>
                        <option value="$2K+">$2K+</option>
                      </select>
                    </motion.div>
                  )}

                  {isLoading && (
                    <motion.div
                      key="loading"
                      variants={formStepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
                      ></motion.div>
                      <p className="text-xl text-cyan-400 font-semibold">One moment...</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isLoading && (
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black px-8 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formStep < 4 ? 'Next' : 'Get My AI System'}
                  </motion.button>
                )}
              </form>
            </motion.div>
          </div>
        </motion.section>

        {/* Video Section */}
        <motion.section 
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

        {/* Blog Section */}
        <motion.section 
          className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
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
              AI Tips, Tools & Talk
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogLoading ? (
                // Loading state
                Array.from({ length: 3 }).map((_, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-700 rounded mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded mb-6"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/3"></div>
                    </div>
                  </motion.div>
                ))
              ) : blogPosts.length > 0 ? (
                // Blog posts from Supabase
                blogPosts.map((post, index) => (
                  <motion.div 
                    key={post.id}
                    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-colors"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-white">{post.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{post.snippet}</p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    >
                      Read More →
                    </Link>
                  </motion.div>
                ))
              ) : (
                // No blog posts found
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">No blog posts found. Check back soon!</p>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Social Proof Section */}
        <motion.section 
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
          className="py-12 px-4 bg-gray-900 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 mb-4">
              Built by <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Dan Richmond</a>
            </p>
            <motion.button 
              className="fixed bottom-6 right-6 bg-black border-2 border-cyan-500 text-cyan-400 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-cyan-500 hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Follow on X
            </motion.button>
          </div>
        </motion.footer>
      </main>
    </>
  )
}
