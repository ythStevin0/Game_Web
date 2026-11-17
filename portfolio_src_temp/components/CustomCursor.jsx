import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Ultra smooth and fast quickTo for the editorial cursor
    const xTo = gsap.quickTo(cursorRef.current, "x", {duration: 0.1, ease: "none"})
    const yTo = gsap.quickTo(cursorRef.current, "y", {duration: 0.1, ease: "none"})
    
    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true)
      xTo(e.clientX)
      yTo(e.clientY)
    }
    
    const onMouseLeave = () => {
      setIsVisible(false)
    }

    // Optional: subtle scale on link hover, but no magnetic pull
    const interactiveElements = document.querySelectorAll('a, button, .interactive')
    
    const onHover = () => gsap.to(cursorRef.current, { scale: 3, duration: 0.3, ease: 'power3.out' })
    const onLeave = () => gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power3.out' })

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onHover)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMouseMove)
    document.body.addEventListener('mouseleave', onMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.body.removeEventListener('mouseleave', onMouseLeave)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onHover)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [isVisible])

  return (
    <div 
      ref={cursorRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '12px', // Smaller, more precise
        height: '12px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 10000,
        transform: 'translate(-50%, -50%)',
        display: isVisible ? 'block' : 'none',
        mixBlendMode: 'difference', // Pure inversion for contrast
        willChange: 'transform'
      }}
    />
  )
}
