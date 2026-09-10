import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

const togeLogo = '/assets/a_space_unbound/other/Toge.png'
const mojikenLogo = '/assets/a_space_unbound/other/mojiken.jpg'
const meteorAsset = '/assets/loading/meteorit.webp'

export default function StudioSplash({ onComplete }) {
  const containerRef = useRef(null)
  const togeRef = useRef(null)
  const mojikenRef = useRef(null)
  const meteorRef = useRef(null)
  const meteorImgRef = useRef(null)
  const skipBtnRef = useRef(null)
  const timelineRef = useRef(null)
  const finishedRef = useRef(false)

  // Preload meteorit.webp agar saat tiba gilirannya langsung siap dari cache
  useEffect(() => {
    const img = new Image()
    img.src = meteorAsset
  }, [])

  const handleFinish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Langsung masuk ke IntroScreen (layar putih akan disambut langsung oleh fade in putih IntroScreen)
    onComplete?.()
  }, [onComplete])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Inisialisasi status awal
      gsap.set(containerRef.current, { autoAlpha: 1 })
      gsap.set([togeRef.current, mojikenRef.current], { autoAlpha: 0, scale: 0.92, y: 8 })
      gsap.set(meteorRef.current, { autoAlpha: 0 })
      gsap.set(skipBtnRef.current, { autoAlpha: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: handleFinish,
      })
      timelineRef.current = tl

      // Munculkan tombol skip secara halus
      tl.to(skipBtnRef.current, { autoAlpha: 1, duration: 0.5 }, 0.2)

      // 1. Logo Toge Productions (Tampil ~3 detik)
      tl.to(togeRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
        .to(togeRef.current, {
          duration: 1.8,
        })
        .to(togeRef.current, {
          autoAlpha: 0,
          scale: 1.04,
          y: -6,
          duration: 0.6,
          ease: 'power2.in',
        })

        // Jeda layar putih bersih
        .to({}, { duration: 0.25 })

        // 2. Logo Mojiken Studio (Tampil ~3 detik)
        .to(mojikenRef.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
        .to(mojikenRef.current, {
          duration: 1.8,
        })
        .to(mojikenRef.current, {
          autoAlpha: 0,
          scale: 1.04,
          y: -6,
          duration: 0.6,
          ease: 'power2.in',
        })

        // Jeda singkat sebelum animasi meteorit
        .to({}, { duration: 0.15 })

        // 3. Video / Animasi Meteorit (meteorit.webp)
        .call(() => {
          if (meteorImgRef.current) {
            // Memaksa browser memulai animasi webp dari frame pertama (0)
            meteorImgRef.current.src = `${meteorAsset}?play=${Date.now()}`
          }
        })
        .to(meteorRef.current, {
          autoAlpha: 1,
          duration: 0.25,
          ease: 'power1.out',
        })
        .to(meteorRef.current, {
          duration: 2.8, // Putar penuh animasi meteorit (~3.13 detik)
        })
        // Begitu meteorit selesai, transisi cepat kembali ke putih dan langsung masuk ke introscreen
        .to(meteorRef.current, {
          autoAlpha: 0,
          duration: 0.15,
          ease: 'power2.in',
        })
        .call(() => {
          handleFinish()
        })
    }, containerRef)

    return () => ctx.revert()
  }, [handleFinish])

  // Support tombol keyboard (Space / Enter / Escape) untuk lewati
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        handleFinish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleFinish])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-white select-none"
      onClick={handleFinish}
      role="presentation"
    >
      {/* 1 & 2: Container Logo Studio di tengah layar */}
      <div className="relative z-10 flex h-64 w-full items-center justify-center px-6">
        {/* Logo 1: Toge Productions */}
        <div
          ref={togeRef}
          className="absolute flex flex-col items-center justify-center will-change-transform"
        >
          <img
            alt="Toge Productions"
            className="h-auto w-56 max-w-[80vw] object-contain drop-shadow-sm sm:w-72 [image-rendering:pixelated]"
            src={togeLogo}
          />
        </div>

        {/* Logo 2: Mojiken Studio */}
        <div
          ref={mojikenRef}
          className="absolute flex flex-col items-center justify-center will-change-transform"
        >
          <img
            alt="Mojiken Studio"
            className="h-auto w-40 max-w-[70vw] object-contain mix-blend-multiply sm:w-48"
            src={mojikenLogo}
          />
        </div>
      </div>

      {/* 3: Video / Animasi Meteorit (Full Screen Cutscene) */}
      <div
        ref={meteorRef}
        className="pointer-events-none absolute inset-0 z-15 flex items-center justify-center overflow-hidden bg-white"
      >
        <img
          ref={meteorImgRef}
          alt="Animasi Meteorit"
          className="h-full w-full object-cover select-none"
        />
      </div>

      {/* Tombol lewati (subtle tanpa frame) di pojok bawah */}
      <button
        ref={skipBtnRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          handleFinish()
        }}
        className="absolute bottom-6 right-6 z-30 cursor-pointer text-xs font-mono tracking-wider text-neutral-400 transition hover:text-neutral-700"
      >
        [Tekan Apa Saja] Untuk LEWATI / SKIP &rarr;
      </button>
    </div>
  )
}
