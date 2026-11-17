import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollStore } from './scrollStore'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initializes Lenis smooth scrolling and syncs with GSAP ScrollTrigger.
 * Writes scroll data to the mutable scrollStore every frame.
 */
export function useScrollAnimation() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    const rafCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Track overall progress 0→1
    const progressTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollStore.progress = self.progress
        scrollStore.scrollY = self.scroll()
      },
    })

    return () => {
      progressTrigger.kill()
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
    }
  }, [])
}
