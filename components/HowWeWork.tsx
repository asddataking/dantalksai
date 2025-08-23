import { motion } from 'framer-motion'
import { trackHowWeWorkCtaClick } from '../lib/analytics/track'

interface HowWeWorkProps {
  onOpenRhea: () => void
}

const steps = [
  {
    icon: "🤖",
    title: "Tell Rhea About Your Business",
    description: "Open the demo and pick your industry."
  },
  {
    icon: "⚙️", 
    title: "We Build the AI System",
    description: "It answers calls, sends quotes, and books jobs."
  },
  {
    icon: "🚀",
    title: "You Get More Done",
    description: "Fewer missed calls, faster bookings, less office time."
  }
]

export default function HowWeWork({ onOpenRhea }: HowWeWorkProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section id="how-we-work" className="py-20 px-4 bg-[#0B1C2E]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-6">
            How We Work
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Three simple steps to get your AI system up and running
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <div className="text-6xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-[#F5F7FA] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={() => {
              trackHowWeWorkCtaClick()
              onOpenRhea()
            }}
            className="bg-[#C42B2B] hover:bg-[#A02020] text-white px-10 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#C42B2B]/25"
          >
            See It In Action
          </button>
        </motion.div>
      </div>
    </section>
  )
}
