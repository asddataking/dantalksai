export interface PageMeta {
  title: string
  description: string
  openGraph: {
    title: string
    description: string
    image: string
    url: string
  }
  twitter: {
    card: string
    title: string
    description: string
    image: string
  }
}

// Default homepage metadata
export const defaultMeta: PageMeta = {
  title: 'Dan Talks AI | AI Systems for Local Businesses & Contractors',
  description: 'AI that answers calls, sends quotes, and books jobs while you work. From contractors to coaches, lawyers to garages — see it in action.',
  openGraph: {
    title: 'Dan Talks AI | AI Systems for Local Businesses & Contractors',
    description: 'AI that answers calls, sends quotes, and books jobs while you work. From contractors to coaches, lawyers to garages — see it in action.',
    image: '/og/home.png',
    url: 'https://dantalksai.com'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dan Talks AI | AI Systems for Local Businesses & Contractors',
    description: 'AI that answers calls, sends quotes, and books jobs while you work. From contractors to coaches, lawyers to garages — see it in action.',
    image: '/og/home.png'
  }
}

// Industry page metadata helper
export const industryMeta = (slug: string, title: string, description: string): PageMeta => {
  const industryName = title.split(' ').slice(-1)[0] // Get last word
  
  return {
    title: `AI for ${industryName} | Dan Talks AI`,
    description: `AI systems for ${industryName.toLowerCase()} that answer calls, send quotes, and book jobs while you work.`,
    openGraph: {
      title: `AI for ${industryName} | Dan Talks AI`,
      description: `AI systems for ${industryName.toLowerCase()} that answer calls, send quotes, and book jobs while you work.`,
      image: '/og/template.png', // We'll overlay industry text on this template
      url: `https://dantalksai.com/industries/${slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: `AI for ${industryName} | Dan Talks AI`,
      description: `AI systems for ${industryName.toLowerCase()} that answer calls, send quotes, and book jobs while you work.`,
      image: '/og/template.png'
    }
  }
}

// Helper to generate structured data for LocalBusiness
export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dan Talks AI",
  "url": "https://dantalksai.com",
  "email": "dan@dantalksai.com",
  "areaServed": "US",
  "founder": "Dan Richmond",
  "sameAs": [
    "https://youtube.com/@dantalksai",
    "https://www.facebook.com/dantalksai/",
    "https://twitter.com/dantalksai"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Michigan",
    "addressCountry": "US"
  },
  "description": "AI systems for local businesses that answer calls, send quotes, and book jobs while you work.",
  "serviceType": "AI Automation Services"
})
