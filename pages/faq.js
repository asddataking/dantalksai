import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'

export default function FAQ() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <>
      <Head>
        <title>FAQ - Dan Talks AI - Frequently Asked Questions</title>
        <meta name="description" content="Frequently asked questions about Dan Talks AI services, AI automation, lead generation, and building systems that work while you sleep." />
        <meta name="keywords" content="FAQ, AI automation, lead generation, CRM automation, AI agents, business automation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-[60vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
          
          <motion.div 
            className="relative z-10 max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8"
              variants={itemVariants}
            >
              <span className="text-white">Frequently Asked</span>
              <span className="text-cyan-400"> Questions</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Everything you need to know about AI automation, lead generation, and building systems that work while you sleep.
            </motion.p>

            <motion.div 
              className="mt-8"
              variants={itemVariants}
            >
              <Link 
                href="/"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <motion.section 
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What does Dan Talks AI actually build?",
                  answer: "We design done-for-you AI systems that answer leads 24/7, qualify them, and book calls while you sleep. Our core setup is a software system that manages CRM, automations, and calendars, but we can also deploy chat or voice agents using tools like Vapi, Synthflow, or a custom stack."
                },
                {
                  question: "Do I need a specific software system?",
                  answer: "Not necessarily. We usually recommend a central software system because it combines CRM, funnels, and automations in one place. If you're already on another platform, we can integrate with it. For chat or voice agents we often use Vapi or Synthflow and still route leads and bookings into your system."
                },
                {
                  question: "How fast will I see results?",
                  answer: "Most clients notice more replies and booked calls within 1–3 weeks. ROI depends on your close rate and service pricing, but just a few extra appointments per week usually covers the cost of the system."
                },
                {
                  question: "What parts of my funnel get automated?",
                  answer: "We automate lead capture, instant replies, FAQs, follow-ups, appointment scheduling, reminders, and even post-call nudges. Features like missed-call text-back and review prompts are included so you never lose a lead."
                },
                {
                  question: "Should I use a voice agent or a chat agent?",
                  answer: "Chat agents are great for websites, SMS, and social DMs. Voice agents are perfect for missed calls or phone-first customers. Many businesses use both: chat for inbound leads and voice for after-hours or overflow."
                },
                {
                  question: "Do you help with YouTube Shorts or Reels for lead generation?",
                  answer: "Yes. We set up simple workflows that repurpose your videos into short clips with clear CTAs. The AI system then captures viewers who engage and books them straight into your calendar."
                },
                {
                  question: "How does pricing work?",
                  answer: "There's a one-time setup fee to deploy your core AI system (CRM, automations, and agent). After that, we charge a flat monthly rate for management and support. Usage fees from tools like Vapi or Synthflow are billed directly to you."
                },
                {
                  question: "Which tools can you integrate with?",
                  answer: "We connect with software systems, Google/Outlook calendars, Stripe, Facebook/Instagram lead ads, Shopify, and more. Agents built on Vapi or Synthflow can also push data into your CRM or custom workflows."
                },
                {
                  question: "How do you handle data and privacy?",
                  answer: "You own your data. Leads, messages, and bookings live in your account, not ours. We follow platform policies and provide opt-in/opt-out language so your business stays compliant."
                },
                {
                  question: "What happens if I cancel?",
                  answer: "You keep your software system, pipelines, and assets in your account. If you stop monthly management, we hand over full documentation and walkthroughs so your team can keep things running. Third-party subscriptions remain under your control."
                },
                {
                  question: "Who is this best for?",
                  answer: "Local service businesses, real estate agents, coaches, consultants, and online offers. If you regularly miss leads or spend too much time answering the same questions, automations will make the biggest impact."
                },
                {
                  question: "What does onboarding look like?",
                  answer: "We start with a kickoff call, gather your offers and FAQs, build out the software system + agent, then test and refine. Most systems go live in 7–14 days depending on scope."
                },
                {
                  question: "Do you do live demos or workshops in Michigan?",
                  answer: "Yes. Dan offers in-person talks and workshops where we demo live chat/voice agents and booking flows. It's a hands-on way for teams to see AI systems in action."
                },
                {
                  question: "Do you use affiliate links for tools?",
                  answer: "Sometimes. If a recommended tool has an affiliate program, we'll disclose it. We only suggest platforms we personally trust and would use ourselves."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="faq-item group bg-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-600/50 hover:border-cyan-400/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  viewport={{ once: true }}
                >
                  <div className="relative overflow-hidden">
                    {/* Glowing border effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <button
                      onClick={() => {
                        const faqItems = document.querySelectorAll('.faq-item');
                        const faqContent = faqItems[index].querySelector('.faq-content');
                        const faqIcon = faqItems[index].querySelector('.faq-icon');
                        
                        // Close all other FAQ items
                        faqItems.forEach((item, i) => {
                          if (i !== index) {
                            item.classList.remove('active');
                            item.querySelector('.faq-content').style.maxHeight = '0px';
                            item.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                          }
                        });
                        
                        // Toggle current FAQ item
                        if (faqItems[index].classList.contains('active')) {
                          faqItems[index].classList.remove('active');
                          faqContent.style.maxHeight = '0px';
                          faqIcon.style.transform = 'rotate(0deg)';
                        } else {
                          faqItems[index].classList.add('active');
                          faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
                          faqIcon.style.transform = 'rotate(180deg)';
                        }
                      }}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-all duration-300 relative z-10"
                    >
                      <h3 className="text-xl font-bold text-white pr-4 group-hover:text-cyan-300 transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <div className="faq-icon w-6 h-6 text-cyan-400 transition-all duration-300 flex-shrink-0 group-hover:scale-110">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>
                    <div 
                      className="faq-content overflow-hidden transition-all duration-500 ease-in-out bg-gray-700/20"
                      style={{ maxHeight: '0px' }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed text-lg">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8 text-cyan-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Build Your AI System?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Let's chat about how AI automation can transform your business and help you capture more leads while you sleep.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
              >
                Start Building Now
              </Link>
              
              <Link 
                href="mailto:dan@dantalks.ai"
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300"
              >
                Contact Dan
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </>
  )
}
