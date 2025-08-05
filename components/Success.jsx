import { motion } from 'framer-motion'

export default function Success({ onReset }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-indigo-950 via-slate-900 to-black text-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        Thank you!
      </motion.h2>
      <p className="mb-8 text-lg max-w-md">
        We received your submission and will reach out shortly.
      </p>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(139,92,246,0.8)' }}
        onClick={onReset}
        className="px-6 py-3 rounded-md bg-purple-600 text-white font-semibold"
      >
        Back to Home
      </motion.button>
    </motion.div>
  )
}
