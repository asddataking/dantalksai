import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getBlogPostBySlug } from '../../lib/blogHandler'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (slug) {
      fetchBlogPost()
    }
  }, [slug])

  const fetchBlogPost = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await getBlogPostBySlug(slug as string)

      if (!result.success) {
        setError(result.error || 'Blog post not found')
      } else {
        setPost(result.data)
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to load blog post')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-red-400 mb-4">404</h1>
          <p className="text-gray-400 mb-8">Blog post not found</p>
          <Link 
            href="/"
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <Head>
        <title>{post.title} - Dan Talks AI</title>
        <meta name="description" content={post.snippet || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.snippet || post.excerpt} />
        {post.featured_image && (
          <meta property="og:image" content={post.featured_image} />
        )}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:modified_time" content={post.updated_at} />
      </Head>

      <main className="min-h-screen bg-black text-white">
        <nav className="border-b border-gray-800 py-4">
          <div className="max-w-4xl mx-auto px-4">
            <Link 
              href="/"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="mb-4">
              <Link 
                href="/"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                Dan Talks AI
              </Link>
              <span className="text-gray-500 mx-2">/</span>
              <Link 
                href="/#blog"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                Blog
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-400 text-sm mb-6">
              <span>By Dan</span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.created_at)}</span>
            </div>

            {(post.snippet || post.excerpt) && (
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                {post.snippet || post.excerpt}
              </p>
            )}
          </header>

          {post.featured_image && (
            <div className="mb-8">
              <img 
                src={post.featured_image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm">
                <p>Written by Dan</p>
                <p>Last updated: {formatDate(post.updated_at)}</p>
              </div>
              
              <Link 
                href="/"
                className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </>
  )
}
