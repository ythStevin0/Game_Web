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
  // Ukuran piksel kotak (px) - ukuran 14px menghasilkan partikel retro 16-bit yang padat dan tajam
  pixelSize: 14,

  // Kekuatan sebaran partikel menyamping saat terurai (luas & dramatis)
  scatterForce: 65,

  // Daya dorong apung partikel ke atas (bottom-up drift yang tinggi)
  floatForce: 68,
}

const thumbnailAsset = '/assets/a_space_unbound/foto/thumnail/thumnail2.webp'
const logoAsset = '/assets/a_space_unbound/foto/logo/logo3.png'
const gerbongAsset = '/assets/loading/gerbong.png'

export default function ScrollExperience({ onEnterTown }) {
  const containerRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const heroBgWrapperRef = useRef(null)
  const bgImgRef = useRef(null)
  const aboutSectionRef = useRef(null)
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

    // Koordinat pusat disintegrasi: TENGAH BAWAH (Center Bottom) merambat naik ke atas dan menyamping
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

        // Variasi dither noise agar tepi patahan berbentuk tekstur piksel 16-bit organik yang tebal
        const noise = Math.abs(Math.sin(c * 17.13 + r * 37.71) * 43758.5453) % 1

        // Threshold disintegrasi: dari tengah bawah merambat naik ke atas dan menyamping
        const threshold = Math.min(0.85, Math.max(0.01, normDist * 0.70 + (noise - 0.5) * 0.16))

        // Arah sebaran partikel: mengapung NAIK KE ATAS dengan dorongan menyamping
        const hDir = (c - cx) / Math.max(1, cx)
        const angle = -Math.PI / 2 + hDir * 0.45 + (noise - 0.5) * 0.7
        const speed = 0.8 + noise * 1.6

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

    // Sort blocks by threshold agar loop renderCanvas dapat dipotong cepat (early break) untuk 60 FPS
    newBlocks.sort((a, b) => a.threshold - b.threshold)
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
    // Saat disintegrasi tuntas (progress >= 0.95), canvas juga dibiarkan kosong untuk efisiensi performa
    if (progress <= 0.002 || progress >= 0.95) return

    const { pixelSize, scatterForce, floatForce } = PIXEL_TRANSITION_CONFIG
    const blocks = blocksRef.current
    const len = blocks.length

    // Durasi hidup partikel diperpanjang agar tercipta awan partikel retro yang tebal dan dramatis
    const particleLife = 0.22
    const minActiveThreshold = progress - particleLife

    for (let i = 0; i < len; i++) {
      const b = blocks[i]

      // Karena blocks sudah di-sort by threshold:
      // Jika threshold partikel > progress saat ini, sisa partikel berikutnya belum terurai!
      if (b.threshold > progress) break

      // Jika threshold partikel sudah terlalu jauh di masa lalu (melebihi umur hidup partikel), lewati!
      if (b.threshold < minActiveThreshold) continue

      const localP = (progress - b.threshold) / particleLife
      if (localP >= 1) continue

      // Partikel terlempar dan mengapung naik ke atas (bottom-up upward drift yang tinggi)
      const moveY = localP * floatForce * 0.9 + localP * localP * floatForce * 0.6
      const moveX = Math.sin(b.angle) * scatterForce * localP * b.speed

      const px = b.x + moveX
      const py = b.y - moveY
      const size = Math.max(2, pixelSize * (1 - localP * 0.3))
      const alpha = Math.max(0, 1 - localP * localP)

      ctx.globalAlpha = alpha
      ctx.fillStyle = b.color
      ctx.fillRect(px, py, size, size)
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

  // 4. GSAP ScrollTrigger Master Timeline: Pixel Dissolve (Hero) & Staggered Reveal (About)
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

      // 3. Set status awal seluruh elemen Section About agar tersembunyi (siap di-stagger dari bawah)
      gsap.set(
        [
          '.about-anim-header',
          '.about-anim-eyebrow',
          '.about-anim-title',
          '.about-anim-dialogue',
          '.about-anim-badges',
          '.about-anim-gallery',
        ],
        {
          autoAlpha: 0,
          y: 45,
        }
      )

      // Objek proxy untuk mengendalikan nilai p (0 -> 1) disintegrasi piksel
      const dissolveProxy = { p: 0 }

      // Helper function untuk render visual piksel & mask
      const updateDissolveVisuals = (progress) => {
        progressRef.current = progress

        if (!isRenderingRef.current) {
          isRenderingRef.current = true
          requestAnimationFrame(() => {
            const p = progressRef.current

            // Mask radial tengah-bawah ke atas pada gambar background HD + vignette
            if (heroBgWrapperRef.current) {
              if (p <= 0.005) {
                heroBgWrapperRef.current.style.maskImage = 'none'
                heroBgWrapperRef.current.style.webkitMaskImage = 'none'
                heroBgWrapperRef.current.style.opacity = '1'
              } else if (p >= 0.95) {
                heroBgWrapperRef.current.style.opacity = '0'
              } else {
                heroBgWrapperRef.current.style.opacity = '1'
                const cutRadius = Math.min(140, p * 140)
                const maskStyle = `radial-gradient(ellipse 85% 75% at 50% 100%, transparent ${cutRadius}%, black ${cutRadius + 12}%)`
                heroBgWrapperRef.current.style.maskImage = maskStyle
                heroBgWrapperRef.current.style.webkitMaskImage = maskStyle
              }
            }

            // Render partikel kanvas pecah
            renderCanvas(p)

            isRenderingRef.current = false
          })
        }
      }

      // 4. MASTER GSAP TIMELINE:
      // Mengintegrasikan Pixel Dissolve Section 1 & Staggered Reveal Section About ke SATU Timeline terpadu
      // dengan scrub: true agar terikat presisi secara real-time dengan roda / touch scroll pengguna
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2.0}`,
          scrub: true,
        },
      })

      // === PARALLEL ANIMATION: SECTION 1 PIXEL DISSOLVE & SECTION 2 OVERLAY REVEAL ===
      // A. UI Hero (Logo & Tombol) memudar cepat di awal scroll
      masterTl.to(
        heroUiRef.current,
        {
          autoAlpha: 0,
          y: -30,
          ease: 'power1.out',
          duration: 0.25,
        },
        0
      )

      // B. Disintegrasi piksel Section 1 terurai dari tengah bawah ke atas (t: 0 -> 0.95)
      // Menghapus gambar Layer Atas secara bertahap sehingga Layer Bawah terkuak dari baliknya
      masterTl.to(
        dissolveProxy,
        {
          p: 1,
          ease: 'none',
          duration: 0.95,
          onUpdate: () => {
            updateDissolveVisuals(dissolveProxy.p)
          },
        },
        0
      )

      // C. Fade out Layer Atas sepenuhnya saat piksel selesai terurai (t: 0.90 -> 1.05)
      masterTl.to(
        pinWrapperRef.current,
        {
          autoAlpha: 0,
          ease: 'power1.out',
          duration: 0.15,
        },
        0.90
      )

      // === STAGGERED CONTENT ENTRANCE: SECTION ABOUT (t: 0.25 -> 1.85) ===
      // Elemen-elemen Section About muncul bertahap dari bawah ke atas (slide up + fade in)
      // secara berurutan mengikuti laju scroll
      masterTl
        // 1. Top Bar: Section Badge & Tombol Kembali (t: 0.25 -> 0.50)
        .to(
          '.about-anim-header',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.25
        )
        // 2. Eyebrow Tag 16-Bit Pixel Adventure (t: 0.42 -> 0.67)
        .to(
          '.about-anim-eyebrow',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.42
        )
        // 3. Judul Headline "HIGH SCHOOL IS ENDING..." & Stepped Divider (t: 0.60 -> 0.85)
        .to(
          '.about-anim-title',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.60
        )
        // 4. Pixel RPG Dialogue Box (Atma, Story, Raya) (t: 0.80 -> 1.15)
        .to(
          '.about-anim-dialogue',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.80
        )
        // 5. Retro Badges & Platform Cartridge Logos (t: 1.15 -> 1.50)
        .to(
          '.about-anim-badges',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
          },
          1.15
        )
        // 6. Art Gallery Arcade Monitor Frame & Thumbnail Strip (t: 1.45 -> 1.85)
        .to(
          '.about-anim-gallery',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.40,
            ease: 'power2.out',
          },
          1.45
        )
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
        if (heroBgWrapperRef.current) {
          const cutRadius = Math.min(140, animProxy.p * 140)
          const maskStyle = `radial-gradient(ellipse 85% 75% at 50% 100%, transparent ${cutRadius}%, black ${cutRadius + 12}%)`
          heroBgWrapperRef.current.style.maskImage = maskStyle
          heroBgWrapperRef.current.style.webkitMaskImage = maskStyle
        }
        if (heroUiRef.current) {
          heroUiRef.current.style.opacity = String(Math.max(0, 1 - animProxy.p * 3.5))
        }
      },
      onComplete: () => {
        onEnterTown?.()
      },
    })
  }, [onEnterTown])

  // 6. Aksi Klik "KEMBALI KE HALAMAN AWAL" dari AboutScreen
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  // 7. Aksi Klik "SCROLL DOWN FOR ABOUT GAME" untuk scroll halus ke Section About
  const handleScrollDownClick = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight * 1.15,
      behavior: 'smooth',
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
      className="relative w-full bg-white select-none"
    >
      {/* ========================================================================= */}
      {/* LAYER ATAS (z-index: 2 / z-20 - SECTION HERO: GAMBAR UTAMA + HTML5 CANVAS) */}
      {/* ========================================================================= */}
      <div
        ref={pinWrapperRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-transparent z-20 pointer-events-none"
      >
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

        {/* SECTION 1: Wrapper Background Gambar ASLI HD + Lapisan Vignette */}
        <div
          ref={heroBgWrapperRef}
          className="absolute inset-0 z-5 select-none will-change-[opacity]"
        >
          <img
            ref={bgImgRef}
            alt="A Space for the Unbound Artwork"
            className="h-full w-full object-cover object-center select-none"
            src={thumbnailAsset}
          />
          {/* Lapisan Vignette Halus */}
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
        </div>

        {/* HTML5 CANVAS: Efek Pixel Dissolve berjalan di Layer Atas (z-15) */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-15 block h-full w-full will-change-transform"
        />

        {/* Lapisan Fade In Putih Awal Masuk dari Loading */}
        <div
          ref={whiteFadeRef}
          className="pointer-events-none absolute inset-0 z-30 bg-white will-change-[opacity]"
        />

        {/* UI SECTION 1: Logo, Tombol Pixelated ENTER THE TOWN, & Hint Scroll */}
        <div
          ref={heroUiRef}
          className="pointer-events-none absolute inset-0 z-25 flex flex-col items-center justify-center px-6 text-center will-change-[opacity,transform]"
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
            className="group relative mt-10 inline-flex cursor-pointer items-center justify-center border-2 border-black bg-[#bde200] px-7 py-3.5 font-['Press_Start_2P',monospace] text-[11px] uppercase tracking-wider text-black shadow-[4px_4px_0px_#000000] transition-all duration-150 select-none hover:-translate-y-0.5 hover:bg-[#0c71c3] hover:text-white hover:shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none sm:px-9 sm:py-4 sm:text-xs pointer-events-auto"
          >
            <span className="mr-2.5 text-[#0c71c3] transition-colors duration-150 group-hover:text-white">
              ▶
            </span>
            <span>ENTER THE TOWN</span>
            <span className="ml-2.5 text-[#0c71c3] transition-colors duration-150 group-hover:text-white">
              ◀
            </span>
          </button>

          {/* Hint Scroll Indikator: Masuk ke About Screen */}
          <div
            onClick={handleScrollDownClick}
            className="mt-6 flex flex-col items-center opacity-90 transition-opacity hover:opacity-100 cursor-pointer pointer-events-auto"
          >
            <span className="border-2 border-black bg-white/95 px-3.5 py-1 font-['Press_Start_2P',monospace] text-[9px] tracking-widest text-black shadow-[2px_2px_0px_#000000]">
              SCROLL DOWN FOR ABOUT GAME
            </span>
            <span className="mt-1.5 animate-bounce text-[#bde200] text-sm drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LAYER BAWAH (z-index: 1 / z-10 - SECTION ABOUT: KONTEN ABOUT TERKUAK)     */}
      {/* ========================================================================= */}
      <div
        ref={aboutSectionRef}
        className="relative z-10 w-full bg-white"
      >
        <GameDescriptionSection onScrollToTop={handleScrollToTop} />
      </div>
    </div>
  )
}
