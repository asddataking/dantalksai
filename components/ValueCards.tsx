import { motion } from 'framer-motion'

const valueCards = [
  {
    title: "Never Miss a Call",
    description: "Instant replies 24/7 (SMS, web chat, voicemail→text)",
    icon: "📞"
  },
  {
    title: "Quotes on Autopilot", 
    description: "Fast, professional estimates while you're in the field",
    icon: "💰"
  },
  {
    title: "Book Jobs Faster",
    description: "Auto follow-ups fill your schedule without extra hires",
    icon: "📅"
  }
]

export default function ValueCards() {
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
    <section className="py-20 px-4 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-[#0B1C2E] mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Local Businesses Use This
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {valueCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-2xl font-bold text-[#0B1C2E] mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
