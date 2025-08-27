import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getImageUrl } from '../lib/storage'

export default function RheaChatbot() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [formData, setFormData] = useState({
    business_focus: '',
    weekly_leads: '',
    ai_agent: '',
    monthly_budget: '',
    name: '',
    email: ''
  })
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Industry options with "Other" option
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

  // Initialize conversation when expanded
  useEffect(() => {
    if (isExpanded && messages.length === 0) {
      addMessage("Hi! I'm Rhea, your Dan Talks AI Assistant. I'm here to help you build an AI system that works while you sleep. Let me ask you a few questions to understand your needs better.", 'rhea')
      setTimeout(() => {
        addMessage("What industry are you in? (You can type 'other' if your industry isn't listed)", 'rhea')
        setCurrentStep(1)
      }, 1000)
    }
  }, [isExpanded, messages.length])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender, timestamp: Date.now() }])
  }

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay)
  }

  const handleUserInput = (input) => {
    if (!input.trim()) return

    // Add user message
    addMessage(input, 'user')
    setUserInput('')

    // Process based on current step
    switch (currentStep) {
      case 1: // Industry selection
        setFormData(prev => ({ ...prev, business_focus: input }))
        simulateTyping(() => {
          addMessage("Great! What's your name?", 'rhea')
          setCurrentStep(2)
        })
        break
      case 2: // Name
        setFormData(prev => ({ ...prev, name: input }))
        simulateTyping(() => {
          addMessage("Nice to meet you, " + input + "! How many leads do you typically get per week?", 'rhea')
          setCurrentStep(3)
        })
        break
      case 3: // Weekly leads
        setFormData(prev => ({ ...prev, weekly_leads: input }))
        simulateTyping(() => {
          addMessage("What type of AI agent would be most helpful for your business?", 'rhea')
          setCurrentStep(4)
        })
        break
      case 4: // AI agent type
        setFormData(prev => ({ ...prev, ai_agent: input }))
        simulateTyping(() => {
          addMessage("What's your monthly budget for AI automation?", 'rhea')
          setCurrentStep(5)
        })
        break
      case 5: // Monthly budget
        setFormData(prev => ({ ...prev, monthly_budget: input }))
        simulateTyping(() => {
          addMessage("Perfect! Now I just need your email to send you a personalized AI system recommendation.", 'rhea')
          setCurrentStep(6)
        })
        break
      case 6: // Email
        setFormData(prev => ({ ...prev, email: input }))
        simulateTyping(() => {
          addMessage("Excellent! I have all the information I need. Let me process this and get you your personalized AI system recommendation.", 'rhea')
          setCurrentStep(7)
          setTimeout(() => {
            handleSubmit()
          }, 2000)
        })
        break
      default:
        break
    }

    // Track user interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chatbot_user_input', {
        event_category: 'engagement',
        event_label: `step_${currentStep}`,
        value: input.length
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
          'x-client-id': getClientId(),
        },
        body: JSON.stringify({
          ...formData,
          source: 'rhea_chatbot'
        }),
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
        
        // Show success message briefly, then redirect to thank you page
        simulateTyping(() => {
          addMessage("Perfect! I've got all the information I need. Let me redirect you to your personalized recommendation...", 'rhea')
          setTimeout(() => {
            router.push('/thank-you.html')
          }, 2000)
        })
      } else {
        // Track form submission error
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit_error', {
            event_category: 'form',
            event_label: 'rhea_chatbot'
          })
        }
        addMessage("I'm sorry, there was an issue submitting your information. Please try again or contact support.", 'rhea')
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
      addMessage("I'm sorry, there was an issue submitting your information. Please try again or contact support.", 'rhea')
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleUserInput(userInput)
    }
  }

  const resetChat = () => {
    setMessages([])
    setCurrentStep(0)
    setFormData({
      business_focus: '',
      weekly_leads: '',
      ai_agent: '',
      monthly_budget: '',
      name: '',
      email: ''
    })
    setUserInput('')
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
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src={getImageUrl('Home/rhea.png')}
                  alt="Rhea"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
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
            className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-96 max-h-[500px] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={getImageUrl('Home/rhea.png')}
                    alt="Rhea"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Rhea</h3>
                  <p className="text-xs text-white/90">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="text-white/80 hover:text-white transition-colors p-1"
                  title="Reset chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
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
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-3 max-h-80 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-white/10 text-white/90'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white/90 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleUserInput(userInput)}
                  disabled={!userInput.trim() || isTyping}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
