import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TownScene from '../../scenes/town/TownScene'

gsap.registerPlugin(ScrollTrigger)

/**
 * PENGATURAN VARIABEL (Mudah Disesuaikan):
 * 1. pixelSize: Ukuran tiap pecahan piksel kotak (px)
 * 2. scrollDistanceMultiplier: Jarak / sensitivitas scroll (pengali tinggi viewport 'vh')
 * 3. scatterForce: Jarak terlemparnya pecahan partikel saat terurai (px)
 * 4. floatForce: Daya apung ke atas saat partikel terurai dari bawah ke atas
 */
export const PIXEL_TRANSITION_CONFIG = {
  // Ukuran piksel kotak (px)
  pixelSize: 12,

  // Sensitivitas jarak scroll (1.8 = 180vh)
  scrollDistanceMultiplier: 1.8,

  // Kekuatan sebaran partikel saat terurai
  scatterForce: 65,

  // Daya dorong apung partikel ke atas (bottom-up drift)
  floatForce: 45,
}

const thumbnailAsset = '/assets/a_space_unbound/foto/thumnail/thumnail2.webp'
const logoAsset = '/assets/a_space_unbound/foto/logo/logo3.png'

export default function ScrollExperience() {
  const containerRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const bgImgRef = useRef(null)
  const section2Ref = useRef(null)
  const logoRef = useRef(null)
  const buttonRef = useRef(null)
  const whiteFadeRef = useRef(null)

  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Cache data partikel piksel untuk performa 60 FPS
  const blocksRef = useRef([])
  const progressRef = useRef(0)
  const isRenderingRef = useRef(false)

  // 1. Memuat gambar Section 1 (Artwork + Logo) dan menyiapkan data disintegrasi dari bawah ke atas
  useEffect(() => {
    let isMounted = true
    const imgThumbnail = new Image()
    const imgLogo = new Image()

    let loadedCount = 0
    const onAssetLoad = () => {
      loadedCount++
      if (loadedCount === 2 && isMounted) {
        buildPixelGrid(imgThumbnail, imgLogo)
        setImagesLoaded(true)
      }
    }

    imgThumbnail.src = thumbnailAsset
    imgLogo.src = logoAsset
    imgThumbnail.onload = onAssetLoad
    imgLogo.onload = onAssetLoad

    return () => {
      isMounted = false
    }
  }, [])

  // Membangun grid partikel piksel untuk dihancurkan DARI BAWAH KE ATAS
  const buildPixelGrid = (imgThumbnail, imgLogo) => {
    const width = window.innerWidth
    const height = window.innerHeight
    const { pixelSize } = PIXEL_TRANSITION_CONFIG

    const cols = Math.ceil(width / pixelSize)
    const rows = Math.ceil(height / pixelSize)

    // Offscreen Canvas untuk ekstraksi warna instan
    const offscreen = document.createElement('canvas')
    offscreen.width = cols
    offscreen.height = rows
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true })
    if (!offCtx) return

    // Gambar background (object-cover)
    const imgRatio = imgThumbnail.naturalWidth / imgThumbnail.naturalHeight
    const screenRatio = width / height
    let sw, sh, sx, sy
    if (screenRatio > imgRatio) {
      sw = imgThumbnail.naturalWidth
      sh = imgThumbnail.naturalWidth / screenRatio
      sx = 0
      sy = (imgThumbnail.naturalHeight - sh) / 2
    } else {
      sh = imgThumbnail.naturalHeight
      sw = imgThumbnail.naturalHeight * screenRatio
      sy = 0
      sx = (imgThumbnail.naturalWidth - sw) / 2
    }
    offCtx.drawImage(imgThumbnail, sx, sy, sw, sh, 0, 0, cols, rows)

    // Gambar logo di tengah offscreen canvas agar logo ikut terurai menjadi pecahan piksel
    const logoAspect = imgLogo.naturalWidth / imgLogo.naturalHeight
    const logoW = Math.min(cols * 0.42, 140)
    const logoH = logoW / logoAspect
    const logoX = (cols - logoW) / 2
    const logoY = (rows - logoH) / 2 - rows * 0.04
    offCtx.drawImage(imgLogo, logoX, logoY, logoW, logoH)

    const imgData = offCtx.getImageData(0, 0, cols, rows).data
    const newBlocks = []

    for (let r = 0; r < rows; r++) {
      // HANCUR DARI BAWAH KE ATAS:
      // r = rows - 1 (paling bawah) -> yNorm = 0.0 (threshold paling kecil, hancur duluan)
      // r = 0 (paling atas)        -> yNorm = 1.0 (threshold paling besar, hancur terakhir)
      const yNorm = (rows - 1 - r) / Math.max(1, rows - 1)

      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 4
        const a = imgData[idx + 3]
        if (a < 10) continue // Abaikan piksel kosong

        // Variasi dither noise agar tepi patahan tidak lurus kaku
        const noise = Math.abs(Math.sin(c * 17.13 + r * 37.71) * 43758.5453) % 1

        // Threshold disintegrasi: dari bawah (0.02) merambat naik ke atas (0.85)
        const threshold = Math.min(0.86, Math.max(0.02, yNorm * 0.76 + (noise - 0.5) * 0.14))

        // Arah sebaran partikel: mengapung naik ke atas dengan sebaran menyamping
        const angle = -Math.PI / 2 + (noise - 0.5) * 1.5
        const speed = 0.8 + noise * 1.4

        newBlocks.push({
          x: c * pixelSize,
          y: r * pixelSize,
          color: `rgb(${imgData[idx]},${imgData[idx + 1]},${imgData[idx + 2]})`,
          threshold,
          angle,
          speed,
        })
      }
    }

    blocksRef.current = newBlocks

    if (canvasRef.current) {
      canvasRef.current.width = width
      canvasRef.current.height = height
      renderCanvas(progressRef.current)
    }
  }

  // 2. Render Frame Canvas Piksel Berdasarkan Nilai Scroll Progress (0 -> 1)
  const renderCanvas = (progress) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Saat diam di awal (progress = 0), canvas dibiarkan kosong agar gambar asli HD terlihat 100% tajam & bersih!
    // Saat di ujung (progress >= 0.98), canvas juga dibiarkan kosong untuk efisiensi performa 60 FPS
    if (progress <= 0.005 || progress >= 0.98) return

    const { pixelSize, scatterForce, floatForce } = PIXEL_TRANSITION_CONFIG
    const blocks = blocksRef.current
    const len = blocks.length

    const scatterDist = scatterForce * progress

    for (let i = 0; i < len; i++) {
      const b = blocks[i]

      // HANYA gambar partikel yang sudah mulai terurai dari bawah
      // (Bagian atas yang belum terurai tetap ditampilkan utuh oleh gambar asli HD)
      if (progress > b.threshold) {
        const localP = (progress - b.threshold) / (1 - b.threshold)
        if (localP >= 1) continue // Partikel sudah sepenuhnya terhapus / menghilang

        // Partikel terlempar dan mengapung ke atas
        const moveY = localP * scatterDist * 0.8 + localP * localP * floatForce
        const moveX = Math.cos(b.angle) * scatterDist * localP * b.speed

        const px = b.x + moveX
        const py = b.y - moveY
        const size = Math.max(1, pixelSize * (1 - localP * 0.45))
        const alpha = 1 - localP

        ctx.globalAlpha = alpha
        ctx.fillStyle = b.color
        ctx.fillRect(px, py, size, size)
      }
    }
    ctx.globalAlpha = 1.0
  }

  // 3. Listener Resize Layar
  useEffect(() => {
    const handleResize = () => {
      const imgThumbnail = new Image()
      const imgLogo = new Image()
      imgThumbnail.src = thumbnailAsset
      imgLogo.src = logoAsset
      let count = 0
      const onLoad = () => {
        count++
        if (count === 2) buildPixelGrid(imgThumbnail, imgLogo)
      }
      imgThumbnail.onload = onLoad
      imgLogo.onload = onLoad
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 4. GSAP ScrollTrigger dengan SCRUB: TRUE
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // 1. Transisi fade in putih awal masuk dari splash
      gsap.fromTo(
        whiteFadeRef.current,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }
      )

      // 2. Animasi awal logo & tombol Section 1
      gsap.fromTo(
        logoRef.current,
        { autoAlpha: 0, scale: 0.95, y: 10 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.05 }
      )
      gsap.fromTo(
        buttonRef.current,
        { autoAlpha: 0, y: 14, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, delay: 0.5, ease: 'power2.out' }
      )

      // 3. ScrollTrigger Utama dengan SCRUB: TRUE
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          progressRef.current = progress

          // A. Gambar HD dipotong bertahap DARI BAWAH KE ATAS
          // Gambar bawah terpotong naik, digantikan partikel piksel terurai di canvas
          if (bgImgRef.current) {
            const cutPercent = Math.min(100, progress * 115)
            bgImgRef.current.style.clipPath = `inset(0 0 ${cutPercent}% 0)`
          }

          // B. Render canvas pecahan partikel piksel
          if (!isRenderingRef.current) {
            isRenderingRef.current = true
            requestAnimationFrame(() => {
              renderCanvas(progress)
              isRenderingRef.current = false
            })
          }

          // C. Tombol di bagian bawah memudar lebih dulu saat gelombang kehancuran melewatinya (0.0 -> 0.25)
          const btnAlpha = Math.max(0, 1 - progress * 4.2)
          gsap.set(buttonRef.current, {
            autoAlpha: btnAlpha,
            y: -progress * 40,
            pointerEvents: progress > 0.12 ? 'none' : 'auto',
          })

          // D. Logo di bagian tengah memudar berikutnya saat gelombang mencapai tengah (0.15 -> 0.45)
          const logoAlpha = Math.max(0, 1 - Math.max(0, (progress - 0.15) * 3))
          gsap.set(logoRef.current, {
            autoAlpha: logoAlpha,
            y: -progress * 50,
          })

          // E. Section 2 (TownScene) muncul dari balik pecahan piksel
          const section2Alpha = Math.min(1, Math.max(0, (progress - 0.1) / 0.75))
          const section2Scale = 0.96 + 0.04 * Math.min(1, progress / 0.85)

          gsap.set(section2Ref.current, {
            autoAlpha: section2Alpha,
            scale: section2Scale,
            pointerEvents: progress >= 0.8 ? 'auto' : 'none',
          })
        },
      })
    }, container)

    return () => ctx.revert()
  }, [imagesLoaded])

  // 5. Aksi Klik Tombol "ENTER THE TOWN": Scroll mulus otomatis ke Section 2
  const handleEnterTown = useCallback(() => {
    if (!containerRef.current) return
    const targetScroll =
      containerRef.current.offsetTop +
      containerRef.current.offsetHeight -
      window.innerHeight

    const scrollObj = { y: window.scrollY }
    gsap.to(scrollObj, {
      y: targetScroll,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y)
      },
    })
  }, [])

  // 6. Aksi Klik "Return to intro": Scroll mulus otomatis kembali ke Section 1
  const handleReturnToIntro = useCallback(() => {
    const scrollObj = { y: window.scrollY }
    gsap.to(scrollObj, {
      y: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y)
      },
    })
  }, [])

  // Dukungan tombol keyboard Space / Enter saat berada di Section 1
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && progressRef.current < 0.2) {
        handleEnterTown()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleEnterTown])

  const trackHeightVh = Math.round(PIXEL_TRANSITION_CONFIG.scrollDistanceMultiplier * 100)

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black select-none"
      style={{ minHeight: `${trackHeightVh + 100}vh` }}
    >
      {/* Pinned Viewport Window */}
      <div
        ref={pinWrapperRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
      >
        {/* ========================================================================= */}
        {/* SECTION 2 (DESTINASI): TownScene (Muncul dari balik pecahan piksel)        */}
        {/* ========================================================================= */}
        <div
          ref={section2Ref}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 will-change-[transform,opacity]"
        >
          <TownScene onReturnToIntro={handleReturnToIntro} />
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1 (AWAL): Background Gambar ASLI HD (Tajam, Tidak Pre-pixelated)   */}
        {/* ========================================================================= */}
        <img
          ref={bgImgRef}
          alt="A Space for the Unbound Artwork"
          className="absolute inset-0 z-5 h-full w-full object-cover object-center select-none will-change-[clip-path]"
          src={thumbnailAsset}
        />

        {/* Lapisan Vignette Halus */}
        <div className="pointer-events-none absolute inset-0 z-6 bg-black/20" />

        {/* ========================================================================= */}
        {/* CANVAS: Efek Pecahan Piksel HANCUR DARI BAWAH KE ATAS                      */}
        {/* ========================================================================= */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10 block h-full w-full will-change-transform"
        />

        {/* Lapisan Fade In Putih Awal Masuk dari Splash */}
        <div
          ref={whiteFadeRef}
          className="pointer-events-none absolute inset-0 z-30 bg-white will-change-[opacity]"
        />

        {/* ========================================================================= */}
        {/* UI SECTION 1: Logo & Tombol Pixelated ENTER THE TOWN                      */}
        {/* ========================================================================= */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          {/* Logo Tengah */}
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
            onClick={handleEnterTown}
            className="group relative mt-10 inline-flex cursor-pointer items-center justify-center border-2 border-amber-300 bg-[#141926]/90 px-7 py-3.5 font-['Press_Start_2P',monospace] text-[11px] uppercase tracking-wider text-amber-300 shadow-[4px_4px_0px_#000000] transition-all duration-150 select-none hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-300 hover:text-[#10141d] hover:shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none sm:px-9 sm:py-4 sm:text-xs pointer-events-auto"
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
      </div>
    </div>
  )
}
