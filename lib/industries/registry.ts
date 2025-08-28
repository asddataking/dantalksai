export type Industry = {
  slug: string;               // e.g., "dumpster-rental"
  title: string;              // "AI for Dumpster Rentals"
  benefit: string;            // "Book pickups and deliveries while you're on the road."
  image?: string;             // "/images/industries/dumpster.jpg" (optional)
  rheaLabel?: string;         // label to pass to Rhea for preselect copy
};

export const INDUSTRIES: Industry[] = [
  { 
    slug: "dumpster-rental", 
    title: "AI for Dumpster Rentals", 
    benefit: "Book pickups and deliveries while you're on the road.", 
    image: "industries/dumpsterrental1.jpg", 
    rheaLabel: "Dumpster Rentals" 
  },
  {
    slug: "concrete-excavation",
    title: "AI for Concrete & Excavation",
    benefit: "Capture site details and schedule walk-throughs automatically.",
    image: "industries/Excavation1.jpg",
    rheaLabel: "Excavation"
  },
  { 
    slug: "landscaping", 
    title: "AI for Landscaping", 
    benefit: "Upsell seasonal work while you're mowing.", 
    image: "industries/landcapedyard.jpg", 
    rheaLabel: "Landscaping" 
  },
];

// Track which industry pages actually exist
export const EXISTING_INDUSTRY_SLUGS = new Set<string>([
  "dumpster-rental",
  "concrete-excavation",
  "landscaping"
]);

// Helper to check if an industry page exists
export const industryPageExists = (slug: string): boolean => {
  return EXISTING_INDUSTRY_SLUGS.has(slug);
};

// Helper to get industry by slug
export const getIndustryBySlug = (slug: string): Industry | undefined => {
  return INDUSTRIES.find(industry => industry.slug === slug);
};
