import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sample blog post data - replace with your actual data fetching
  useEffect(() => {
    if (slug) {
      // Simulate fetching blog post data
      setPost({
        id: 1,
        title: "How to Build an AI System That Works While You Sleep",
        slug: slug,
        content: `
          <p>Building an AI system that truly works while you sleep requires more than just setting up automation. It's about creating a comprehensive ecosystem that handles every aspect of your lead generation and qualification process.</p>
          
          <h2>The Foundation: CRM + Automation</h2>
          <p>Your AI system needs a solid foundation. I recommend starting with a platform that combines CRM, funnels, and automations in one place. This creates a seamless flow where leads move automatically through your pipeline.</p>
          
          <h2>AI Agents: Your 24/7 Sales Team</h2>
          <p>Voice and chat agents are the game-changers. They can handle initial conversations, qualify leads, and even book appointments without any human intervention. The key is training them with your specific FAQs and processes.</p>
          
          <h2>Integration Points</h2>
          <p>Your system needs to connect with:</p>
          <ul>
            <li>Calendar systems (Google, Outlook)</li>
            <li>Payment processors (Stripe, PayPal)</li>
            <li>Social media platforms</li>
            <li>Email marketing tools</li>
          </ul>
          
          <h2>Testing and Optimization</h2>
          <p>Start small and test each component. Monitor response rates, conversion rates, and customer satisfaction. Your AI system should get smarter over time as you refine the processes.</p>
          
          <h2>Results You Can Expect</h2>
          <p>Most clients see results within 1-3 weeks:</p>
          <ul>
            <li>300% increase in appointments</li>
            <li>20+ hours saved per week</li>
            <li>Never miss another lead</li>
            <li>24/7 customer support</li>
          </ul>
        `,
        excerpt: "Learn the step-by-step process of building an AI system that captures, qualifies, and converts leads while you sleep.",
        author: "Dan Richmond",
        publishedAt: "2024-01-15",
        readTime: "8 min read",
        category: "AI Automation",
        tags: ["AI", "Automation", "Lead Generation", "CRM", "Business Growth"]
      })
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} - Dan Talks AI</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://dantalksai.com/blog/${post.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Head>

      <main className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className="border-b border-gray-800 py-4">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-cyan-400">
              Dan Talks AI
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 mb-6">
                <span>{post.category}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-800">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{post.author}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="prose prose-invert prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-8"
                >
                  {/* Author Card */}
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">About the Author</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{post.author}</p>
                        <p className="text-sm text-gray-400">AI Automation Expert</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      Dan helps entrepreneurs build AI systems that work while they sleep. 
                      Specializing in lead generation, CRM automation, and AI agents.
                    </p>
                    <Link 
                      href="/#ai-system"
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
                    >
                      Work with Dan →
                    </Link>
                  </div>

                  {/* Related Tools - Future Affiliate Section */}
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Tools Mentioned</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">Go High Level</p>
                          <p className="text-xs text-gray-400">All-in-one CRM & automation</p>
                        </div>
                        <a href="#" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold">
                          Learn More
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">Vapi</p>
                          <p className="text-xs text-gray-400">Voice AI agents</p>
                        </div>
                        <a href="#" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold">
                          Learn More
                        </a>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      * Some links may be affiliate links
                    </p>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/30 p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Get More AI Tips</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Join the newsletter for exclusive AI automation strategies and tool recommendations.
                    </p>
                    <div className="space-y-3">
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-500"
                      />
                      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black px-4 py-2 rounded-lg font-semibold text-sm hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8 text-cyan-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Build Your AI System?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Let's chat about how AI automation can transform your business and help you capture more leads while you sleep.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/#ai-system"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
              >
                Start Building Now
              </Link>
              
              <Link 
                href="mailto:dan@dantalks.ai"
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300"
              >
                Contact Dan
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
