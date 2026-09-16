import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

/**
 * SideNavigation — Sidebar navigasi fixed di kanan layar.
 * 
 * Pendekatan deteksi posisi:
 * - Menggunakan scroll event + getBoundingClientRect() langsung,
 *   BUKAN ScrollTrigger, karena GSAP pin mengubah posisi elemen
 *   di DOM dan membuat ScrollTrigger tidak akurat untuk elemen
 *   yang berada di dalam container yang sedang di-pin.
 * 
 * Aturan visibilitas:
 * - Sidebar TERSEMBUNYI saat hero section masih terlihat di layar.
 * - Sidebar MUNCUL (dengan animasi fade-in) setelah user scroll
 *   melewati hero section.
 */
export function SideNavigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(false)
  const navRef = useRef(null)
  const rafRef = useRef(null)

  const sections = [
    { id: 'hero', label: '01: HOME', color: '#0c71c3' },
    { id: 'about', label: '02: ABOUT', color: '#bde200' },
    { id: 'gallery', label: '03: GALLERY', color: '#e91e63' },
    { id: 'characters', label: '04: CHARACTER', color: '#ff9800' }
  ]

  // Fungsi untuk mendeteksi section mana yang sedang aktif
  const detectActiveSection = useCallback(() => {
    const viewportCenter = window.innerHeight / 2
    const vh = window.innerHeight

    // 1. Cek apakah masih di area Hero (zona GSAP pin).
    // 1. Cek apakah masih di area Home (Hero) ATAU sedang dalam animasi dissolve.
    // Animasi dissolve di ScrollExperience menggunakan GSAP pin selama 3x viewport height.
    // Kita sembunyikan sidebar SEPENUHNYA selama fase ini agar tidak tertumpuk animasi.
    // Sidebar baru akan muncul setelah animasi selesai (saat user benar-benar masuk ke konten About).
    const pinEndThreshold = vh * 2.8

    if (window.scrollY < pinEndThreshold) {
      setActiveSection('hero')
      setIsVisible(false)
      return
    }

    // 2. Sudah melewati zona Hero dan animasi dissolve -> tampilkan sidebar
    setIsVisible(true)

    // 3. Melewati zona pin, gunakan deteksi posisi elemen (getBoundingClientRect)
    const sectionIds = ['about', 'gallery', 'characters']
    let bestId = 'about'
    let bestDistance = Infinity

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue

      const rect = el.getBoundingClientRect()
      // Hitung jarak tengah elemen ke tengah viewport
      const elCenter = rect.top + rect.height / 2
      const distance = Math.abs(elCenter - viewportCenter)

      // Juga cek apakah elemen sedang terlihat di viewport
      const isInView = rect.top < window.innerHeight && rect.bottom > 0

      if (isInView && distance < bestDistance) {
        bestDistance = distance
        bestId = id
      }
    }

    setActiveSection(bestId)
  }, [])

  // Scroll listener dengan throttle via requestAnimationFrame
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        detectActiveSection()
        rafRef.current = null
      })
    }

    // Deteksi awal setelah render selesai
    const initTimeout = setTimeout(() => {
      detectActiveSection()
    }, 600)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      clearTimeout(initTimeout)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [detectActiveSection])

  // Navigasi smooth ke section yang diklik
  const scrollToSection = (id) => {
    if (id === 'hero') {
      gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' })
      return
    }

    const el = document.getElementById(id)
    if (el) {
      // Gunakan offsetTop untuk mendapatkan posisi absolut yang benar
      // terlepas dari GSAP pinning
      const targetY = el.getBoundingClientRect().top + window.scrollY
      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: false },
        duration: 1.2,
        ease: 'power3.inOut'
      })
    }
  }

  return (
    <div
      ref={navRef}
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-9999 flex flex-col gap-5 pointer-events-auto select-none transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(-50%) translateX(${isVisible ? '0' : '20px'})`,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
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
