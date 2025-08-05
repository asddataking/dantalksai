import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VideoCarousel() {
  const [videos, setVideos] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
    if (!apiKey || !channelId) return
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&type=video&maxResults=5`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data.items || []))
      .catch((err) => console.error('YouTube fetch error', err))
  }, [])

  useEffect(() => {
    if (videos.length === 0) return
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % videos.length),
      8000
    )
    return () => clearInterval(interval)
  }, [videos])

  if (videos.length === 0) return null

  const current = videos[index]
  const videoId = current.id.videoId || current.id

  return (
    <div className="relative w-full max-w-3xl aspect-video mx-auto mt-8">
      <AnimatePresence mode="wait">
        <motion.iframe
          key={videoId}
          src={`https://www.youtube.com/embed/${videoId}`}
          className="absolute inset-0 w-full h-full rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </div>
  )
}
