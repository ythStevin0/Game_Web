import { useCallback, useEffect, useRef, useState } from 'react'

// Character Pixel Sprites
const atmaPixelSprite = '/assets/a_space_unbound/foto/characters/Atma_pixel_sprite.webp'
const rayaPixelSprite = '/assets/a_space_unbound/foto/characters/Raya_pixel_sprite.webp'

// Platform logos
const steamLogo = '/assets/a_space_unbound/other/Steam_icon_logo.svg.png'
const switchLogo = '/assets/a_space_unbound/other/nintendo-switch.png'
const ps5Logo = '/assets/a_space_unbound/other/ps5.png'
const ps4Logo = '/assets/a_space_unbound/other/playstation-4-png-logo-5878.png'
const xboxLogo = '/assets/a_space_unbound/other/black-xbox-series-s-series-x-logos-701751694790446ascycyyien.png'
const epicLogo = '/assets/a_space_unbound/other/Epic_Games_logo.svg.png'

// Game art slides
export const GAME_ART_SLIDES = [
  {
    id: 1,
    image: '/assets/a_space_unbound/foto/thumnail/thumnail1.jpg',
    title: 'Atma & Raya di Bukit Senja',
    subtitle: 'Menatap langit kota kecil dengan misteri magis yang perlahan terkuak.',
    tag: 'KEY ARTWORK',
  },
  {
    id: 2,
    image: '/assets/a_space_unbound/foto/thumnail/aspacefortheunbound-1674275821607.jpg',
    title: 'Kota Loka di Sore Hari',
    subtitle: 'Kehangatan jalanan pedesaan Indonesia akhir tahun 90-an yang penuh kenangan.',
    tag: 'ENVIRONMENT',
  },
  {
    id: 3,
    image: '/assets/a_space_unbound/foto/characters/all_chars.jpg',
    title: 'Warga & Sahabat Kota',
    subtitle: 'Karakter-karakter unik dengan kisah, persahabatan, dan rahasia masing-masing.',
    tag: 'CHARACTERS',
  },
  {
    id: 4,
    image: '/assets/a_space_unbound/foto/characters/all_char_pixel.jpg',
    title: 'Pixel Art Sprites',
    subtitle: 'Detail animasi piksel klasik yang digambar tangan dengan penuh ketelitian.',
    tag: 'SPRITE ART',
  },
  {
    id: 5,
    image: '/assets/a_space_unbound/foto/gif/a-space-for-the-unbound-raya.gif',
    title: 'Petualangan Bersama Raya',
    subtitle: 'Eksplorasi magis penuh keajaiban supranatural yang mengikat takdir mereka berdua.',
    tag: 'ANIMATION',
  },
  {
    id: 6,
    image: '/assets/a_space_unbound/foto/characters/marin_pixel.jpg',
    title: 'Marin & Kucing-kucing Kota',
    subtitle: 'Temukan dan elus berbagai kucing lucu yang tersebar di sudut-sudut kota Loka.',
    tag: 'MINI-INTERACTION',
  },
]

export default function GameDescriptionSection({ onScrollToTop }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const timerRef = useRef(null)

  const totalSlides = GAME_ART_SLIDES.length

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  // Auto-play timer (3.8 detik)
  useEffect(() => {
    if (!isAutoPlaying) return

    timerRef.current = setInterval(() => {
      nextSlide()
    }, 3800)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isAutoPlaying, nextSlide])

  // Keyboard navigation (Q for Prev, E for Next)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'q') {
        prevSlide()
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'e') {
        nextSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSlide, nextSlide])

  // Touch Swipe Handlers untuk mobile/tablet
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section className="relative min-h-screen w-full bg-white px-4 py-8 text-black select-none sm:px-8 sm:py-10 lg:px-12 pixel-dots-bg">
      {/* Background Micro Ambient Accents */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-white/95" />

      <div className="relative mx-auto max-w-6xl">
        {/* ========================================================================= */}
        {/* TOP BAR: SECTION BADGE & RETURN BUTTON                                    */}
        {/* ========================================================================= */}
        <div className="about-anim-header mb-8 flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-3.5 w-3.5 bg-[#bde200] border-2 border-black shadow-[2px_2px_0px_#000]" />
            <span className="border-2 border-black bg-[#bde200] px-3 py-1 font-['Press_Start_2P',monospace] text-[10px] tracking-wider text-black shadow-[2px_2px_0px_#000000] sm:text-xs">
              ■ SECTION // 02: ABOUT THE GAME
            </span>
          </div>

          {onScrollToTop && (
            <button
              type="button"
              onClick={onScrollToTop}
              className="inline-flex cursor-pointer items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 font-['Press_Start_2P',monospace] text-[10px] text-black shadow-[3px_3px_0px_#000000] transition-all hover:bg-[#0c71c3] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <span className="text-[#0c71c3] group-hover:text-white">▲</span>
              <span>KEMBALI KE HALAMAN AWAL</span>
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN ATAS: INFO ABOUT RESMI DENGAN TEMA PIXEL RPG DIALOGUE BOX          */}
        {/* ========================================================================= */}
        <div className="mb-12 flex flex-col items-center text-center">
          {/* Eyebrow Tag */}
          <div className="about-anim-eyebrow inline-flex items-center gap-2 border-2 border-black bg-[#0c71c3] px-3.5 py-1 font-['Press_Start_2P',monospace] text-[9px] uppercase tracking-wider text-white shadow-[2px_2px_0px_#000000] sm:text-[10px]">
            <span>✦</span>
            <span>A SPACE FOR THE UNBOUND // 16-BIT PIXEL ADVENTURE</span>
            <span>✦</span>
          </div>

          {/* Judul Besar / Headline & Stepped Divider */}
          <div className="about-anim-title flex w-full flex-col items-center">
            <h2 className="mt-4 max-w-4xl font-['Press_Start_2P',monospace] text-base font-bold uppercase tracking-wider text-black leading-snug sm:text-xl md:text-2xl drop-shadow-[2px_2px_0px_rgba(189,226,0,0.4)]">
              HIGH SCHOOL IS ENDING AND THE WORLD IS ENDING WITH IT…
            </h2>

            <div className="my-3.5 flex w-full max-w-xl items-center justify-center gap-2 select-none">
              <span className="h-0.5 w-12 bg-black" />
              <span className="font-['Press_Start_2P',monospace] text-[9px] text-[#0c71c3]">◆ ░▒▓█▓▒░ ◆</span>
              <span className="h-0.5 w-12 bg-black" />
            </div>
          </div>

          {/* ======================================================================= */}
          {/* PIXEL RPG DIALOGUE BOX (CONTAINER CERITA DENGAN ATMA & RAYA SPRITES)      */}
          {/* ======================================================================= */}
          <div className="about-anim-dialogue relative mt-2 w-full max-w-5xl border-[3px] border-black bg-white p-5 shadow-[6px_6px_0px_#000000] sm:p-7">
            {/* 4 Pojok Stepped Pixel Brackets */}
            <div className="absolute -top-1.5 -left-1.5 h-4 w-4 bg-[#bde200] border-2 border-black z-30" />
            <div className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-[#0c71c3] border-2 border-black z-30" />
            <div className="absolute -bottom-1.5 -left-1.5 h-4 w-4 bg-[#0c71c3] border-2 border-black z-30" />
            <div className="absolute -bottom-1.5 -right-1.5 h-4 w-4 bg-[#bde200] border-2 border-black z-30" />

            {/* Window Header Bar (90s Retro RPG Window Motif) */}
            <div className="mb-5 flex flex-wrap items-center justify-between border-b-2 border-black pb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-[#bde200] border border-black" />
                <span className="font-['Press_Start_2P',monospace] text-[9px] text-black sm:text-[10px]">
                  [ DIALOGUE LOG // LOKA TOWN 199X ]
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-['Press_Start_2P',monospace] text-[8px] text-stone-500">
                <span className="border border-black bg-stone-100 px-1 py-0.5 text-black">_</span>
                <span className="border border-black bg-stone-100 px-1 py-0.5 text-black">□</span>
                <span className="border border-black bg-[#0c71c3] px-1 py-0.5 text-white">✕</span>
              </div>
            </div>

            {/* Konten Utama: Atma (Kiri) - Teks Cerita (Tengah) - Raya (Kanan) */}
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              {/* Kolom Kiri: Atma Pixel Sprite */}
              <div className="hidden flex-col items-center lg:col-span-2 lg:flex">
                <div className="relative flex h-40 w-24 items-end justify-center rounded border-2 border-black bg-[#0c71c3]/10 p-2 shadow-[3px_3px_0px_#000000]">
                  <img
                    src={atmaPixelSprite}
                    alt="Atma Pixel Sprite"
                    className="pixel-art pixel-idle-bob h-32 w-auto object-contain select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  />
                </div>
                <span className="mt-2 border-2 border-black bg-[#0c71c3] px-2 py-0.5 font-['Press_Start_2P',monospace] text-[8px] text-white shadow-[2px_2px_0px_#000000]">
                  ATMA
                </span>
              </div>

              {/* Kolom Tengah: 3 Paragraf Cerita Resmi Sesuai Permintaan */}
              <div className="space-y-4 text-center lg:col-span-8 lg:text-left">
                {/* Mobile Sprite Bar (Hanya tampil di layar kecil/ponsel) */}
                <div className="mb-4 flex items-center justify-center gap-4 lg:hidden">
                  <div className="flex flex-col items-center">
                    <div className="flex h-24 w-16 items-end justify-center border-2 border-black bg-[#0c71c3]/10 p-1 shadow-[2px_2px_0px_#000]">
                      <img
                        src={atmaPixelSprite}
                        alt="Atma"
                        className="pixel-art pixel-idle-bob h-20 w-auto object-contain"
                      />
                    </div>
                    <span className="mt-1 border border-black bg-[#0c71c3] px-1.5 py-0.5 font-['Press_Start_2P',monospace] text-[7px] text-white">
                      ATMA
                    </span>
                  </div>

                  <span className="font-['Press_Start_2P',monospace] text-xs text-[#0c71c3]">✦ & ✦</span>

                  <div className="flex flex-col items-center">
                    <div className="flex h-24 w-16 items-end justify-center border-2 border-black bg-[#bde200]/20 p-1 shadow-[2px_2px_0px_#000]">
                      <img
                        src={rayaPixelSprite}
                        alt="Raya"
                        className="pixel-art pixel-idle-bob h-20 w-auto object-contain"
                      />
                    </div>
                    <span className="mt-1 border border-black bg-[#bde200] px-1.5 py-0.5 font-['Press_Start_2P',monospace] text-[7px] text-black">
                      RAYA
                    </span>
                  </div>
                </div>

                {/* Paragraf 1 */}
                <p className="font-serif text-sm leading-relaxed text-stone-900 sm:text-base md:text-lg">
                  <strong className="text-[#0c71c3]">A Space For The Unbound</strong> is a slice-of-life adventure game that tells a story about overcoming anxiety, depression, and the relationship between a boy and a girl with supernatural powers.
                </p>

                {/* Paragraf 2 */}
                <p className="font-serif text-sm leading-relaxed text-stone-800 sm:text-base">
                  Follow two high school sweethearts,{' '}
                  <strong className="font-semibold text-black underline decoration-[#bde200] decoration-2">
                    Atma
                  </strong>{' '}
                  and{' '}
                  <strong className="font-semibold text-black underline decoration-[#0c71c3] decoration-2">
                    Raya
                  </strong>
                  , on a journey of self-discovery at the end of their high school years. When a mysteriously supernatural power is suddenly unleashed threatening their existence, they must explore and investigate their town to uncover hidden secrets, face the end of the world, and perhaps learn more about each other.
                </p>

                {/* Paragraf 3 */}
                <p className="font-serif text-xs leading-relaxed italic text-stone-600 sm:text-sm">
                  Set in a small town inspired by 90s era rural Indonesia, A Space for The Unbound presents an endearing story-driven experience with a vibrant environment waiting to be explored.
                </p>

                {/* Blinking Dialogue Prompt Footer */}
                <div className="pt-2 flex items-center justify-between border-t border-black/15 text-[9px] font-['Press_Start_2P',monospace]">
                  <span className="text-stone-500">INDONESIA 199X</span>
                  <div className="flex items-center gap-1.5 text-[#0c71c3]">
                    <span className="hidden sm:inline">EXPLORE GALLERY</span>
                    <span className="pixel-blink text-base font-bold text-[#bde200]">▼</span>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Raya Pixel Sprite */}
              <div className="hidden flex-col items-center lg:col-span-2 lg:flex">
                <div className="relative flex h-40 w-24 items-end justify-center rounded border-2 border-black bg-[#bde200]/20 p-2 shadow-[3px_3px_0px_#000000]">
                  <img
                    src={rayaPixelSprite}
                    alt="Raya Pixel Sprite"
                    className="pixel-art pixel-idle-bob h-32 w-auto object-contain select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  />
                </div>
                <span className="mt-2 border-2 border-black bg-[#bde200] px-2 py-0.5 font-['Press_Start_2P',monospace] text-[8px] text-black shadow-[2px_2px_0px_#000000]">
                  RAYA
                </span>
              </div>
            </div>
          </div>

          {/* Retro Pixel Badges & Platform Row */}
          <div className="about-anim-badges flex w-full flex-col items-center">
            {/* Retro Pixel Badges: 90s Nostalgia, Spacedive Magic, & Cats */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
              {/* Feature 1: 90s Nostalgia */}
              <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0px_#000000] transition hover:bg-[#bde200]">
                <span className="border border-black bg-[#bde200] px-1.5 py-0.5 font-['Press_Start_2P',monospace] text-[8px] text-black">
                  90s
                </span>
                <span className="font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] text-black tracking-wide">
                  NOSTALGIA INDONESIA
                </span>
              </div>

              {/* Feature 2: Spacedive */}
              <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0px_#000000] transition hover:bg-[#0c71c3] hover:text-white group">
                <span className="border border-black bg-[#0c71c3] px-1.5 py-0.5 font-['Press_Start_2P',monospace] text-[8px] text-white">
                  MAGIS
                </span>
                <span className="font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] text-black tracking-wide group-hover:text-white">
                  SPACEDIVE ABILITY
                </span>
              </div>

              {/* Feature 3: Pet The Cats (Iconic ASFTU Lore) */}
              <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0px_#000000] transition hover:bg-[#bde200]">
                <span className="border border-black bg-[#bde200] px-1.5 py-0.5 font-['Press_Start_2P',monospace] text-[8px] text-black">
                  🐱
                </span>
                <span className="font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] text-black tracking-wide">
                  PET ALL THE CATS
                </span>
              </div>
            </div>

            {/* Platform Availability Row (Pixel Cartridges) */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <span className="mr-1 font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] text-stone-600">
                AVAILABLE ON:
              </span>
              <div
                className="flex h-8 items-center border-2 border-black bg-white px-2.5 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200]"
                title="Steam"
              >
                <img src={steamLogo} alt="Steam" className="h-4 w-auto object-contain" />
              </div>
              <div
                className="flex h-8 items-center border-2 border-black bg-white px-2.5 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200]"
                title="Nintendo Switch"
              >
                <img src={switchLogo} alt="Nintendo Switch" className="h-4 w-auto object-contain" />
              </div>
              <div
                className="flex h-8 items-center border-2 border-black bg-white px-2.5 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200]"
                title="PlayStation 5"
              >
                <img src={ps5Logo} alt="PS5" className="h-4 w-auto object-contain" />
              </div>
              <div
                className="flex h-8 items-center border-2 border-black bg-white px-2.5 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200]"
                title="PlayStation 4"
              >
                <img src={ps4Logo} alt="PS4" className="h-3.5 w-auto object-contain" />
              </div>
              <div
                className="flex h-8 items-center border-2 border-black bg-white px-2.5 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200]"
                title="Xbox"
              >
                <img src={xboxLogo} alt="Xbox" className="h-4 w-auto object-contain" />
              </div>
              <div
                className="flex h-8 items-center border-2 border-black bg-white px-2.5 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200]"
                title="Epic Games"
              >
                <img src={epicLogo} alt="Epic Games" className="h-4 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN BAWAH: ART GALLERY DENGAN RETRO ARCADE MONITOR / CRT PIXEL FRAME   */}
        {/* ========================================================================= */}
        <div
          className="about-anim-gallery relative overflow-hidden border-[3px] border-black bg-white p-4 shadow-[6px_6px_0px_#000000] sm:p-6"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Pixel Corner Accents di 4 Pojok */}
          <div className="absolute -top-1 -left-1 h-3.5 w-3.5 bg-[#bde200] border border-black z-30" />
          <div className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-[#0c71c3] border border-black z-30" />
          <div className="absolute -bottom-1 -left-1 h-3.5 w-3.5 bg-[#0c71c3] border border-black z-30" />
          <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-[#bde200] border border-black z-30" />

          {/* Gallery Header Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <span className="border-2 border-black bg-[#bde200] px-2.5 py-0.5 font-['Press_Start_2P',monospace] text-[9px] text-black shadow-[2px_2px_0px_#000000]">
                ART GALLERY
              </span>
              <span className="font-mono text-black font-bold">//</span>
              <span className="border-2 border-black bg-[#0c71c3] px-2 py-0.5 font-['Press_Start_2P',monospace] text-[8px] text-white shadow-[2px_2px_0px_#000000]">
                {GAME_ART_SLIDES[currentSlide].tag}
              </span>
            </div>

            <div className="flex items-center gap-3 font-['Press_Start_2P',monospace] text-[10px]">
              <span className="text-black">
                SLIDE <span className="bg-[#bde200] px-1.5 py-0.5 border border-black font-bold">0{currentSlide + 1}</span> / 0{totalSlides}
              </span>
              <span className="text-stone-400">|</span>
              <div className="flex items-center gap-1.5 text-[9px]">
                <span className={`h-2.5 w-2.5 border border-black ${isAutoPlaying ? 'bg-[#bde200] animate-pulse' : 'bg-stone-400'}`} />
                <span className="text-stone-700">{isAutoPlaying ? 'AUTO' : 'PAUSED'}</span>
              </div>
            </div>
          </div>

          {/* Main Cinema Screen Frame (dengan subtle retro scanlines) */}
          <div className="relative aspect-[16/9] w-full overflow-hidden border-2 border-black bg-stone-900 shadow-[4px_4px_0px_#000000]">
            {GAME_ART_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover object-center select-none"
                  />
                  {/* Subtle Scanlines & Vignette */}
                  <div className="pixel-scanlines pointer-events-none absolute inset-0 opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                </div>
              )
            })}

            {/* Single Stable Caption Box at bottom (bebas tumpang tindih) */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6">
              <div className="inline-block border border-black bg-[#bde200] px-2.5 py-0.5 font-['Press_Start_2P',monospace] text-[8px] text-black shadow-[2px_2px_0px_#000000]">
                {GAME_ART_SLIDES[currentSlide].tag}
              </div>
              <h3 className="mt-2 font-serif text-lg font-bold text-white sm:text-2xl drop-shadow-md">
                {GAME_ART_SLIDES[currentSlide].title}
              </h3>
              <p className="mt-1 text-xs text-stone-200 sm:text-sm max-w-2xl drop-shadow-sm">
                {GAME_ART_SLIDES[currentSlide].subtitle}
              </p>
            </div>

            {/* Left & Right Arcade Navigation Buttons */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous artwork"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer border-2 border-black bg-[#bde200] px-3 py-2.5 font-['Press_Start_2P',monospace] text-xs text-black shadow-[3px_3px_0px_#000000] transition-all hover:bg-[#0c71c3] hover:text-white active:translate-x-0.5 active:translate-y-[-48%] active:shadow-none"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next artwork"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer border-2 border-black bg-[#bde200] px-3 py-2.5 font-['Press_Start_2P',monospace] text-xs text-black shadow-[3px_3px_0px_#000000] transition-all hover:bg-[#0c71c3] hover:text-white active:translate-x-0.5 active:translate-y-[-48%] active:shadow-none"
            >
              ▶
            </button>
          </div>

          {/* Horizontal Gallery Cards (Row of Pixel Thumbnail Cards) */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
            {GAME_ART_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlide
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`group relative h-20 w-32 flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-all ${
                    isSelected
                      ? 'border-black ring-2 ring-[#0c71c3] shadow-[3px_3px_0px_#000000] scale-102 bg-[#bde200]/20'
                      : 'border-black/50 opacity-70 hover:opacity-100 hover:border-black'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover object-center select-none"
                  />
                  {/* Tag banner at top of thumbnail */}
                  <div
                    className={`absolute top-0 left-0 right-0 px-1 py-0.5 font-['Press_Start_2P',monospace] text-[6px] truncate ${
                      isSelected ? 'bg-[#bde200] text-black font-bold' : 'bg-black/75 text-white'
                    }`}
                  >
                    0{idx + 1} {slide.tag}
                  </div>
                  {/* Active frame highlight */}
                  {isSelected && (
                    <div className="absolute inset-0 border-2 border-[#0c71c3] pointer-events-none" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
