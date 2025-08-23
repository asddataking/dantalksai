import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RheaChatbot() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    business_focus: '',
    weekly_leads: '',
    ai_agent: '',
    monthly_budget: '',
    name: '',
    email: ''
  })

  // Show chatbot after 5 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Track chatbot appearance
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'chatbot_appear', {
          event_category: 'engagement',
          event_label: 'rhea_chatbot'
        })
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Auto-advance conversation
  useEffect(() => {
    if (isExpanded && currentStep < 6) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        // Track conversation progress
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversation_step', {
            event_category: 'engagement',
            event_label: `step_${currentStep + 1}`,
            value: currentStep + 1
          })
        }
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isExpanded, currentStep])

  const conversationSteps = [
    {
      message: "Hi! I'm Rhea, your Dan Talks AI Assistant. I'm here to help you build an AI system that works while you sleep. Let me ask you a few questions to understand your needs better.",
      type: 'rhea'
    },
    {
      message: "What's your main business focus?",
      type: 'rhea',
      field: 'business_focus'
    },
    {
      message: "How many leads do you typically get per week?",
      type: 'rhea',
      field: 'weekly_leads'
    },
    {
      message: "What type of AI agent would be most helpful for your business?",
      type: 'rhea',
      field: 'ai_agent'
    },
    {
      message: "What's your monthly budget for AI automation?",
      type: 'rhea',
      field: 'monthly_budget'
    },
    {
      message: "Great! Now I just need your name and email to send you a personalized AI system recommendation.",
      type: 'rhea'
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Track field interactions
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_field_interaction', {
        event_category: 'form',
        event_label: field,
        value: value
      })
    }
  }

  const handleSubmit = async () => {
    try {
      // Track form submission start
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit_start', {
          event_category: 'form',
          event_label: 'rhea_chatbot'
        })
      }

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': getClientId(), // Send client ID for server-side tracking
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Track successful form submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit_success', {
            event_category: 'conversion',
            event_label: 'rhea_chatbot',
            value: 1,
            custom_parameters: {
              business_focus: formData.business_focus,
              weekly_leads: formData.weekly_leads,
              ai_agent: formData.ai_agent,
              monthly_budget: formData.monthly_budget,
              source: 'rhea_chatbot'
            }
          })
        }
        
        setCurrentStep(7) // Show success message
      } else {
        // Track form submission error
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit_error', {
            event_category: 'form',
            event_label: 'rhea_chatbot'
          })
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // Track form submission error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit_error', {
          event_category: 'form',
          event_label: 'rhea_chatbot'
        })
      }
    }
  }

  // Get or generate client ID for Google Analytics
  const getClientId = () => {
    if (typeof window === 'undefined') return 'anonymous'
    
    let clientId = localStorage.getItem('ga_client_id')
    if (!clientId) {
      clientId = 'client_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('ga_client_id', clientId)
    }
    return clientId
  }

  const renderInput = (field) => {
    switch (field) {
      case 'business_focus':
        return (
          <div className="space-y-2">
            <button
              onClick={() => handleInputChange('business_focus', 'Lead Generation')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              Lead Generation
            </button>
            <button
              onClick={() => handleInputChange('business_focus', 'Customer Support')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              Customer Support
            </button>
            <button
              onClick={() => handleInputChange('business_focus', 'Sales Automation')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              Sales Automation
            </button>
          </div>
        )
      case 'weekly_leads':
        return (
          <div className="space-y-2">
            <button
              onClick={() => handleInputChange('weekly_leads', '0-10')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              0-10 leads
            </button>
            <button
              onClick={() => handleInputChange('weekly_leads', '11-50')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              11-50 leads
            </button>
            <button
              onClick={() => handleInputChange('weekly_leads', '50+')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              50+ leads
            </button>
          </div>
        )
      case 'ai_agent':
        return (
          <div className="space-y-2">
            <button
              onClick={() => handleInputChange('ai_agent', 'Chat Agent')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              Chat Agent
            </button>
            <button
              onClick={() => handleInputChange('ai_agent', 'Voice Agent')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              Voice Agent
            </button>
            <button
              onClick={() => handleInputChange('ai_agent', 'Email Agent')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              Email Agent
            </button>
          </div>
        )
      case 'monthly_budget':
        return (
          <div className="space-y-2">
            <button
              onClick={() => handleInputChange('monthly_budget', '$100-500')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              $100-500
            </button>
            <button
              onClick={() => handleInputChange('monthly_budget', '$500-1000')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              $500-1000
            </button>
            <button
              onClick={() => handleInputChange('monthly_budget', '$1000+')}
              className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              $1000+
            </button>
          </div>
        )
      default:
        return null
    }
  }

  const renderCurrentStep = () => {
    if (currentStep >= conversationSteps.length) {
      return (
        <div className="space-y-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500"
            />
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!formData.name || !formData.email}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get My AI System Recommendation
          </button>
        </div>
      )
    }

    const step = conversationSteps[currentStep]
    return (
      <div className="space-y-4">
        <div className="text-sm text-white/80 leading-relaxed">
          {step.message}
        </div>
        {step.field && renderInput(step.field)}
      </div>
    )
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              setIsExpanded(true)
              // Track chatbot expansion
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'chatbot_expand', {
                  event_category: 'engagement',
                  event_label: 'rhea_chatbot'
                })
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold">Rhea</h3>
                <p className="text-sm opacity-90">Your AI Assistant</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-80 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Rhea</h3>
                  <p className="text-xs text-white/90">AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsExpanded(false)
                  // Track chatbot close
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'chatbot_close', {
                      event_category: 'engagement',
                      event_label: 'rhea_chatbot'
                    })
                  }
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
              {currentStep === 7 ? (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="font-semibold text-white">Thank you!</h3>
                  <p className="text-sm text-white/80">
                    I'll analyze your needs and send you a personalized AI system recommendation within 24 hours.
                  </p>
                </div>
              ) : (
                renderCurrentStep()
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
