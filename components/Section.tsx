import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'dark' | 'light'
}

export default function Section({ children, className = '', id, background = 'dark' }: SectionProps) {
  const bgClass = background === 'dark' ? 'bg-[#0B1C2E]' : 'bg-[#F5F7FA]'
  const textClass = background === 'dark' ? 'text-[#F5F7FA]' : 'text-[#0B1C2E]'
  
  return (
    <section 
      id={id}
      className={`py-12 md:py-16 px-4 ${bgClass} ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  )
}

// Helper components for consistent styling
export function SectionHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-6 ${className}`}>
      {children}
    </h2>
  )
}

export function SectionSubheading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-base md:text-lg max-w-2xl mx-auto text-center ${className}`}>
      {children}
    </p>
  )
}

export function SectionContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-6xl ${className}`}>
      {children}
    </div>
  )
}
