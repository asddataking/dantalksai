import { useState, useEffect, useMemo } from 'react'
import { supabase, TABLES, TOOLS_FIELDS } from '../supabase'

export function useFeaturedTools() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch featured tools from Supabase
  useEffect(() => {
    async function fetchFeaturedTools() {
      try {
        setLoading(true)
        setError(null)
        
        // Get tools with featured flag or high rating, limit to 6 for sidebar
        const { data, error: fetchError } = await supabase
          .from(TABLES.TOOLS)
          .select('*')
          .eq(TOOLS_FIELDS.IS_ACTIVE, true)
          .order(TOOLS_FIELDS.RATING, { ascending: false })
          .limit(6)

        if (fetchError) {
          throw fetchError
        }

        setTools(data || [])
      } catch (err) {
        console.error('Error fetching featured tools:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedTools()
  }, [])

  // Get pinned tool (first one)
  const pinnedTool = useMemo(() => {
    return tools.length > 0 ? tools[0] : null
  }, [tools])

  // Get other tools (excluding pinned)
  const otherTools = useMemo(() => {
    return tools.slice(1, 6)
  }, [tools])

  return {
    tools,
    pinnedTool,
    otherTools,
    loading,
    error
  }
}
