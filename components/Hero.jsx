import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoCarousel from './VideoCarousel'

const phrases = [
  'Take Sales Calls',
  'Book Appointments',
  'Schedule More Appointments',
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="mb-6 h-24 flex items-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold"
          >
            {phrases[index]}{' '}
            <span className="text-yellow-400">While You Sleep</span>
          </motion.h1>
        </AnimatePresence>
      </div>
      <p className="max-w-2xl text-lg md:text-xl text-slate-300">
        I break down real AI tools and show how to use them to automate content, save time, and grow your business. No hype — just fast, practical workflows you can actually use.
      </p>
      <VideoCarousel />
    </section>
  )
}

