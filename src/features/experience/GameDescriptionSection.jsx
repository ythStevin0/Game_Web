import { useCallback, useEffect, useRef, useState } from 'react'

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
    subtitle: 'Menatap langit kota kecil dengan misteri yang perlahan terkuak.',
    tag: 'KEY ARTWORK',
  },
  {
    id: 2,
    image: '/assets/a_space_unbound/foto/thumnail/aspacefortheunbound-1674275821607.jpg',
    title: 'Kota Loka di Sore Hari',
    subtitle: 'Kehangatan jalanan pedesaan Indonesia akhir tahun 90-an.',
    tag: 'ENVIRONMENT',
  },
  {
    id: 3,
    image: '/assets/a_space_unbound/foto/characters/all_chars.jpg',
    title: 'Warga & Sahabat Kota',
    subtitle: 'Karakter-karakter unik dengan kisah dan rahasia masing-masing.',
    tag: 'CHARACTERS',
  },
  {
    id: 4,
    image: '/assets/a_space_unbound/foto/characters/all_char_pixel.jpg',
    title: 'Pixel Art Sprites',
    subtitle: 'Detail animasi piksel klasik yang dibuat dengan penuh ketelitian.',
    tag: 'SPRITE ART',
  },
  {
    id: 5,
    image: '/assets/a_space_unbound/foto/gif/a-space-for-the-unbound-raya.gif',
    title: 'Petualangan Bersama Raya',
    subtitle: 'Eksplorasi magis penuh keajaiban supranatural yang mengikat takdir.',
    tag: 'ANIMATION',
  },
  {
    id: 6,
    image: '/assets/a_space_unbound/foto/characters/marin_pixel.jpg',
    title: 'Marin & Kucing-kucing Kota',
    subtitle: 'Temukan dan elus berbagai kucing lucu yang tersebar di sudut kota.',
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
    <section className="relative min-h-screen w-full bg-gradient-to-b from-[#101721] via-[#121b28] to-[#0a0f16] px-5 py-20 text-stone-100 select-none sm:px-10 lg:px-16">
      {/* Background Subtle Grid & Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(245,190,80,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(56,189,248,0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Top Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-5">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <span className="font-['Press_Start_2P',monospace] text-[10px] tracking-widest text-amber-300 sm:text-xs">
              SECTION // ABOUT THE GAME
            </span>
          </div>

          {onScrollToTop && (
            <button
              type="button"
              onClick={onScrollToTop}
              className="inline-flex cursor-pointer items-center gap-2 border border-amber-300/60 bg-[#121926]/90 px-3 py-1.5 font-['Press_Start_2P',monospace] text-[10px] text-amber-300 shadow-[2px_2px_0px_#000000] transition hover:bg-amber-300 hover:text-[#10141d]"
            >
              <span>▲</span>
              <span>KEMBALI KE HALAMAN AWAL</span>
            </button>
          )}
        </div>

        {/* 2-Column Grid: Kiri Deskripsi, Kanan Art Carousel */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">

          {/* ================================================================= */}
          {/* KOLOM KIRI: Deskripsi Game, Cerita, Fitur, Platform               */}
          {/* ================================================================= */}
          <div className="space-y-6 lg:col-span-5">
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center gap-2 border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-medium tracking-wide text-amber-300">
              <span>✦</span>
              <span>A SPACE FOR THE UNBOUND</span>
            </div>

            {/* Judul Utama */}
            <h2 className="font-serif text-3xl font-bold leading-tight tracking-wide text-stone-100 sm:text-4xl">
              Kisah Masa SMA &amp; Misteri di Kota Kecil Era 90-an
            </h2>

            {/* Narasi Deskripsi */}
            <div className="space-y-3.5 text-sm leading-relaxed text-stone-300 sm:text-base">
              <p>
                <strong className="text-amber-200">A Space for the Unbound</strong> adalah game petualangan naratif bernuansa *slice-of-life* dengan estetika pixel art memukau, berlatar di pedesaan Indonesia pada akhir era 1990-an.
              </p>
              <p>
                Ikuti perjalanan <strong className="text-stone-100">Atma</strong> dan <strong className="text-stone-100">Raya</strong> di akhir masa sekolah menengah mereka. Di balik hari-hari yang tenang, sebuah fenomena misterius dan kekuatan supranatural mengancam keberadaan dunia mereka.
              </p>
              <p className="text-xs text-stone-400 italic">
                "Selami pikiran orang-orang dengan kemampuan Spacedive, temukan rahasia yang tersembunyi, dan hadapi kenyataan yang menyentuh hati."
              </p>
            </div>

            {/* Feature Highlights (Pixel Cards) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="border border-stone-800 bg-[#141b25] p-3 transition hover:border-amber-400/40">
                <div className="font-['Press_Start_2P',monospace] text-[9px] text-amber-300">
                  90s NOSTALGIA
                </div>
                <p className="mt-1 text-[11px] text-stone-400">
                  Suasana warung, musik kaset, dan kota kecil Indonesia.
                </p>
              </div>
              <div className="border border-stone-800 bg-[#141b25] p-3 transition hover:border-amber-400/40">
                <div className="font-['Press_Start_2P',monospace] text-[9px] text-amber-300">
                  SPACEDIVE
                </div>
                <p className="mt-1 text-[11px] text-stone-400">
                  Kekuatan magis menjelajahi ruang batin dan ingatan.
                </p>
              </div>
            </div>

            {/* Platform Availability */}
            <div className="pt-4 border-t border-stone-800/80">
              <span className="font-['Press_Start_2P',monospace] text-[9px] tracking-wider text-stone-400">
                TERSEDIA DI PLATFORM:
              </span>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex h-9 items-center rounded border border-stone-800 bg-stone-900/80 px-2.5 py-1" title="Steam">
                  <img src={steamLogo} alt="Steam" className="h-5 w-auto object-contain opacity-80" />
                </div>
                <div className="flex h-9 items-center rounded border border-stone-800 bg-stone-900/80 px-2.5 py-1" title="Nintendo Switch">
                  <img src={switchLogo} alt="Nintendo Switch" className="h-5 w-auto object-contain opacity-80" />
                </div>
                <div className="flex h-9 items-center rounded border border-stone-800 bg-stone-900/80 px-2.5 py-1" title="PlayStation 5">
                  <img src={ps5Logo} alt="PS5" className="h-5 w-auto object-contain opacity-80" />
                </div>
                <div className="flex h-9 items-center rounded border border-stone-800 bg-stone-900/80 px-2.5 py-1" title="PlayStation 4">
                  <img src={ps4Logo} alt="PS4" className="h-4 w-auto object-contain opacity-80" />
                </div>
                <div className="flex h-9 items-center rounded border border-stone-800 bg-stone-900/80 px-2.5 py-1" title="Xbox">
                  <img src={xboxLogo} alt="Xbox" className="h-5 w-auto object-contain opacity-80" />
                </div>
                <div className="flex h-9 items-center rounded border border-stone-800 bg-stone-900/80 px-2.5 py-1" title="Epic Games">
                  <img src={epicLogo} alt="Epic Games" className="h-5 w-auto object-contain opacity-80" />
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* KOLOM KANAN: Art Game Carousel (Otomatis & Bisa Geser Manual)     */}
          {/* ================================================================= */}
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden border-2 border-amber-400/40 bg-[#0e141c] p-3 shadow-[0_16px_50px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-4"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Corner Pixel Accents */}
              <div className="absolute -top-1 -left-1 h-3 w-3 bg-amber-300" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-amber-300" />
              <div className="absolute -bottom-1 -left-1 h-3 w-3 bg-amber-300" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-amber-300" />

              {/* Carousel Header Bar */}
              <div className="mb-3 flex items-center justify-between border-b border-stone-800 pb-2.5 text-[10px] font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="font-['Press_Start_2P',monospace] text-[9px] text-amber-300">
                    ART GALLERY
                  </span>
                  <span>//</span>
                  <span className="text-amber-200/80">{GAME_ART_SLIDES[currentSlide].tag}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-300 font-bold">{currentSlide + 1}</span>
                  <span>/</span>
                  <span>{totalSlides}</span>
                </div>
              </div>

              {/* Main Image Frame with 16:10 aspect ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                {GAME_ART_SLIDES.map((slide, index) => {
                  const isActive = index === currentSlide
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
                        }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover object-center select-none"
                      />
                      {/* Gradient overlay for text caption */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Caption box at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <span className="inline-block border border-amber-300/40 bg-black/60 px-2 py-0.5 font-['Press_Start_2P',monospace] text-[8px] text-amber-300">
                          {slide.tag}
                        </span>
                        <h3 className="mt-1.5 font-serif text-lg font-bold text-stone-100 sm:text-xl">
                          {slide.title}
                        </h3>
                        <p className="mt-1 text-xs text-stone-300 sm:text-sm">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  )
                })}

                {/* Left/Right Manual Navigation Arrow Buttons */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous artwork"
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer border-2 border-amber-300/60 bg-[#101722]/85 px-3 py-2 font-['Press_Start_2P',monospace] text-xs text-amber-300 shadow-[2px_2px_0px_#000000] transition hover:bg-amber-300 hover:text-[#10141d] active:translate-y-[-48%]"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next artwork"
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer border-2 border-amber-300/60 bg-[#101722]/85 px-3 py-2 font-['Press_Start_2P',monospace] text-xs text-amber-300 shadow-[2px_2px_0px_#000000] transition hover:bg-amber-300 hover:text-[#10141d] active:translate-y-[-48%]"
                >
                  ▶
                </button>
              </div>

              {/* Slider Controls Bar (Dots & Play Status & Thumbnails) */}
              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 pt-2">
                {/* Dots / Segment indicators */}
                <div className="flex items-center gap-1.5">
                  {GAME_ART_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2.5 cursor-pointer transition-all ${idx === currentSlide
                          ? 'w-7 bg-amber-400 shadow-[0_0_6px_#f59e0b]'
                          : 'w-2.5 bg-stone-700 hover:bg-stone-500'
                        }`}
                    />
                  ))}
                </div>

                {/* Auto-Slide Status Indicator */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
                  <span
                    className={`h-2 w-2 rounded-full ${isAutoPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'
                      }`}
                  />
                  <span>{isAutoPlaying ? 'SLIDE OTOMATIS: AKTIF' : 'PAUSED (HOVER)'}</span>
                </div>
              </div>

              {/* Mini Thumbnail Previews (Manual Click to Select) */}
              <div className="mt-3.5 flex gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                {GAME_ART_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`relative h-14 w-20 flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-all ${idx === currentSlide
                        ? 'border-amber-400 opacity-100 scale-105'
                        : 'border-stone-800 opacity-50 hover:opacity-85'
                      }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover object-center select-none"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
