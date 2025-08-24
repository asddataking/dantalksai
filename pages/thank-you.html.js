import Head from 'next/head'
import { motion } from 'framer-motion'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Watch This Before Your Call - Dan Talks AI</title>
        <meta
          name="description"
          content="Watch this important video before your strategy call with Dan."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      
      <main className="bg-black text-white min-h-screen font-['Inter'] flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-cyan-400">
              Watch This Before Your Call
            </h1>
            
            <motion.div 
              className="aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xl text-gray-300">YouTube Video</p>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
              </div>
            </motion.div>
            
            <motion.button 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Book with Calendar
            </motion.button>
          </motion.div>
        </div>
      </main>
    </>
  )
} 