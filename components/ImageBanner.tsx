import Image from 'next/image'
import { ReactNode } from 'react'

interface ImageBannerProps {
  src: string
  alt: string
  overlay?: number // opacity 0-1
  children: ReactNode
  className?: string
  priority?: boolean
  sizes?: string
}

export default function ImageBanner({ 
  src, 
  alt, 
  overlay = 0.5, 
  children, 
  className = '',
  priority = false,
  sizes = "100vw"
}: ImageBannerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className="object-cover"
      />
      
      {/* Patriotic/Gritty Overlay */}
      <div 
        className="absolute inset-0 bg-[#0B1C2E]"
        style={{ opacity: overlay }}
      />
      
      {/* Subtle flag grain pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="50" cy="50" r="1" fill="%23C42B2B"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grain)"/%3E%3C/svg%3E')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
