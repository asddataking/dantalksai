export interface AITool {
  name: string
  short_desc: string
  url: string
  affiliate?: boolean
}

export interface FAQ {
  q: string
  a: string
}

export interface AIForTopic {
  id: string
  slug: string
  query_raw: string
  topic: string
  tools: AITool[]
  explainer: string
  faqs: FAQ[]
  search_count: number
  created_at: string
  updated_at: string
}

export interface TrendingItem {
  id: string
  label: string
  slug: string
  weight: number
  created_at: string
}

export interface SearchResponse {
  slug: string
  topic: string
  isNew?: boolean
}

export interface TrendingResponse {
  trending: TrendingItem[]
}
