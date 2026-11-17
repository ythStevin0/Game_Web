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

export default function GameDescriptionSection({ onScrollToTop }) {
  return (
    <section className="relative min-h-screen w-full bg-white px-4 py-8 text-black select-none sm:px-8 sm:py-10 lg:px-12 pixel-dots-bg">
      {/* Background Micro Ambient Accents */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/90 via-white/75 to-white/95" />

      <div className="relative mx-auto max-w-6xl">
        {/* ========================================================================= */}
        {/* TOP BAR: SECTION BADGE & RETURN BUTTON                                    */}
        {/* ========================================================================= */}
        <div className="about-anim-header mb-8 flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block h-3.5 w-3.5 bg-[#bde200] border-2 border-black shadow-[2px_2px_0px_#000]" />
            <span className="border-2 border-black bg-[#bde200] px-2 py-1 font-['Press_Start_2P',monospace] text-[8px] tracking-wider text-black shadow-[2px_2px_0px_#000000] sm:px-3 sm:text-[10px] md:text-xs">
              ■ SECTION // 02: ABOUT THE GAME
            </span>
          </div>

          {onScrollToTop && (
            <button
              type="button"
              onClick={onScrollToTop}
              className="inline-flex cursor-pointer items-center gap-1.5 border-2 border-black bg-white px-2.5 py-1 font-['Press_Start_2P',monospace] text-[8px] text-black shadow-[3px_3px_0px_#000000] transition-all hover:bg-[#0c71c3] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:px-3.5 sm:py-1.5 sm:text-[10px] sm:gap-2"
            >
              <span className="text-[#0c71c3] group-hover:text-white">▲</span>
              <span className="hidden sm:inline">KEMBALI KE HALAMAN AWAL</span>
              <span className="sm:hidden">KEMBALI</span>
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
          {/* HYBRID MODERN-RETRO CONTAINER DENGAN SPLIT LAYOUT                         */}
          {/* ======================================================================= */}
          <div className="about-anim-dialogue relative mt-4 w-full max-w-6xl rounded-2xl bg-white/95 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md border border-gray-100 sm:p-10 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            
            {/* Retro Pixel Accents (Subtle Corners) */}
            <div className="absolute -top-1.5 -left-1.5 h-3 w-3 bg-[#bde200] border-2 border-black z-30 opacity-80" />
            <div className="absolute -top-1.5 -right-1.5 h-3 w-3 bg-[#0c71c3] border-2 border-black z-30 opacity-80" />
            <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#0c71c3] border-2 border-black z-30 opacity-80" />
            <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#bde200] border-2 border-black z-30 opacity-80" />

            {/* Window Header Bar (Refined Retro Motif) */}
            <div className="mb-8 flex flex-wrap items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-[#0c71c3]" />
                <span className="font-['Press_Start_2P',monospace] text-[8px] text-gray-500 sm:text-[9px] tracking-widest uppercase">
                  Log Data // Loka Town 199X
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-['Press_Start_2P',monospace] text-[7px] text-gray-300">
                <span className="border border-gray-200 bg-gray-50 px-1 py-0.5 text-gray-400">_</span>
                <span className="border border-gray-200 bg-gray-50 px-1 py-0.5 text-gray-400">□</span>
                <span className="border border-gray-200 bg-red-500/10 px-1 py-0.5 text-red-400">✕</span>
              </div>
            </div>

            {/* Main Content: Split Layout */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              
              {/* Kolom Kiri: Teks & Tipografi (Clean & Spacious) */}
              <div className="flex flex-col space-y-6 text-left lg:col-span-7">
                
                {/* Paragraf 1 (Lead) */}
                <p className="font-sans text-lg font-medium leading-relaxed text-gray-800 sm:text-xl md:text-2xl">
                  <span className="font-bold text-[#0c71c3]">A Space For The Unbound</span> is a slice-of-life adventure game that tells a story about overcoming anxiety, depression, and the relationship between a boy and a girl with supernatural powers.
                </p>

                {/* Paragraf 2 */}
                <p className="font-sans text-base leading-relaxed text-gray-600 sm:text-lg">
                  Follow two high school sweethearts,{' '}
                  <span className="font-semibold text-black relative inline-block">
                    Atma
                    <span className="absolute bottom-1 left-0 h-1.5 w-full bg-[#bde200]/40 -z-10 skew-x-[-15deg]"></span>
                  </span>{' '}
                  and{' '}
                  <span className="font-semibold text-black relative inline-block">
                    Raya
                    <span className="absolute bottom-1 left-0 h-1.5 w-full bg-[#0c71c3]/30 -z-10 skew-x-[-15deg]"></span>
                  </span>
                  , on a journey of self-discovery at the end of their high school years. When a mysteriously supernatural power is suddenly unleashed threatening their existence, they must explore and investigate their town to uncover hidden secrets, face the end of the world, and perhaps learn more about each other.
                </p>

                {/* Paragraf 3 */}
                <p className="font-sans text-sm font-light leading-relaxed italic text-gray-500 sm:text-base border-l-4 border-gray-200 pl-4">
                  Set in a small town inspired by 90s era rural Indonesia, A Space for The Unbound presents an endearing story-driven experience with a vibrant environment waiting to be explored.
                </p>

                {/* Action Prompt */}
                <div className="pt-4 flex items-center gap-3 text-[9px] font-['Press_Start_2P',monospace]">
                  <span className="bg-[#bde200] px-2 py-1 text-black font-bold border border-black/10">EXPLORE STORY</span>
                  <span className="text-gray-400">INDONESIA 199X</span>
                </div>
              </div>

              {/* Kolom Kanan: Karakter (Dinamis & Overlapping) */}
              <div className="relative flex h-64 items-center justify-center lg:col-span-5 lg:h-80">
                {/* Background dekoratif yang membantah bentuk kotak */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="h-40 w-40 rounded-full bg-[#0c71c3]/5 blur-2xl lg:h-64 lg:w-64"></div>
                   <div className="absolute h-32 w-32 translate-x-12 translate-y-12 rounded-full bg-[#bde200]/10 blur-2xl lg:h-48 lg:w-48"></div>
                </div>

                {/* Atma Sprite */}
                <div className="absolute left-[10%] bottom-[10%] z-10 flex flex-col items-center hover:scale-105 transition-transform duration-500">
                  <div className="relative mb-2 h-40 w-auto lg:h-52 drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]">
                    <img
                      src={atmaPixelSprite}
                      alt="Atma"
                      className="pixel-art pixel-idle-bob h-full w-full object-contain filter"
                    />
                  </div>
                  <span className="rounded bg-[#0c71c3] px-2 py-1 font-sans text-xs font-bold tracking-wider text-white shadow-sm">
                    ATMA
                  </span>
                </div>

                {/* Raya Sprite */}
                <div className="absolute right-[10%] bottom-[20%] z-20 flex flex-col items-center hover:scale-105 transition-transform duration-500">
                  <div className="relative mb-2 h-40 w-auto lg:h-52 drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]">
                    <img
                      src={rayaPixelSprite}
                      alt="Raya"
                      className="pixel-art pixel-idle-bob h-full w-full object-contain filter"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </div>
                  <span className="rounded bg-[#bde200] px-2 py-1 font-sans text-xs font-bold tracking-wider text-black shadow-sm">
                    RAYA
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Retro Pixel Badges & Platform Row */}
          <div className="about-anim-badges flex w-full flex-col items-center">
            {/* Retro Pixel Badges: 90s Nostalgia, Spacedive Magic, & Cats */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5">
              {/* Feature 1: 90s Nostalgia */}
              <div className="flex items-center gap-1.5 border-2 border-black bg-white px-2 py-1 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200] sm:px-3 sm:py-1.5 sm:gap-2 sm:shadow-[3px_3px_0px_#000000]">
                <span className="border border-black bg-[#bde200] px-1 py-0.5 font-['Press_Start_2P',monospace] text-[7px] text-black sm:px-1.5 sm:text-[8px]">
                  90s
                </span>
                <span className="font-['Press_Start_2P',monospace] text-[7px] sm:text-[8px] md:text-[9px] text-black tracking-wide">
                  NOSTALGIA INDONESIA
                </span>
              </div>

              {/* Feature 2: Spacedive */}
              <div className="flex items-center gap-1.5 border-2 border-black bg-white px-2 py-1 shadow-[2px_2px_0px_#000000] transition hover:bg-[#0c71c3] hover:text-white group sm:px-3 sm:py-1.5 sm:gap-2 sm:shadow-[3px_3px_0px_#000000]">
                <span className="border border-black bg-[#0c71c3] px-1 py-0.5 font-['Press_Start_2P',monospace] text-[7px] text-white sm:px-1.5 sm:text-[8px]">
                  MAGIS
                </span>
                <span className="font-['Press_Start_2P',monospace] text-[7px] sm:text-[8px] md:text-[9px] text-black tracking-wide group-hover:text-white">
                  SPACEDIVE ABILITY
                </span>
              </div>

              {/* Feature 3: Pet The Cats (Iconic ASFTU Lore) */}
              <div className="flex items-center gap-1.5 border-2 border-black bg-white px-2 py-1 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200] sm:px-3 sm:py-1.5 sm:gap-2 sm:shadow-[3px_3px_0px_#000000]">
                <span className="border border-black bg-[#bde200] px-1 py-0.5 font-['Press_Start_2P',monospace] text-[7px] text-black sm:px-1.5 sm:text-[8px]">
                  🐱
                </span>
                <span className="font-['Press_Start_2P',monospace] text-[7px] sm:text-[8px] md:text-[9px] text-black tracking-wide">
                  PET ALL THE CATS
                </span>
              </div>
            </div>

            {/* Platform Availability Row (Pixel Cartridges) */}
            <div className="mt-5 flex flex-col items-center gap-2 pt-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2.5">
              <span className="font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] text-stone-600">
                AVAILABLE ON:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
                <div
                  className="flex h-7 items-center border-2 border-black bg-white px-2 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200] sm:h-8 sm:px-2.5"
                  title="Steam"
                >
                  <img src={steamLogo} alt="Steam" className="h-3.5 w-auto object-contain sm:h-4" />
                </div>
                <div
                  className="flex h-7 items-center border-2 border-black bg-white px-2 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200] sm:h-8 sm:px-2.5"
                  title="Nintendo Switch"
                >
                  <img src={switchLogo} alt="Nintendo Switch" className="h-3.5 w-auto object-contain sm:h-4" />
                </div>
                <div
                  className="flex h-7 items-center border-2 border-black bg-white px-2 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200] sm:h-8 sm:px-2.5"
                  title="PlayStation 5"
                >
                  <img src={ps5Logo} alt="PS5" className="h-3.5 w-auto object-contain sm:h-4" />
                </div>
                <div
                  className="flex h-7 items-center border-2 border-black bg-white px-2 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200] sm:h-8 sm:px-2.5"
                  title="PlayStation 4"
                >
                  <img src={ps4Logo} alt="PS4" className="h-3 w-auto object-contain sm:h-3.5" />
                </div>
                <div
                  className="flex h-7 items-center border-2 border-black bg-white px-2 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200] sm:h-8 sm:px-2.5"
                  title="Xbox"
                >
                  <img src={xboxLogo} alt="Xbox" className="h-3.5 w-auto object-contain sm:h-4" />
                </div>
                <div
                  className="flex h-7 items-center border-2 border-black bg-white px-2 py-0.5 shadow-[2px_2px_0px_#000000] transition hover:bg-[#bde200] sm:h-8 sm:px-2.5"
                  title="Epic Games"
                >
                  <img src={epicLogo} alt="Epic Games" className="h-3.5 w-auto object-contain sm:h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
