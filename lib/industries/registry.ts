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
    slug: "driveway-snow", 
    title: "AI for Driveways & Snow", 
    benefit: "Fill your route before the first snowfall.", 
    image: "industries/driveway.jpg", 
    rheaLabel: "Driveway/Snow" 
  },
  { 
    slug: "excavation", 
    title: "AI for Excavation", 
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
  { 
    slug: "painting", 
    title: "AI for Painting", 
    benefit: "Answer bids and book estimates while you're on the ladder.", 
    image: "industries/painting.jpg", 
    rheaLabel: "Painting" 
  },
  { 
    slug: "personal-trainer", 
    title: "AI for Personal Trainers", 
    benefit: "Auto-book sessions and reduce no-shows.", 
    image: "industries/trainer.jpg", 
    rheaLabel: "Personal Trainer" 
  },
  { 
    slug: "lawyer", 
    title: "AI for Lawyers", 
    benefit: "Intake clients, send reminders, and book consults faster.", 
    image: "industries/lawyer.jpg", 
    rheaLabel: "Lawyer" 
  },
  { 
    slug: "car-garage", 
    title: "AI for Car Garages", 
    benefit: "Answer repair inquiries and schedule drop-offs instantly.", 
    image: "industries/garage.jpg", 
    rheaLabel: "Car Garage" 
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
