import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

const thumbnailAsset = '/assets/a_space_unbound/foto/thumnail/thumnail2.webp'
const logoAsset = '/assets/a_space_unbound/foto/logo/logo3.png'

export default function IntroScreen({ onEnter }) {
  const rootRef = useRef(null)
  const logoRef = useRef(null)
  const buttonRef = useRef(null)
  const whiteFadeRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      // 1. Transisi fade in putih halus dan cepat (mengungkap artwork thumnail2.webp)
      gsap.fromTo(
        whiteFadeRef.current,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }
      )

      // 2. Animasi fade in untuk logo3.png selama 1 detik
      gsap.fromTo(
        logoRef.current,
        { autoAlpha: 0, scale: 0.95, y: 10 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.05 }
      )

      // 3. Tombol pixelated muncul halus setelah logo tampil
      gsap.fromTo(
        buttonRef.current,
        { autoAlpha: 0, y: 14, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, delay: 0.5, ease: 'power2.out' }
      )
    }, rootRef)

    return () => context.revert()
  }, [])

  // Dukungan tombol Spasi atau Enter untuk masuk
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        onEnter?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onEnter])

  return (
    <main
      ref={rootRef}
      className="relative flex min-h-screen w-full select-none items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Gambar thumnail2.webp */}
      <img
        alt="A Space for the Unbound Artwork"
        className="absolute inset-0 h-full w-full object-cover object-center select-none"
        src={thumbnailAsset}
      />

      {/* Layer Vignette Halus agar Konten Lebih Kontras */}
      <div className="pointer-events-none absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />

      {/* Lapisan Fade In Putih Halus Cepat */}
      <div
        ref={whiteFadeRef}
        className="pointer-events-none absolute inset-0 z-30 bg-white will-change-[opacity]"
      />

      {/* Logo & Tombol Masuk di Tengah Layar */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        <img
          ref={logoRef}
          alt="A Space for the Unbound"
          className="h-auto w-64 max-w-[85vw] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] sm:w-80 md:w-96 select-none will-change-transform"
          src={logoAsset}
        />

        {/* Tombol Pixelated: ENTER THE TOWN */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => onEnter?.()}
          className="group relative mt-10 inline-flex cursor-pointer items-center justify-center border-2 border-amber-300 bg-[#141926]/90 px-7 py-3.5 font-['Press_Start_2P',monospace] text-[11px] uppercase tracking-wider text-amber-300 shadow-[4px_4px_0px_#000000] transition-all duration-150 select-none hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-300 hover:text-[#10141d] hover:shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none sm:px-9 sm:py-4 sm:text-xs"
        >
          <span className="mr-2.5 text-amber-400 transition-colors duration-150 group-hover:text-[#10141d]">
            ▶
          </span>
          <span>ENTER THE TOWN</span>
          <span className="ml-2.5 text-amber-400 transition-colors duration-150 group-hover:text-[#10141d]">
            ◀
          </span>
        </button>
      </div>
    </main>
  )
}
