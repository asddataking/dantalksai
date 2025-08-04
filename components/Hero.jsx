import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const headlines = [
  'Take Sales Calls While You Sleep',
  'Book Appointments While You Sleep',
  'Schedule More Appointments While You Sleep',
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="mb-10 h-24 flex items-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold"
          >
            {headlines[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </section>
  )
}

