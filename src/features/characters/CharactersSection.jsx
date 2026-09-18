import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { CHARACTERS_DATA } from '../../data/charactersData'

export function CharactersSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPixelMode, setIsPixelMode] = useState(false)
  const activeChar = CHARACTERS_DATA[activeIndex]
  
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const infoRef = useRef(null)
  const pixelRef = useRef(null)

  // Animasi saat pergantian karakter
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      // Reset state
      gsap.set([imageRef.current, infoRef.current, pixelRef.current], {
        autoAlpha: 0,
      })
      gsap.set(imageRef.current, { x: 100, scale: 0.95 })
      gsap.set(infoRef.current, { x: -50 })
      gsap.set(pixelRef.current, { y: 20 })

      // Animate In
      tl.to(imageRef.current, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, 0)
      
      tl.to(infoRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.2)
      
      tl.to(pixelRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, 0.4)
      
    }, containerRef)

    return () => ctx.revert()
  }, [activeIndex])

  return (
    <section 
      id="characters"
      ref={containerRef}
      className="relative min-h-screen w-full bg-white px-4 py-8 text-black select-none sm:px-8 sm:py-10 lg:px-12 pixel-dots-bg"
    >
      {/* Background Micro Ambient Accents */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/90 via-white/75 to-white/95" />

      <div className="relative mx-auto max-w-6xl h-full flex flex-col pt-8">
        
        {/* MAIN CONTENT AREA (Full Background, No Card) */}
        <div className="relative flex flex-col md:flex-row flex-1 min-h-[70vh] w-full">
          
          {/* LEFT CONTENT: INFO & TYPOGRAPHY */}
          <div className="relative z-20 w-full md:w-1/2 flex flex-col justify-center py-6 md:pr-12">
            
            {/* TOP BAR: SECTION BADGE (Moved here so its bottom border doesn't cross the character) */}
            <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-4 z-20">
              <div className="flex items-center gap-2.5">
                <span className="inline-block h-3.5 w-3.5 bg-[#ff9800] border-2 border-black shadow-[2px_2px_0px_#000]" />
                <span className="border-2 border-black bg-[#ff9800] px-3 py-1 font-['Press_Start_2P',monospace] text-[10px] tracking-wider text-black shadow-[2px_2px_0px_#000000] sm:text-xs">
                  ■ SECTION // 03: CHARACTER SHOWCASE
                </span>
              </div>
            </div>

            <div ref={infoRef} className="flex flex-col">
              
              {/* Badge Role */}
              <div className="mb-4 inline-flex">
                <span 
                  className="border-2 border-black px-3 py-1 font-['Press_Start_2P',monospace] text-[9px] uppercase tracking-wider text-black shadow-[2px_2px_0px_#000] transition-colors duration-500"
                  style={{ backgroundColor: activeChar.themeColor }}
                >
                  {activeChar.role}
                </span>
              </div>

              {/* Header: Name */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black mb-6 drop-shadow-md" style={{ fontFamily: 'sans-serif' }}>
                {activeChar.name}
              </h2>

              {/* Quote */}
              <div className="relative mb-6">
                <div className="absolute -left-4 top-0 text-3xl font-serif text-black/20">"</div>
                <p className="text-base md:text-lg text-gray-800 font-bold italic leading-relaxed pl-2 border-l-4 border-black">
                  {activeChar.quote}
                </p>
              </div>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-12 max-w-lg">
                {activeChar.description}
              </p>
            </div>

            {/* AVATAR NAVIGATION MENU (Retro Style) */}
            <div className="mt-auto pt-8 flex items-center justify-between sm:justify-start sm:gap-6">
              
              <button 
                className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center text-black shadow-[2px_2px_0px_#000] hover:bg-black hover:text-white transition-colors active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                onClick={() => setActiveIndex(prev => (prev === 0 ? CHARACTERS_DATA.length - 1 : prev - 1))}
              >
                <span className="font-['Press_Start_2P',monospace] text-xs">{'<'}</span>
              </button>

              <div className="flex gap-3">
                {CHARACTERS_DATA.map((char, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={char.id}
                      onClick={() => setActiveIndex(index)}
                      className={`relative w-12 h-12 rounded-none border-2 border-black overflow-hidden transition-all duration-300 ${
                        isActive ? 'scale-110 shadow-[3px_3px_0px_#000] z-10' : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: isActive ? char.themeColor : '#fff' }}
                    >
                      <img 
                        src={isPixelMode ? char.pixelSprite : char.hdImage} 
                        alt={char.name}
                        className={`absolute inset-0 w-full h-full mix-blend-multiply ${isPixelMode ? 'object-contain scale-125' : 'object-cover object-top scale-125'}`}
                        style={isPixelMode ? { imageRendering: 'pixelated' } : undefined}
                      />
                    </button>
                  )
                })}
              </div>

              <button 
                className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center text-black shadow-[2px_2px_0px_#000] hover:bg-black hover:text-white transition-colors active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                onClick={() => setActiveIndex(prev => (prev === CHARACTERS_DATA.length - 1 ? 0 : prev + 1))}
              >
                <span className="font-['Press_Start_2P',monospace] text-xs">{'>'}</span>
              </button>

            </div>
          </div>

          {/* RIGHT CONTENT: HD / PIXEL CHARACTER ARTWORK */}
          <div className="relative z-10 w-full md:w-1/2 h-[50vh] md:h-auto overflow-visible pointer-events-none">
            
            <div ref={imageRef} className="absolute inset-0 flex justify-center items-end px-4 overflow-visible">
              {isPixelMode ? (
                <img 
                  src={activeChar.pixelSprite} 
                  alt={`${activeChar.name} Pixel`}
                  className="h-[85%] md:h-[95%] w-auto object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] mb-10"
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <img 
                  src={activeChar.hdImage} 
                  alt={activeChar.name}
                  className="h-[85%] md:h-[95%] w-auto object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.2)] mb-10"
                />
              )}
            </div>

            {/* 2D / HD TOGGLE BUTTON */}
            <div 
              ref={pixelRef}
              onClick={() => setIsPixelMode(!isPixelMode)}
              className="absolute bottom-6 right-0 md:bottom-0 md:right-8 w-16 h-16 border-4 border-black bg-white flex flex-col items-center justify-center text-black shadow-[4px_4px_0px_#000] cursor-pointer hover:bg-gray-100 hover:-translate-y-1 transition-transform z-30 pointer-events-auto overflow-hidden"
              title={isPixelMode ? "Switch to HD" : "Switch to 2D"}
            >
              {isPixelMode ? (
                <img 
                  src={activeChar.hdImage} 
                  alt={`${activeChar.name} HD`} 
                  className="w-full h-full object-cover object-top mix-blend-multiply scale-125"
                />
              ) : (
                <img 
                  src={activeChar.pixelSprite} 
                  alt={`${activeChar.name} pixel`} 
                  className="w-10 h-10 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              )}
            </div>
            
          </div>
          
        </div>
      </div>

      {/* CSS untuk menyembunyikan scrollbar di mobile menu */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  )
}
