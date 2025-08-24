import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getAllBlogPosts } from '../../lib/blogHandler'
import ImageBanner from '../../components/ImageBanner'

// Blog post type definition
// interface BlogPost {
//   id: number
//   title: string
//   slug: string
//   snippet: string
//   featured_image?: string
//   created_at: string
// }

export default function BlogIndex() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllBlogPosts()
  }, [])

  const fetchAllBlogPosts = async () => {
    try {
      setLoading(true)
      const result = await getAllBlogPosts()
      if (result.success) {
        setBlogPosts(result.data)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1C2E] text-white">
        <div className="py-20 px-4">
          <div className="mx-auto max-w-6xl text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-96 mx-auto mb-16"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-800 rounded-2xl h-80"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Blog | Dan Talks AI</title>
        <meta name="description" content="Real insights from building AI systems for hardworking businesses. Learn about automation, lead generation, and AI implementation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-[#0B1C2E] text-white">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-6xl text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 text-[#F5F7FA] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Blog
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-[70ch] mx-auto text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Real insights from building AI systems for hardworking businesses.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#C42B2B] hover:text-[#A02020] font-medium transition-colors"
              >
                ← Back to Home
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 px-4">
          <div className="mx-auto max-w-6xl">
            {blogPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-[#F5F7FA] mb-4">No posts yet</h2>
                <p className="text-gray-300 mb-8">Check back soon for insights and updates.</p>
                <Link
                  href="/"
                  className="bg-[#C42B2B] hover:bg-[#A02020] text-white px-8 py-3 rounded-2xl font-medium transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {/* Featured Image */}
                      {post.featured_image ? (
                        <div className="relative h-48 overflow-hidden">
                          <ImageBanner
                            src={post.featured_image}
                            alt={post.title}
                            overlay={0.3}
                            className="h-full"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-[#0B1C2E] to-[#C42B2B] flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-4xl mb-2">📝</div>
                            <div className="text-sm opacity-80">AI Insights</div>
                          </div>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="text-sm text-[#C42B2B] font-medium mb-2">
                          {formatDate(post.created_at)}
                        </div>
                        
                        <h3 className="text-xl font-bold text-[#0B1C2E] mb-3 leading-tight hover:text-[#C42B2B] transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.snippet}
                        </p>
                        
                        <div className="flex items-center gap-2 text-[#C42B2B] font-medium text-sm group">
                          <span>Read more</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
