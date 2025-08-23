// Type declaration for Google Analytics gtag function
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export function track(eventName: string, payload?: any) {
  // Track with Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, payload)
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, payload)
  }
}

// Specific event tracking functions
export const trackAIForQuery = (query: string, slug: string) => {
  track('ai_for_query_submitted', {
    event_category: 'search',
    event_label: 'ai_for_search',
    value: query.length,
    custom_parameters: {
      query,
      slug
    }
  })
}

export const trackAIForPageView = (slug: string) => {
  track('ai_for_page_view', {
    event_category: 'page_view',
    event_label: 'ai_for_page',
    custom_parameters: {
      slug
    }
  })
}

export const trackAIForToolClick = (slug: string, toolName: string, url: string) => {
  track('ai_for_tool_click', {
    event_category: 'tool_interaction',
    event_label: 'ai_for_tool_click',
    custom_parameters: {
      slug,
      tool_name: toolName,
      url
    }
  })
}

export const trackPulseItemClick = (slug: string, source: string, title: string) => {
  track('pulse_item_click', {
    event_category: 'pulse_interaction',
    event_label: 'pulse_item_click',
    custom_parameters: {
      slug,
      source,
      title
    }
  })
}

export const trackAffiliateClick = (tool: string, source: string) => {
  track('affiliate_click', {
    event_category: 'affiliate_interaction',
    event_label: 'affiliate_click',
    custom_parameters: {
      tool,
      source
    }
  })
}
