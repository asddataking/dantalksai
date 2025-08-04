import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const headlines = [
  'Take Sales Calls While You Sleep',
  'Book Appointments While You Sleep',
  'Schedule More Clients While You Sleep',
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
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-indigo-950 via-slate-900 to-black text-white px-4"
    >
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4"
      >
        <motion.a
          href="#deals"
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 rounded bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg text-white font-semibold"
        >
          View Deals
        </motion.a>
        <motion.a
          href="#articles"
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 rounded bg-slate-800 shadow-lg text-white font-semibold hover:bg-slate-700"
        >
          Read Articles
        </motion.a>
      </motion.div>
    </section>
  )
}

