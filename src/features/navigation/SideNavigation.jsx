import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export function SideNavigation() {
  const [activeSection, setActiveSection] = useState('hero')

  const sections = [
    { id: 'hero', label: '01: HOME', color: '#0c71c3' },
    { id: 'about', label: '02: ABOUT', color: '#bde200' },
    { id: 'gallery', label: '03: GALLERY', color: '#e91e63' },
    { id: 'characters', label: '04: CHARACTER', color: '#ff9800' }
  ]

  // Melacak posisi scroll dengan akurat menggunakan GSAP ScrollTrigger
  useEffect(() => {
    const triggers = []
    
    // Memberikan sedikit waktu agar render dan pin selesai
    const timeout = setTimeout(() => {
      sections.forEach(s => {
        const elId = s.id === 'hero' ? 'hero-anchor' : s.id
        const el = document.getElementById(elId)
        if (el) {
          const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top 50%', // Menjadi aktif ketika elemen mencapai tengah layar
            end: 'bottom 50%',
            onEnter: () => setActiveSection(s.id),
            onEnterBack: () => setActiveSection(s.id),
          })
          triggers.push(trigger)
        }
      })
    }, 500)

    return () => {
      clearTimeout(timeout)
      triggers.forEach(t => t.kill())
    }
  }, [])

  const scrollToSection = (id) => {
    if (id === 'hero') {
      gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' })
      return
    }
    
    const el = document.getElementById(id)
    if (el) {
      gsap.to(window, { scrollTo: { y: el, autoKill: false }, duration: 1.2, ease: 'power3.inOut' })
    }
  }

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-100 flex flex-col gap-5 pointer-events-auto select-none">
      {sections.map((section) => {
        const isActive = activeSection === section.id
        return (
          <div key={section.id} className="group relative flex items-center justify-end">
            
            {/* Tooltip (Muncul Saat di Hover) */}
            <div className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="border-2 border-black bg-white px-3 py-1.5 font-['Press_Start_2P',monospace] text-[8px] sm:text-[10px] text-black shadow-[3px_3px_0px_#000] whitespace-nowrap">
                {section.label}
              </div>
            </div>

            {/* Kotak Navigasi (Pixel Style) */}
            <button
              onClick={() => scrollToSection(section.id)}
              className={`w-4 h-4 sm:w-5 sm:h-5 border-2 border-black transition-all duration-300 hover:scale-125 cursor-pointer shadow-[2px_2px_0px_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none ${
                isActive ? 'scale-125 shadow-[4px_4px_0px_#000]' : 'bg-white'
              }`}
              style={{ backgroundColor: isActive ? section.color : undefined }}
              title={section.label}
            />
          </div>
        )
      })}
    </div>
  )
}
