import { useState, useEffect, useMemo } from 'react'
import { supabase, TABLES, TOOLS_FIELDS } from '../supabase'

export function useTools() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [pricing, setPricing] = useState("All")
  const [sortBy, setSortBy] = useState("Hot")
  const [onlyNew, setOnlyNew] = useState(false)

  // Fetch tools from Supabase
  useEffect(() => {
    async function fetchTools() {
      try {
        console.log('useTools: Starting to fetch tools...')
        setLoading(true)
        setError(null)
        
        let queryBuilder = supabase
          .from(TABLES.TOOLS)
          .select('*')
          .eq(TOOLS_FIELDS.IS_ACTIVE, true)
          .order(TOOLS_FIELDS.SORT_ORDER, { ascending: true })

        console.log('useTools: Query built:', queryBuilder)
        console.log('useTools: Table name:', TABLES.TOOLS)
        console.log('useTools: Supabase client:', !!supabase)

        const { data, error: fetchError } = await queryBuilder

        console.log('useTools: Fetch result:', { data: data?.length || 0, error: fetchError })

        if (fetchError) {
          throw fetchError
        }

        setTools(data || [])
        console.log('useTools: Tools set:', data?.length || 0)
      } catch (err) {
        console.error('useTools: Error fetching tools:', err)
        setError(err.message)
      } finally {
        setLoading(false)
        console.log('useTools: Loading finished')
      }
    }

    fetchTools()
  }, [])

  // Filtered and sorted tools
  const filteredTools = useMemo(() => {
    let filtered = [...tools]

    // Search filter
    if (query) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(tool =>
        tool[TOOLS_FIELDS.NAME].toLowerCase().includes(searchTerm) ||
        tool[TOOLS_FIELDS.DESCRIPTION].toLowerCase().includes(searchTerm) ||
        tool[TOOLS_FIELDS.TAGS].some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter(tool => tool[TOOLS_FIELDS.CATEGORY] === category)
    }

    // Pricing filter
    if (pricing !== "All") {
      if (pricing === "Free") {
        filtered = filtered.filter(tool => tool[TOOLS_FIELDS.PRICING] === "Free")
      } else {
        filtered = filtered.filter(tool => tool[TOOLS_FIELDS.PRICING] === pricing)
      }
    }

    // New only filter
    if (onlyNew) {
      filtered = filtered.filter(tool => tool[TOOLS_FIELDS.IS_NEW])
    }

    // Sorting
    switch (sortBy) {
      case "Rating":
        filtered.sort((a, b) => b[TOOLS_FIELDS.RATING] - a[TOOLS_FIELDS.RATING])
        break
      case "A–Z":
        filtered.sort((a, b) => a[TOOLS_FIELDS.NAME].localeCompare(b[TOOLS_FIELDS.NAME]))
        break
      case "New":
        filtered.sort((a, b) => Number(b[TOOLS_FIELDS.IS_NEW]) - Number(a[TOOLS_FIELDS.IS_NEW]))
        break
      default:
        // Hot = simple heuristic using rating + isNew + sort_order
        filtered.sort((a, b) => {
          const scoreA = b[TOOLS_FIELDS.RATING] + Number(b[TOOLS_FIELDS.IS_NEW]) + (1 / (b[TOOLS_FIELDS.SORT_ORDER] + 1))
          const scoreB = a[TOOLS_FIELDS.RATING] + Number(a[TOOLS_FIELDS.IS_NEW]) + (1 / (a[TOOLS_FIELDS.SORT_ORDER] + 1))
          return scoreA - scoreB
        })
    }

    return filtered
  }, [tools, query, category, pricing, sortBy, onlyNew])

  // Get unique categories and pricing options
  const categories = useMemo(() => {
    const cats = [...new Set(tools.map(tool => tool[TOOLS_FIELDS.CATEGORY]))]
    return ["All", ...cats.sort()]
  }, [tools])

  const pricingOptions = useMemo(() => {
    const prices = [...new Set(tools.map(tool => tool[TOOLS_FIELDS.PRICING]))]
    return ["All", ...prices.sort()]
  }, [tools])

  const sortOptions = ["Hot", "New", "Rating", "A–Z"]

  console.log('useTools: Returning state:', {
    toolsCount: tools.length,
    filteredCount: filteredTools.length,
    loading,
    error,
    categories: categories.length,
    pricingOptions: pricingOptions.length
  })

  return {
    tools: filteredTools,
    loading,
    error,
    query,
    setQuery,
    category,
    setCategory,
    pricing,
    setPricing,
    sortBy,
    setSortBy,
    onlyNew,
    setOnlyNew,
    categories,
    pricingOptions,
    sortOptions
  }
}
