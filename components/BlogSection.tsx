import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getBlogPosts } from '../lib/blogHandler'
import ImageBanner from './ImageBanner'

interface BlogPost {
  id: number
  title: string
  slug: string
  snippet: string
  featured_image?: string
  created_at: string
}

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const result = await getBlogPosts()
      if (result.success) {
        setBlogPosts(result.data)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="py-20 px-4 bg-[#0B1C2E]">
        <div className="mx-auto max-w-6xl text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-96 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800 rounded-2xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!blogPosts || blogPosts.length === 0) {
    return null
  }

  return (
    <section className="py-20 px-4 bg-[#0B1C2E]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-6">
            Latest from the Blog
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Real insights from building AI systems for hardworking businesses.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
        
        {/* View All Posts CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#C42B2B] hover:bg-[#A02020] text-white px-8 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#C42B2B]/25"
          >
            View All Posts
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
