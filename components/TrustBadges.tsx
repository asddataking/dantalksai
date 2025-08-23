import { motion } from 'framer-motion'

const badges = [
  { icon: "🇺🇸", label: "Built in the USA" },
  { icon: "🔒", label: "Privacy-First" },
  { icon: "🤝", label: "No Long-Term Contracts" },
  { icon: "⚙️", label: "Works With Your Tools" },
  { icon: "⏱️", label: "Setup in Days" }
]

export default function TrustBadges() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section className="py-12 px-4 bg-[#0B1C2E]">
      <div className="mx-auto max-w-6xl">
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 bg-white/5 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                borderColor: 'rgba(196, 43, 43, 0.5)',
                backgroundColor: 'rgba(196, 43, 43, 0.1)'
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-base">{badge.icon}</span>
              <span className="font-medium">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
