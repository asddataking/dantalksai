import { useState, useEffect, useMemo } from 'react'
import { supabase, TABLES, AI_NEWS_FIELDS } from '../supabase'

export function useAINews() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch AI news from Supabase
  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        setError(null)
        
        const { data, error: fetchError } = await supabase
          .from(TABLES.AI_NEWS)
          .select('*')
          .eq(AI_NEWS_FIELDS.IS_ACTIVE, true)
          .order(AI_NEWS_FIELDS.PUBLISHED_AT, { ascending: false })
          .limit(10)

        if (fetchError) {
          throw fetchError
        }

        setNews(data || [])
      } catch (err) {
        console.error('Error fetching AI news:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Get featured news
  const featuredNews = useMemo(() => {
    return news.filter(item => item[AI_NEWS_FIELDS.IS_FEATURED])
  }, [news])

  // Get latest news (excluding featured)
  const latestNews = useMemo(() => {
    return news.filter(item => !item[AI_NEWS_FIELDS.IS_FEATURED]).slice(0, 8)
  }, [news])

  // Get unique sources
  const sources = useMemo(() => {
    return [...new Set(news.map(item => item[AI_NEWS_FIELDS.SOURCE]))]
  }, [news])

  // Get unique tags
  const allTags = useMemo(() => {
    const tags = news.flatMap(item => item[AI_NEWS_FIELDS.TAGS] || [])
    return [...new Set(tags)]
  }, [news])

  return {
    news,
    featuredNews,
    latestNews,
    sources,
    allTags,
    loading,
    error
  }
}
