import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GameDescriptionSection from './GameDescriptionSection'

gsap.registerPlugin(ScrollTrigger)

/**
 * PENGATURAN VARIABEL (Mudah Disesuaikan):
 * 1. pixelSize: Ukuran tiap pecahan piksel kotak (px)
 * 2. scatterForce: Jarak sebaran partikel menyamping saat terurai (px)
 * 3. floatForce: Daya dorong apung partikel ke atas saat terurai dari tengah bawah ke atas (px)
 */
export const PIXEL_TRANSITION_CONFIG = {
  // Ukuran piksel kotak (px)
  pixelSize: 12,

  // Kekuatan sebaran partikel menyamping saat terurai
  scatterForce: 60,

  // Daya dorong apung partikel ke atas (bottom-up drift)
  floatForce: 55,
}

const thumbnailAsset = '/assets/a_space_unbound/foto/thumnail/thumnail2.webp'
const logoAsset = '/assets/a_space_unbound/foto/logo/logo3.png'
const gerbongAsset = '/assets/loading/gerbong.png'

export default function ScrollExperience({ onEnterTown }) {
  const containerRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const bgImgRef = useRef(null)
  const aboutWrapperRef = useRef(null)
  const aboutContentRef = useRef(null)
  const heroUiRef = useRef(null)
  const logoRef = useRef(null)
  const buttonRef = useRef(null)
  const whiteFadeRef = useRef(null)

  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isEnteringTown, setIsEnteringTown] = useState(false)
  const isEnteringRef = useRef(false)

  // Cache data partikel piksel untuk performa tinggi
  const blocksRef = useRef([])
  const progressRef = useRef(0)
  const isRenderingRef = useRef(false)

  // 1. Memuat gambar Section 1 (Artwork + Logo) dan menyiapkan data disintegrasi dari tengah bawah ke atas
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

  // Membangun grid partikel piksel untuk dihancurkan DARI TENGAH BAWAH KE ATAS
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

    // Gambar logo di tengah offscreen canvas agar logo ikut diekstraksi ke pecahan piksel
    const logoAspect = imgLogo.naturalWidth / imgLogo.naturalHeight
    const logoW = Math.min(cols * 0.42, 140)
    const logoH = logoW / logoAspect
    const logoX = (cols - logoW) / 2
    const logoY = (rows - logoH) / 2 - rows * 0.04
    offCtx.drawImage(imgLogo, logoX, logoY, logoW, logoH)

    const imgData = offCtx.getImageData(0, 0, cols, rows).data
    const newBlocks = []

    // Koordinat pusat disintegrasi: TENGAH BAWAH (Center Bottom)
    const cx = (cols - 1) / 2

    for (let r = 0; r < rows; r++) {
      // dy: 0.0 di bagian paling bawah layar, 1.0 di bagian paling atas
      const dy = (rows - 1 - r) / Math.max(1, rows - 1)

      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 4
        const a = imgData[idx + 3]
        if (a < 10) continue // Abaikan piksel kosong

        // dx: 0.0 di tengah horizontal layar, 1.0 di tepi kiri / kanan
        const dx = Math.abs(c - cx) / Math.max(1, cx)

        // Jarak lengkung elips dari tengah bawah ke atas
        const dist = Math.sqrt(dx * dx * 0.45 + dy * dy)
        const normDist = dist / 1.204 // Normalisasi nilai jarak maks

        // Variasi dither noise agar tepi patahan berbentuk tekstur piksel organik
        const noise = Math.abs(Math.sin(c * 17.13 + r * 37.71) * 43758.5453) % 1

        // Threshold disintegrasi: dari tengah bawah merambat naik ke atas dan menyamping
        const threshold = Math.min(0.75, Math.max(0.02, normDist * 0.65 + (noise - 0.5) * 0.12))

        // Arah sebaran partikel: mengapung NAIK KE ATAS dengan sedikit dorongan keluar dari tengah
        const hDir = (c - cx) / Math.max(1, cx)
        const angle = -Math.PI / 2 + hDir * 0.45 + (noise - 0.5) * 0.7
        const speed = 0.8 + noise * 1.5

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

  // 2. Render Frame Canvas Piksel Berdasarkan Nilai Scroll / Animasi Progress (0 -> 1)
  const renderCanvas = (progress) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Saat diam di awal (progress = 0), canvas dibiarkan kosong agar gambar asli HD terlihat 100% tajam & bersih!
    // Saat di ujung (progress >= 0.85), canvas juga dibiarkan kosong untuk efisiensi performa
    if (progress <= 0.002 || progress >= 0.85) return

    const { pixelSize, scatterForce, floatForce } = PIXEL_TRANSITION_CONFIG
    const blocks = blocksRef.current
    const len = blocks.length

    // Durasi hidup partikel setelah threshold disintegrasinya terlewati
    const particleLife = 0.20

    for (let i = 0; i < len; i++) {
      const b = blocks[i]

      // HANYA gambar partikel yang sudah mulai terurai dari tengah bawah
      if (progress > b.threshold) {
        const localP = (progress - b.threshold) / particleLife
        if (localP >= 1) continue // Partikel sudah sepenuhnya terhapus / menghilang

        // Partikel terlempar dan mengapung naik ke atas (bottom-up upward drift)
        const moveY = localP * floatForce * 0.7 + localP * localP * floatForce * 0.5
        const moveX = Math.sin(b.angle) * scatterForce * localP * b.speed

        const px = b.x + moveX
        const py = b.y - moveY
        const size = Math.max(1, pixelSize * (1 - localP * 0.4))
        const alpha = Math.max(0, 1 - localP)

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

  // 4. GSAP ScrollTrigger dengan SCRUB: TRUE untuk transisi ke AboutScreen
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // 1. Transisi fade in putih halus awal masuk dari loading
      gsap.fromTo(
        whiteFadeRef.current,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.6, ease: 'power2.out' }
      )

      // 2. Animasi awal logo & tombol Section 1
      gsap.fromTo(
        logoRef.current,
        { autoAlpha: 0, scale: 0.95, y: 10 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.1 }
      )
      gsap.fromTo(
        buttonRef.current,
        { autoAlpha: 0, y: 14, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, delay: 0.5, ease: 'power2.out' }
      )

      // 3. ScrollTrigger Utama: Scrub dissolve dari tengah bawah ke atas,
      // mengungkapkan AboutScreen di tempat (in-place) tanpa terpotong!
      const DISSOLVE_END = 0.75

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          // Jangan timpa jika sedang dalam animasi tombol Enter the Town
          if (isEnteringRef.current) return

          const progress = self.progress
          progressRef.current = progress

          // Fase 1: Dissolve progress (0 -> 1)
          const dissolveP = Math.min(1, progress / DISSOLVE_END)

          // A. Efek Erased dari Tengah Bawah ke Atas pada gambar latar Section 1
          if (bgImgRef.current) {
            if (dissolveP <= 0.005) {
              bgImgRef.current.style.maskImage = 'none'
              bgImgRef.current.style.webkitMaskImage = 'none'
              bgImgRef.current.style.opacity = '1'
            } else if (dissolveP >= 0.95) {
              bgImgRef.current.style.opacity = '0'
            } else {
              bgImgRef.current.style.opacity = '1'
              const cutRadius = Math.min(135, dissolveP * 135)
              const maskStyle = `radial-gradient(ellipse 85% 75% at 50% 100%, transparent ${cutRadius}%, black ${cutRadius + 10}%)`
              bgImgRef.current.style.maskImage = maskStyle
              bgImgRef.current.style.webkitMaskImage = maskStyle
            }
          }

          // B. Render canvas pecahan partikel piksel
          if (!isRenderingRef.current) {
            isRenderingRef.current = true
            requestAnimationFrame(() => {
              renderCanvas(dissolveP)
              isRenderingRef.current = false
            })
          }

          // C. Seluruh UI Section 1 (Logo, Tombol, Hint Scroll) memudar halus saat scroll
          if (heroUiRef.current) {
            const uiAlpha = Math.max(0, 1 - dissolveP * 3.2)
            gsap.set(heroUiRef.current, {
              autoAlpha: uiAlpha,
              y: -dissolveP * 35,
              pointerEvents: dissolveP > 0.08 ? 'none' : 'auto',
            })
          }

          // D. Section 2 (AboutScreen) muncul di tempat (in-place) dari balik pecahan piksel!
          const aboutAlpha = Math.min(1, Math.max(0, (dissolveP - 0.04) / 0.65))

          if (aboutWrapperRef.current) {
            gsap.set(aboutWrapperRef.current, {
              autoAlpha: aboutAlpha,
              pointerEvents: dissolveP >= 0.75 ? 'auto' : 'none',
            })
          }

          // E. Fase 2: Translasi isi konten AboutScreen jika tingginya melebihi layar
          if (aboutContentRef.current) {
            const contentH = aboutContentRef.current.scrollHeight
            const windowH = window.innerHeight
            const maxScroll = Math.max(0, contentH - windowH)

            if (maxScroll > 0 && progress > DISSOLVE_END) {
              const scrollRatio = (progress - DISSOLVE_END) / (1 - DISSOLVE_END)
              gsap.set(aboutContentRef.current, {
                y: -maxScroll * scrollRatio,
              })
            } else {
              gsap.set(aboutContentRef.current, { y: 0 })
            }
          }
        },
      })
    }, container)

    return () => ctx.revert()
  }, [imagesLoaded])

  // 5. Aksi Klik Tombol "ENTER THE TOWN": Jalankan animasi pixel pecah yang sama lalu masuk ke IntroScreen
  const handleEnterTownClick = useCallback(() => {
    if (isEnteringRef.current) return
    isEnteringRef.current = true
    setIsEnteringTown(true)

    // Animasi keluar pixel pecah (dari tengah bawah ke atas)
    const animProxy = { p: 0 }
    gsap.to(animProxy, {
      p: 1,
      duration: 1.25,
      ease: 'power2.inOut',
      onUpdate: () => {
        renderCanvas(animProxy.p)
        if (bgImgRef.current) {
          const cutRadius = Math.min(135, animProxy.p * 135)
          const maskStyle = `radial-gradient(ellipse 85% 75% at 50% 100%, transparent ${cutRadius}%, black ${cutRadius + 10}%)`
          bgImgRef.current.style.maskImage = maskStyle
          bgImgRef.current.style.webkitMaskImage = maskStyle
        }
        if (heroUiRef.current) {
          gsap.set(heroUiRef.current, { autoAlpha: Math.max(0, 1 - animProxy.p * 3.5) })
        }
      },
      onComplete: () => {
        onEnterTown?.()
      },
    })
  }, [onEnterTown])

  // 6. Aksi Klik "KEMBALI KE HALAMAN AWAL" dari AboutScreen
  const handleScrollToTop = useCallback(() => {
    const scrollObj = { y: window.scrollY }
    gsap.to(scrollObj, {
      y: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y)
      },
    })
  }, [])

  // Dukungan tombol keyboard Space / Enter saat berada di Section 1
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && progressRef.current < 0.15 && !isEnteringRef.current) {
        handleEnterTownClick()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleEnterTownClick])

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0a0f16] select-none"
      style={{ minHeight: '220vh' }}
    >
      {/* ========================================================================= */}
      {/* SECTION 1: HERO TRACK (PINNED VIEWPORT DENGAN PIXEL DISSOLVE)              */}
      {/* ========================================================================= */}
      <div
        ref={pinWrapperRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0f16]"
      >
        {/* ========================================================================= */}
        {/* SECTION 2 (DESTINASI): AboutScreen (Muncul di tempat dari balik piksel)    */}
        {/* ========================================================================= */}
        <div
          ref={aboutWrapperRef}
          className="pointer-events-none absolute inset-0 z-2 opacity-0 overflow-hidden will-change-[transform,opacity]"
        >
          <div ref={aboutContentRef} className="h-full w-full will-change-transform">
            <GameDescriptionSection onScrollToTop={handleScrollToTop} />
          </div>
        </div>

        {/* Preview Town saat tombol Enter the Town ditekan */}
        {isEnteringTown && (
          <div className="absolute inset-0 z-3 flex items-center justify-center bg-[#17212a] will-change-[opacity]">
            <img
              src={gerbongAsset}
              alt="Entering Town"
              className="h-full w-full object-cover object-center brightness-90 filter"
            />
            <div className="absolute inset-0 bg-[#101925]/40" />
          </div>
        )}

        {/* SECTION 1 (AWAL): Background Gambar ASLI HD (Tajam) */}
        <img
          ref={bgImgRef}
          alt="A Space for the Unbound Artwork"
          className="absolute inset-0 z-5 h-full w-full object-cover object-center select-none will-change-[opacity]"
          src={thumbnailAsset}
        />

        {/* Lapisan Vignette Halus */}
        <div className="pointer-events-none absolute inset-0 z-6 bg-black/20" />

        {/* CANVAS: Efek Pecahan Piksel HANCUR DARI TENGAH BAWAH KE ATAS */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10 block h-full w-full will-change-transform"
        />

        {/* Lapisan Fade In Putih Awal Masuk dari Loading */}
        <div
          ref={whiteFadeRef}
          className="pointer-events-none absolute inset-0 z-30 bg-white will-change-[opacity]"
        />

        {/* UI SECTION 1: Logo, Tombol Pixelated ENTER THE TOWN, & Hint Scroll */}
        <div
          ref={heroUiRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-[opacity,transform]"
        >
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
            onClick={handleEnterTownClick}
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

          {/* Hint Scroll Indikator: Masuk ke About Screen */}
          <div className="mt-6 flex flex-col items-center opacity-60 transition-opacity hover:opacity-100">
            <span className="font-['Press_Start_2P',monospace] text-[9px] tracking-widest text-amber-200/80">
              SCROLL DOWN FOR ABOUT GAME
            </span>
            <span className="mt-1 animate-bounce text-amber-300 text-xs">
              ▼
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
