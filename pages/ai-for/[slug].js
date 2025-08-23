import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { generateFAQSchema } from '../../lib/seo'
import { trackAIForPageView, trackAIForToolClick, trackPulseItemClick } from '../../lib/analytics'
import { useEffect, useState } from 'react'
import { getTopicPulse, PulseItem } from '../../lib/data/aiPulse'
import { getToolsForTopic, AffiliateTool } from '../../lib/data/affiliates'

export default function AIForPage() {
  const router = useRouter()
  const { slug } = router.query
  const [topicPulse, setTopicPulse] = useState([])
  const [affiliateTools, setAffiliateTools] = useState([])
  const [loading, setLoading] = useState(true)

  // Track page view
  useEffect(() => {
    if (slug) {
      trackAIForPageView(slug)
    }
  }, [slug])

  // Fetch topic-specific data
  useEffect(() => {
    if (slug) {
      fetchTopicData()
    }
  }, [slug])

  const fetchTopicData = async () => {
    try {
      setLoading(true)
      const topic = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      
      const [pulse, tools] = await Promise.all([
        getTopicPulse(topic),
        getToolsForTopic(topic)
      ])
      
      setTopicPulse(pulse)
      setAffiliateTools(tools)
    } catch (error) {
      console.error('Error fetching topic data:', error)
    } finally {
      setLoading(false)
    }
  }

  // For now, use placeholder data
  // Later this will be fetched from Supabase based on slug
  const topic = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'AI Tools'
  
  const defaultExplainer = "Yes—there are useful AI tools for this. Here's how I'd approach it in the real world, plus a few tools I actually use or recommend."
  
  const defaultTools = affiliateTools.length > 0 ? affiliateTools.map(tool => ({
    name: tool.name,
    short_desc: tool.description,
    url: tool.affiliate_url,
    affiliate: true
  })) : [
    {
      name: "ChatGPT",
      short_desc: "AI assistant for content creation and brainstorming",
      url: "#",
      affiliate: false
    },
    {
      name: "Jasper",
      short_desc: "AI copywriting tool for marketing content",
      url: "#",
      affiliate: true
    },
    {
      name: "Copy.ai",
      short_desc: "AI-powered copywriting and content generation",
      url: "#",
      affiliate: true
    }
  ]

  const defaultFaqs = [
    {
      q: `What AI tools work best for ${topic.toLowerCase()}?`,
      a: `For ${topic.toLowerCase()}, I recommend starting with ChatGPT for general tasks, then adding specialized tools based on your specific needs. The key is to start simple and build up.`
    },
    {
      q: `How much should I expect to spend on AI tools for ${topic.toLowerCase()}?`,
      a: `Most AI tools range from $10-50/month. Start with free tiers to test, then upgrade as you see results. The ROI usually justifies the investment within 1-2 months.`
    },
    {
      q: `Can AI really replace human work in ${topic.toLowerCase()}?`,
      a: `AI won't replace humans, but it will make you much more efficient. Think of it as having a brilliant assistant who never sleeps and can handle repetitive tasks while you focus on strategy.`
    }
  ]

  const relatedSearches = [
    'automation',
    'productivity',
    'marketing',
    'content creation',
    'customer service'
  ]

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading AI tools...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>AI for {topic} - Dan Talks AI</title>
        <meta 
          name="description" 
          content={`Discover the best AI tools for ${topic.toLowerCase()}. Get real recommendations, tutorials, and setup guides from Dan Talks AI.`} 
        />
        <meta name="keywords" content={`AI tools, ${topic.toLowerCase()}, automation, artificial intelligence, productivity`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`AI for ${topic} - Dan Talks AI`} />
        <meta property="og:description" content={`Discover the best AI tools for ${topic.toLowerCase()}. Get real recommendations and setup guides.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://dantalksai.com/ai-for/${slug}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`AI for ${topic} - Dan Talks AI`} />
        <meta name="twitter:description" content={`Discover the best AI tools for ${topic.toLowerCase()}. Get real recommendations and setup guides.`} />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(defaultFaqs))
          }}
        />
        
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                AI for <span className="text-cyan-400">{topic}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                {defaultExplainer}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-black via-gray-900/50 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Recommended AI Tools
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Here are the tools I actually use and recommend for {topic.toLowerCase()}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {defaultTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 p-6 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {tool.name}
                    </h3>
                    {tool.affiliate && (
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                        Affiliate
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {tool.short_desc}
                  </p>
                  
                  <a
                    href={tool.url}
                    onClick={() => trackAIForToolClick(slug, tool.name, tool.url)}
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* CTA Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Get My Starter Setup
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Ready to get started? I'll show you exactly how to set up these AI tools and get them working for your business.
                </p>
                <Link
                  href="/affiliate-tools"
                  className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  Browse My Tool Stack
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Latest Pulse on Topic */}
        {topicPulse.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Latest Pulse on {topic}
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Recent AI news and updates related to {topic.toLowerCase()}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topicPulse.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 p-6 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {new Date(item.published_at).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full">
                          {item.source}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {item.summary}
                      </p>
                      
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackPulseItemClick(item.id, 'ai_for_page', item.title)}
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
                      >
                        Read More
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-300">
                Common questions about AI tools for {topic.toLowerCase()}
              </p>
            </motion.div>

            <div className="space-y-4">
              {defaultFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-600/50 p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Searches */}
        <section className="py-16 px-4 bg-gradient-to-t from-black via-gray-900/50 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Related Searches
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {relatedSearches.map((search) => (
                  <Link
                    key={search}
                    href={`/ai-for/${search}`}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all hover:border-cyan-500/50 hover:text-cyan-400"
                  >
                    {search.charAt(0).toUpperCase() + search.slice(1)}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
