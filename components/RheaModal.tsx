import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackRheaOpened, trackRheaIndustrySelected, trackLeadSubmitted, trackDemoViewed, trackBookWalkthroughClick } from '../lib/analytics/track'
import Image from 'next/image'
import { getImageUrl } from '../lib/storage'

interface RheaModalProps {
  isOpen: boolean
  onClose: () => void
  preselectedIndustry?: string
}

interface LeadData {
  name: string
  phone: string
  email: string
  industry: string
}

const industries = [
  'Contractors',
  'Dumpster Rentals',
  'Driveway/Snow',
  'Excavation', 
  'Landscaping',
  'Painting',
  'Personal Trainer',
  'Lawyer',
  'Car Garage',
  'Other'
]

const industryDemos = {
  'Contractors': [
    'After-hours calls auto-answered; job details captured',
    'SMS quote sent; follow-up if no reply',
    'Booked on your calendar; reminders auto-sent',
    'Time saved per job: 15–25 minutes (typical)'
  ],
  'Dumpster Rentals': [
    'After-hours calls auto-answered; job details captured',
    'SMS quote sent; follow-up if no reply', 
    'Booked on your calendar; reminders auto-sent',
    'Time saved per job: 12–20 minutes (typical)'
  ],
  'Driveway/Snow': [
    'Weather-based availability updates sent automatically',
    'Emergency calls routed to you; others handled by AI',
    'Quotes generated based on square footage + conditions',
    'Time saved per job: 10–18 minutes (typical)'
  ],
  'Excavation': [
    'Site visit requests captured with photos/measurements',
    'Equipment availability checked automatically',
    'Permit requirements flagged for your review',
    'Time saved per job: 20–30 minutes (typical)'
  ],
  'Landscaping': [
    'Seasonal maintenance reminders sent to clients',
    'Photo-based estimates generated automatically',
    'Weather delays communicated proactively',
    'Time saved per job: 15–25 minutes (typical)'
  ],
  'Painting': [
    'Color consultation requests handled 24/7',
    'Room measurements calculated from photos',
    'Material estimates generated automatically',
    'Time saved per job: 12–20 minutes (typical)'
  ],
  'Personal Trainer': [
    'Workout plan requests captured with goals',
    'Availability checked against your calendar',
    'Nutrition questions answered automatically',
    'Time saved per client: 8–15 minutes (typical)'
  ],
  'Lawyer': [
    'Case type identified; urgency level assessed',
    'Initial consultation details captured',
    'Document uploads requested automatically',
    'Time saved per lead: 10–20 minutes (typical)'
  ],
  'Car Garage': [
    'Service requests categorized by urgency',
    'Parts availability checked automatically',
    'Appointment slots verified in real-time',
    'Time saved per service: 15–25 minutes (typical)'
  ],
  'Other': [
    'Customer inquiries answered 24/7',
    'Appointment requests captured automatically',
    'Follow-up reminders sent systematically',
    'Time saved per interaction: 10–20 minutes (typical)'
  ]
}

export default function RheaModal({ isOpen, onClose, preselectedIndustry }: RheaModalProps) {
  console.log('RheaModal render:', { isOpen, preselectedIndustry })
  const [step, setStep] = useState(1)
  const [selectedIndustry, setSelectedIndustry] = useState(preselectedIndustry || '')
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    phone: '',
    email: '',
    industry: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      trackRheaOpened()
      if (preselectedIndustry) {
        setSelectedIndustry(preselectedIndustry)
        setStep(2)
      }
    }
  }, [isOpen, preselectedIndustry])

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry)
    trackRheaIndustrySelected(industry)
    setStep(2)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadData.name || !leadData.phone) return

    setIsSubmitting(true)
    
    try {
      // Submit to unified API endpoint (goes to both Supabase and Notion)
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: leadData.name,
          email: leadData.email || 'rhea@modal.com', // Required by API
          phone: leadData.phone,
          business_focus: selectedIndustry,
          weekly_leads: 'Demo Request',
          ai_agent: 'Customer Service & Booking',
          monthly_budget: 'To Be Determined',
          source: 'rhea_modal'
        }),
      })

      if (response.ok) {
        trackLeadSubmitted(selectedIndustry)
        setStep(3)
      } else {
        console.error('Failed to submit lead')
      }
    } catch (error) {
      console.error('Error submitting lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBookWalkthrough = () => {
    trackBookWalkthroughClick(selectedIndustry)
    // Close modal and redirect to thank you page
    handleClose()
    window.location.href = '/thank-you.html'
  }

  const handleClose = () => {
    setStep(1)
    setSelectedIndustry('')
    setLeadData({ name: '', phone: '', email: '', industry: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />
        
        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring" as const, damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>

          <div className="p-8">
            {/* Step 1: Industry Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src={getImageUrl('Home/rhea.png')}
                      alt="Rhea"
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0B1C2E] mb-2">
                    Hey — I'm Rhea
                  </h2>
                  <p className="text-gray-600">
                    Want to see how AI can run your office while you work? Pick your business.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => handleIndustrySelect(industry)}
                      className="p-3 text-sm font-medium text-[#0B1C2E] bg-gray-100 hover:bg-[#C42B2B] hover:text-white rounded-lg transition-all duration-200"
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Lead Capture */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src={getImageUrl('Home/rhea.png')}
                      alt="Rhea"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0B1C2E] mb-2">
                    Great choice!
                  </h2>
                  <p className="text-gray-600">
                    I'll send you a personalized AI system recommendation. What's the best way to reach you?
                  </p>
                </div>
                
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadData.name}
                      onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C42B2B] focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadData.phone}
                      onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C42B2B] focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      value={leadData.email}
                      onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C42B2B] focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                  
                  <div className="flex items-start space-x-3 pt-2">
                    <input
                      type="checkbox"
                      required
                      id="consent"
                      className="mt-1 h-4 w-4 text-[#C42B2B] focus:ring-[#C42B2B] border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      You agree to a quick follow-up about your AI system.
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C42B2B] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#A02020] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Getting your AI system...' : 'Get my AI system'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 3: Tailored Demo */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src={getImageUrl('Home/rhea.png')}
                      alt="Rhea"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0B1C2E] mb-2">
                    Perfect! Here's how AI can help your {selectedIndustry.toLowerCase()} business:
                  </h2>
                </div>
                
                <div className="space-y-3 mb-8">
                  {industryDemos[selectedIndustry as keyof typeof industryDemos]?.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#C42B2B] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleBookWalkthrough}
                    className="w-full bg-[#C42B2B] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#A02020] transition-colors"
                  >
                    Book a Live Walkthrough
                  </button>
                  
                  <button
                    onClick={handleClose}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  )
}
