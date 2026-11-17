import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const topHalfRef = useRef(null)
  const bottomHalfRef = useRef(null)
  const textRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [logs, setLogs] = useState([])
  
  const bootSequence = [
    "BOOT SEQUENCE INITIATED...",
    "LOADING CYBER-ZEN ENGINE...",
    "RENDERING GLASSMORPHISM UI...",
    "ESTABLISHING CONNECTION...",
    "NEO-KYOTO PROTOCOL ACTIVE."
  ]

  useEffect(() => {
    let currentLog = 0
    const interval = setInterval(() => {
      setLogs(prev => [...prev, bootSequence[currentLog]])
      currentLog++
      if (currentLog >= bootSequence.length) clearInterval(interval)
    }, 250)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setIsAnimating(false)
        if (onComplete) onComplete()
      }
    })

    // Text fade out
    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.4,
      delay: 1.8,
      ease: 'power2.inOut'
    })
    
    // Open shutters
    tl.to(topHalfRef.current, {
      y: '-100%',
      duration: 1.5,
      ease: 'power4.inOut'
    }, 'open')
    
    tl.to(bottomHalfRef.current, {
      y: '100%',
      duration: 1.5,
      ease: 'power4.inOut'
    }, 'open')

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    })

    return () => {
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [onComplete])

  if (!isAnimating) return null

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100vh',
      zIndex: 9999, pointerEvents: 'none',
      display: 'flex', flexDirection: 'column'
    }}>
      
      {/* Top Half */}
      <div ref={topHalfRef} style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '50vh',
        backgroundColor: '#050508',
        borderBottom: '2px solid var(--color-neon-cyan)',
        boxShadow: '0 5px 15px rgba(0, 243, 255, 0.2)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: '3rem',
        zIndex: 2
      }}>
        <div ref={textRef} style={{ color: 'var(--color-text)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
          <h2 style={{ letterSpacing: '4px', marginBottom: '1.5rem', color: 'var(--color-neon-cyan)', textShadow: '0 0 10px rgba(0,243,255,0.4)' }}>SYSTEM INITIALIZATION</h2>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, color: '#888' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--color-neon-pink)', marginRight: '8px' }}>&gt;</span>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Half */}
      <div ref={bottomHalfRef} style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50vh',
        backgroundColor: '#050508',
        borderTop: '2px solid var(--color-neon-pink)',
        boxShadow: '0 -5px 15px rgba(255, 0, 60, 0.2)',
        zIndex: 1
      }}>
      </div>
    </div>
  )
}
