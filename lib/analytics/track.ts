// Analytics tracking system - stubs for now, can be replaced with real analytics later
export function track(eventName: string, payload?: any) {
  // Log to console for now
  console.log('Analytics Event:', eventName, payload)
  
  // Track with Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, payload)
  }
}

// Specific event tracking functions
export const trackHeroRendered = () => {
  track('hero_rendered')
}

export const trackCtaClick = (label: string) => {
  track('cta_click', { label })
}

export const trackRheaOpened = () => {
  track('rhea_opened')
}

export const trackRheaIndustrySelected = (industry: string) => {
  track('rhea_industry_selected', { industry })
}

export const trackLeadSubmitted = (industry: string) => {
  track('lead_submitted', { industry })
}

export const trackDemoViewed = (industry: string) => {
  track('demo_viewed', { industry })
}

export const trackBookWalkthroughClick = (industry: string) => {
  track('book_walkthrough_click', { industry })
}

export const trackTickerRendered = () => {
  track('ticker_rendered')
}

export const trackTickerClick = (slugOrId: string) => {
  track('ticker_click', { slugOrId })
}

export const trackUsecaseTileClick = (industry: string) => {
  track('usecase_tile_click', { industry })
}

export const trackHowWeWorkCtaClick = () => {
  track('how_we_work_cta_click')
}

export const trackIndustryTileOpen = (slug: string) => {
  track('industry_tile_open', { slug })
}

export const trackIndustryTileRheaPreselect = (slug: string) => {
  track('industry_tile_rhea_preselect', { slug })
}

export const trackIndustryPageView = (slug: string) => {
  track('industry_page_view', { slug })
}
