import { useEffect, useRef } from 'react'

const AIAnimation = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animation variables
    let animationId
    const lines = []
    const numLines = 12
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const circleRadius = 80
    const lineLength = 120
    const fadeSpeed = 0.02
    const rotationSpeed = 0.005

    // Create lines
    for (let i = 0; i < numLines; i++) {
      lines.push({
        angle: (i / numLines) * Math.PI * 2,
        opacity: Math.random(),
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        length: lineLength + Math.random() * 40,
        speed: 0.5 + Math.random() * 0.5
      })
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw central circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw inner circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius - 20, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw pulsing core
      const pulseSize = Math.sin(Date.now() * 0.003) * 10 + 15
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)'
      ctx.fill()

      // Update and draw lines
      lines.forEach((line, index) => {
        // Update opacity with tide-like effect
        line.opacity += line.fadeDirection * fadeSpeed * line.speed
        
        if (line.opacity >= 1) {
          line.opacity = 1
          line.fadeDirection = -1
        } else if (line.opacity <= 0) {
          line.opacity = 0
          line.fadeDirection = 1
        }

        // Update angle (rotation)
        line.angle += rotationSpeed * line.speed

        // Calculate line positions
        const startX = centerX + Math.cos(line.angle) * circleRadius
        const startY = centerY + Math.sin(line.angle) * circleRadius
        const endX = centerX + Math.cos(line.angle) * (circleRadius + line.length)
        const endY = centerY + Math.sin(line.angle) * (circleRadius + line.length)

        // Draw line with fade effect
        if (line.opacity > 0) {
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.strokeStyle = `rgba(6, 182, 212, ${line.opacity * 0.6})`
          ctx.lineWidth = 2
          ctx.stroke()

          // Draw line glow
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          ctx.strokeStyle = `rgba(6, 182, 212, ${line.opacity * 0.2})`
          ctx.lineWidth = 6
          ctx.stroke()

          // Draw connecting dots
          ctx.beginPath()
          ctx.arc(startX, startY, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(6, 182, 212, ${line.opacity * 0.8})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(endX, endY, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(6, 182, 212, ${line.opacity * 0.4})`
          ctx.fill()
        }
      })

      // Draw floating particles
      for (let i = 0; i < 8; i++) {
        const time = Date.now() * 0.001
        const x = centerX + Math.cos(time + i) * (circleRadius + 100 + Math.sin(time * 2) * 20)
        const y = centerY + Math.sin(time + i) * (circleRadius + 100 + Math.cos(time * 2) * 20)
        
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${0.3 + Math.sin(time + i) * 0.2})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ background: 'transparent' }}
    />
  )
}

export default AIAnimation 