import { CHAPTER_DATA } from '../../data/chapterData'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import BUBBLE_ASKING_ASSET from '../../a_space_unbound/environtment/bubble_asking.png'

// Shared pixel paper texture style
const PAPER_TEXTURE = {
  backgroundColor: '#e0d4b8',
  backgroundImage: `
    linear-gradient(transparent 92%, rgba(160,140,110,0.25) 92%, rgba(160,140,110,0.25) 100%),
    linear-gradient(90deg, rgba(100,80,60,0.03) 1px, transparent 1px),
    linear-gradient(rgba(100,80,60,0.03) 1px, transparent 1px),
    linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%),
    linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%)
  `,
  backgroundSize: '100% 20px, 4px 4px, 4px 4px, 8px 8px, 8px 8px',
  backgroundPosition: '0 0, 0 0, 0 0, 0 0, 4px 4px',
  imageRendering: 'pixelated',
}

// Custom scrollbar CSS (injected inline via style tag approach)
// Hide native scrollbar
const HIDE_SCROLL = "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"

export const RedBookSection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSpread, setCurrentSpread] = useState(0)
  
  // Page flipping states
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState('next')
  const [oldSpread, setOldSpread] = useState(0)
  const [flipDegree, setFlipDegree] = useState(0)

  const maxSpread = Math.ceil((CHAPTER_DATA.length - 2) / 2) 

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen && (e.key.toLowerCase() === 'e' || e.key === 'Enter')) {
        setIsOpen(true)
      } else if (isOpen) {
        if (e.key.toLowerCase() === 'q') handlePrevPage()
        if (e.key.toLowerCase() === 'e') handleNextPage()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentSpread, isFlipping])

  const turnToSpread = (newSpread) => {
    if (newSpread === currentSpread || isFlipping) return;
    
    const direction = newSpread > currentSpread ? 'next' : 'prev';
    setOldSpread(currentSpread);
    setFlipDirection(direction);
    setCurrentSpread(newSpread);
    setIsFlipping(true);
    
    setFlipDegree(direction === 'next' ? 0 : -180);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlipDegree(direction === 'next' ? -180 : 0);
      });
    });

    setTimeout(() => {
      setIsFlipping(false);
    }, 800);
  }

  const handleNextPage = () => {
    if (currentSpread < maxSpread) turnToSpread(currentSpread + 1)
  }

  const handlePrevPage = () => {
    if (currentSpread > 0) turnToSpread(currentSpread - 1)
  }

  const jumpToChapter = (chapterId) => {
    if (!isOpen) {
      setIsOpen(true);
      setCurrentSpread(chapterId === 0 || chapterId === 1 ? 0 : Math.floor(chapterId / 2));
      return;
    }
    const targetSpread = chapterId === 0 || chapterId === 1 ? 0 : Math.floor(chapterId / 2);
    turnToSpread(targetSpread);
  }

  const getPageData = (spread, isLeft) => {
    if (spread === 0) return isLeft ? CHAPTER_DATA[0] : CHAPTER_DATA[1];
    return CHAPTER_DATA[spread * 2 + (isLeft ? 0 : 1)];
  };

  const oldLeftPage = getPageData(oldSpread, true);
  const oldRightPage = getPageData(oldSpread, false);
  const newLeftPage = getPageData(currentSpread, true);
  const newRightPage = getPageData(currentSpread, false);

  const baseLeftData = isFlipping && flipDirection === 'next' ? oldLeftPage : newLeftPage;
  const baseRightData = isFlipping && flipDirection === 'prev' ? oldRightPage : newRightPage;

  // --- PIXEL SCROLLBAR (matching game style) ---
  const ScrollableArea = ({ children, className = '' }) => {
    const scrollRef = useRef(null)
    const trackRef = useRef(null)
    const [scrollState, setScrollState] = useState({ canScroll: false, thumbTop: 0, thumbHeight: 0 })

    const checkScroll = useCallback(() => {
      const el = scrollRef.current
      if (!el) return
      const canScroll = el.scrollHeight > el.clientHeight + 4
      if (!canScroll) {
        setScrollState({ canScroll: false, thumbTop: 0, thumbHeight: 0 })
        return
      }
      const trackHeight = trackRef.current?.clientHeight || 1
      const ratio = el.clientHeight / el.scrollHeight
      const thumbH = Math.max(20, ratio * trackHeight)
      const scrollRatio = el.scrollTop / (el.scrollHeight - el.clientHeight)
      const thumbT = scrollRatio * (trackHeight - thumbH)
      setScrollState({ canScroll: true, thumbTop: thumbT, thumbHeight: thumbH })
    }, [])

    useEffect(() => {
      const el = scrollRef.current
      if (!el) return
      checkScroll()
      el.addEventListener('scroll', checkScroll)
      const ro = new ResizeObserver(checkScroll)
      ro.observe(el)
      return () => { el.removeEventListener('scroll', checkScroll); ro.disconnect() }
    }, [checkScroll])

    const scrollByDir = (dir) => {
      scrollRef.current?.scrollBy({ top: dir * 60, behavior: 'smooth' })
    }

    const handleTrackClick = (e) => {
      const track = trackRef.current
      const scroll = scrollRef.current
      if (!track || !scroll) return
      const rect = track.getBoundingClientRect()
      const clickY = e.clientY - rect.top
      const ratio = clickY / rect.height
      scroll.scrollTo({ top: ratio * (scroll.scrollHeight - scroll.clientHeight), behavior: 'smooth' })
    }

    return (
      <div className={`relative flex-1 flex min-h-0 ${className}`}>
        {/* Scrollable content */}
        <div ref={scrollRef} className={`flex-1 overflow-y-auto ${HIDE_SCROLL}`}>
          {children}
        </div>

        {/* Pixel Scrollbar */}
        {scrollState.canScroll && (
          <div className="relative w-4 ml-1 flex flex-col items-center shrink-0 select-none z-40">
            {/* Up Arrow */}
            <button onClick={() => scrollByDir(-1)} className="cursor-pointer group p-0.5">
              <svg width="10" height="8" viewBox="0 0 10 8" style={{ shapeRendering: 'crispEdges' }}>
                <rect x="4" y="0" width="2" height="2" fill="#55697a" />
                <rect x="2" y="2" width="2" height="2" fill="#55697a" />
                <rect x="6" y="2" width="2" height="2" fill="#55697a" />
                <rect x="0" y="4" width="2" height="2" fill="#55697a" />
                <rect x="8" y="4" width="2" height="2" fill="#55697a" />
              </svg>
            </button>

            {/* Track */}
            <div 
              ref={trackRef}
              onClick={handleTrackClick}
              className="relative flex-1 w-0.75 bg-[#b0a080]/40 cursor-pointer my-0.5"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Thumb */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-1.75 bg-[#55697a] hover:bg-[#3d5060] transition-colors"
                style={{ 
                  top: `${scrollState.thumbTop}px`, 
                  height: `${scrollState.thumbHeight}px`,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.2)',
                  imageRendering: 'pixelated',
                }}
              />
            </div>

            {/* Down Arrow */}
            <button onClick={() => scrollByDir(1)} className="cursor-pointer group p-0.5">
              <svg width="10" height="8" viewBox="0 0 10 8" style={{ shapeRendering: 'crispEdges' }}>
                <rect x="0" y="0" width="2" height="2" fill="#55697a" />
                <rect x="8" y="0" width="2" height="2" fill="#55697a" />
                <rect x="2" y="2" width="2" height="2" fill="#55697a" />
                <rect x="6" y="2" width="2" height="2" fill="#55697a" />
                <rect x="4" y="4" width="2" height="2" fill="#55697a" />
              </svg>
            </button>
          </div>
        )}
      </div>
    )
  }

  // --- PIXEL ART COMPONENTS ---

  const PixelCheckmark = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="absolute -top-3 -left-1 scale-150" style={{ shapeRendering: 'crispEdges' }}>
      <path d="M4 12 h3v3H4z" fill="#d32f2f" />
      <path d="M7 15 h3v3H7z" fill="#d32f2f" />
      <path d="M10 12 h3v3h-3z" fill="#d32f2f" />
      <path d="M13 9 h3v3h-3z" fill="#d32f2f" />
      <path d="M16 6 h3v3h-3z" fill="#d32f2f" />
      <path d="M19 3 h3v3h-3z" fill="#d32f2f" />
    </svg>
  )

  const CheckboxItem = ({ checked, label, onClick }) => (
    <div 
      onClick={onClick}
      className="flex items-start gap-4 cursor-pointer group mb-5 hover:bg-black/5 p-1 transition-colors"
    >
      <div className="relative w-5 h-5 shrink-0 mt-0.5" 
           style={{ boxShadow: 'inset 0 0 0 3px #55697a', backgroundColor: '#e0d4b8' }}>
        {checked && <PixelCheckmark />}
      </div>
      <span className="font-['Silkscreen',monospace] text-[#55697a] text-[10px] md:text-xs leading-5 md:leading-5">
        {label}
      </span>
    </div>
  )

  const ChapterContent = ({ data }) => {
    if (!data) return <div className="w-full h-full flex items-center justify-center text-[#55697a] font-['Silkscreen',monospace] text-xs">EMPTY PAGE</div>

    // Chapter 1 (id:2) gets the torn paper overlay like the game's bucketlist
    if (data.id === 2) {
      return (
        <div className="relative w-full h-full flex flex-col">
          <div 
            className="relative w-full h-full flex flex-col bg-[#d8dce0] drop-shadow-[3px_3px_0_rgba(0,0,0,0.12)]"
            style={{
              clipPath: 'polygon(0 0, 98% 0, 100% 2%, 99% 6%, 100% 12%, 98% 18%, 100% 25%, 99% 35%, 100% 45%, 98% 55%, 100% 65%, 99% 75%, 100% 85%, 98% 92%, 100% 100%, 2% 100%, 0 98%, 1% 90%, 0 80%, 1% 70%, 0 60%, 1% 50%, 0 40%, 1% 30%, 0 20%, 1% 10%)',
              imageRendering: 'pixelated',
            }}
          >
            {/* Wrinkle texture */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
                 style={{
                   backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                   backgroundSize: '128px 128px', imageRendering: 'pixelated',
                 }}
            />
            <div className="absolute top-[25%] left-0 right-0 h-px bg-[#a0a8b0] opacity-15 pointer-events-none rotate-[0.2deg]" />
            <div className="absolute top-[55%] left-0 right-0 h-px bg-[#a0a8b0] opacity-15 pointer-events-none rotate-[-0.3deg]" />

            <div className="relative z-10 w-full h-full p-3 md:p-5 flex flex-col">
              {/* Title like ATMA & RAYA'S EPIC BUCKETLIST */}
              <div className="relative z-10 mb-3 mt-0.5">
                <h3 className="font-['Press_Start_2P',monospace] text-[9px] md:text-[11px] text-[#55697a] transform -rotate-1 leading-relaxed">
                  <span className="text-[#c62828] text-[11px] md:text-[13px] inline-block rotate-2 mr-1">EPIC</span>
                  {data.title.toUpperCase()}
                </h3>
                <div className="w-[80%] h-0.5 bg-[#55697a] opacity-20 mt-1 rotate-[-0.5deg]" />
              </div>

              <ScrollableArea className="z-10">
                <p className="font-['Silkscreen',monospace] text-[10px] md:text-xs text-[#37474f] leading-5 md:leading-6 mb-4 text-justify pr-3">
                  {data.synopsis}
                </p>
                {data.polaroid && (
                  <div className={`mt-auto mx-auto bg-[#d8dce0] p-2 pb-5 w-36 ${data.polaroid.rotation} transition-transform hover:scale-105 hover:rotate-0`}
                       style={{ boxShadow: 'inset 0 0 0 3px #55697a, 4px 4px 0 rgba(0,0,0,0.1)' }}>
                    <img src={data.polaroid.image} alt={data.polaroid.caption} className="w-full aspect-square object-cover" style={{ boxShadow: 'inset 0 0 0 3px #55697a', imageRendering: 'pixelated' }} />
                    <p className="text-center font-['Press_Start_2P',monospace] text-[7px] text-[#55697a] mt-2">{data.polaroid.caption.toUpperCase()}</p>
                  </div>
                )}
              </ScrollableArea>
            </div>
          </div>
        </div>
      )
    }

    // Default style for other chapters
    return (
      <div className="relative w-full h-full flex flex-col">
        <div className="relative z-10 text-center mb-4 mt-1">
          <h3 className="font-['Press_Start_2P',monospace] text-[10px] md:text-[12px] text-[#c62828] transform -rotate-1 leading-relaxed inline-block">
            {data.title.toUpperCase()}
          </h3>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-[#d74b48]/15 -rotate-1 -z-10" style={{ imageRendering: 'pixelated' }} />
        </div>

        <ScrollableArea className="z-10">
          <p className="font-['Silkscreen',monospace] text-[10px] md:text-xs text-[#37474f] leading-5 md:leading-6 mb-4 text-justify pr-3">
            {data.synopsis}
          </p>
          {data.polaroid && (
            <div className={`mt-auto mx-auto bg-[#e0d4b8] p-2 pb-5 w-36 ${data.polaroid.rotation} transition-transform hover:scale-105 hover:rotate-0`}
                 style={{ boxShadow: 'inset 0 0 0 3px #55697a, 4px 4px 0 rgba(0,0,0,0.1)' }}>
              <img src={data.polaroid.image} alt={data.polaroid.caption} className="w-full aspect-square object-cover" style={{ boxShadow: 'inset 0 0 0 3px #55697a', imageRendering: 'pixelated' }} />
              <p className="text-center font-['Press_Start_2P',monospace] text-[7px] text-[#55697a] mt-2">{data.polaroid.caption.toUpperCase()}</p>
            </div>
          )}
        </ScrollableArea>
      </div>
    )
  }

  const PageContent = ({ data }) => {
    if (!data) return <div className="w-full h-full flex items-center justify-center text-[#55697a] font-['Silkscreen',monospace] text-xs">EMPTY PAGE</div>

    if (data.type === 'toc') {
      return (
        <div className="flex flex-col h-full justify-start py-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-5 relative bg-transparent" style={{ boxShadow: 'inset 0 0 0 3px #55697a' }}>
              <PixelCheckmark />
            </div>
            <h2 className="font-['Press_Start_2P',monospace] text-[#55697a] text-[11px] md:text-[12px] tracking-widest mt-1">OBJECTIVES</h2>
          </div>
          {/* Pixelated dashed line */}
          <div className="w-full h-0.75 bg-transparent mb-4 opacity-60" style={{ backgroundImage: 'linear-gradient(to right, #55697a 50%, transparent 50%)', backgroundSize: '10px 3px' }} />
          
          {/* List - scrollable with pixel arrows */}
          <ScrollableArea>
            <div className="flex flex-col gap-0 pr-3">
              {CHAPTER_DATA.slice(1).map((chap) => (
                <CheckboxItem 
                  key={chap.id}
                  label={chap.title}
                  checked={currentSpread * 2 === chap.id || currentSpread * 2 + 1 === chap.id}
                  onClick={() => jumpToChapter(chap.id)}
                />
              ))}
            </div>
          </ScrollableArea>
        </div>
      )
    }

    return <ChapterContent data={data} />
  }

  // --- Reusable page surface component ---
  const PageSurface = ({ children, side = 'left', className = '', style: extraStyle = {} }) => (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ 
        ...PAPER_TEXTURE,
        backfaceVisibility: 'hidden',
        boxShadow: 'inset 0 0 0 3px rgba(60,40,20,0.35)',
        ...extraStyle,
      }}
    >
      {/* Grain noise overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-20 mix-blend-multiply"
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
             backgroundSize: '128px 128px',
             imageRendering: 'pixelated',
           }}
      />

      {/* Binding shadow & crease */}
      {side === 'left' ? (
        <>
          <div className="absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-30" 
               style={{ background: 'linear-gradient(to left, rgba(80,60,40,0.25), rgba(80,60,40,0.08) 40%, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#5a4a30] pointer-events-none z-30 opacity-50" />
        </>
      ) : (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-10 pointer-events-none z-30"
               style={{ background: 'linear-gradient(to right, rgba(80,60,40,0.25), rgba(80,60,40,0.08) 40%, transparent)' }} />
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#5a4a30] pointer-events-none z-30 opacity-50" />
        </>
      )}

      {/* Edge wear - top & bottom */}
      <div className="absolute top-0 left-0 right-0 h-0.75 pointer-events-none z-20"
           style={{ background: 'linear-gradient(to bottom, rgba(100,80,50,0.2), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-0.75 pointer-events-none z-20"
           style={{ background: 'linear-gradient(to top, rgba(100,80,50,0.2), transparent)' }} />

      {/* Subtle fold/wrinkle lines */}
      <div className="absolute top-[30%] left-0 right-0 h-px bg-[#b0a080] opacity-10 pointer-events-none z-10 rotate-[0.3deg]" />
      <div className="absolute top-[65%] left-0 right-0 h-px bg-[#b0a080] opacity-10 pointer-events-none z-10 rotate-[-0.2deg]" />

      {children}
    </div>
  )

  return (
    <section className="relative w-full min-h-screen bg-[#6cb4d4] py-12 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      
      {/* Pixelated Grass Background */}
      <div className="absolute inset-0 bg-[url('/assets/a_space_unbound/foto/thumnail/thumnail1.webp')] bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none" style={{ imageRendering: 'pixelated' }} />

      <div className="relative z-10 max-w-3xl w-full mx-auto flex flex-col items-center perspective-[2000px]">
        
        {/* TABS */}
        <div className={`flex gap-1 -mb-1 z-20 transition-all duration-700 w-full px-6 md:px-10 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <button onClick={handlePrevPage} className="px-2.5 py-1.5 bg-[#1d2b38] text-white font-['Press_Start_2P',monospace] text-[8px] hover:bg-[#324a60] transition-colors flex items-center justify-center min-w-8"
                  style={{ boxShadow: 'inset 0 0 0 2px #000' }}>Q</button>
          
          {Array.from({ length: maxSpread + 1 }).map((_, idx) => (
            <button 
              key={idx}
              onClick={() => jumpToChapter(idx * 2)}
              className={`px-2.5 py-1.5 font-['Press_Start_2P',monospace] text-[8px] transition-colors flex items-center justify-center min-w-8 ${currentSpread === idx ? 'bg-[#e0d4b8] text-black pb-2.5' : 'bg-[#e59d57] text-white hover:bg-[#ffb76b] pb-1.5'}`}
              style={{ boxShadow: 'inset 0 0 0 2px #000' }}
            >
              {idx === 0 ? 'TOC' : idx}
            </button>
          ))}

          <button onClick={handleNextPage} className="px-2.5 py-1.5 bg-[#1d2b38] text-white font-['Press_Start_2P',monospace] text-[8px] hover:bg-[#324a60] transition-colors flex items-center justify-center min-w-8"
                  style={{ boxShadow: 'inset 0 0 0 2px #000' }}>E</button>
          
          <button onClick={() => setIsOpen(false)} className="ml-3 px-2.5 py-1.5 bg-[#c62b35] text-white font-['Press_Start_2P',monospace] text-[8px] hover:bg-[#e0313c] transition-colors flex items-center justify-center min-w-8"
                  style={{ boxShadow: 'inset 0 0 0 2px #000' }}>X</button>
        </div>
        
        {/* THE 3D BOOK - Reduced size */}
        <div 
          className="relative w-full max-w-3xl h-95 md:h-120 flex transition-transform duration-1000 ease-in-out filter drop-shadow-[10px_10px_0_rgba(0,0,0,0.3)]"
          style={{
            transformStyle: 'preserve-3d',
            transform: isOpen ? 'translateX(0)' : 'translateX(-25%)',
          }}
        >
          {/* LEFT PAGE WING (Swings open for book cover) */}
          <div 
            className="absolute right-1/2 top-0 bottom-0 w-1/2 origin-right transition-transform duration-1000 ease-in-out z-40"
            style={{
              transformStyle: 'preserve-3d',
              transform: isOpen ? 'rotateY(0deg)' : 'rotateY(180deg)',
            }}
          >
            {/* FRONT FACE (Inside Left Page) */}
            <PageSurface side="left" className="z-10" style={{ transform: 'rotateY(0deg)' }}>
              <div className="w-full h-full p-3 md:p-6 pr-5 md:pr-10 relative flex flex-col z-10">
                <PageContent data={baseLeftData} />
                <div className="mt-auto pt-2 self-start font-['Press_Start_2P',monospace] text-[7px] text-[#8a7a60] opacity-60">
                  {(isFlipping && flipDirection === 'next' ? oldSpread : currentSpread) * 2}
                </div>
              </div>
            </PageSurface>

            {/* BACK FACE (Red Cover) */}
            <div 
              className="absolute inset-0 cursor-pointer group"
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)',
                backgroundColor: '#c94040',
                boxShadow: 'inset -8px 0 0 rgba(0,0,0,0.12), inset 0 0 0 3px #4a1518',
                imageRendering: 'pixelated',
              }}
              onClick={() => setIsOpen(true)}
            >
              {/* Pixel checker texture on red cover */}
              <div className="absolute inset-0 opacity-[0.12] pointer-events-none" 
                   style={{ 
                     backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%)', 
                     backgroundSize: '6px 6px', 
                     backgroundPosition: '0 0, 3px 3px',
                     imageRendering: 'pixelated',
                   }} />
              
              {/* Noise grain on cover */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply"
                   style={{
                     backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                     backgroundSize: '128px 128px',
                     imageRendering: 'pixelated',
                   }}
              />

              {/* Pixelated Spine shading & lines */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#a83030] border-r-[3px] border-[#4a1518] flex flex-col justify-evenly py-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-full h-1 bg-[#4a1518]" />
                ))}
              </div>
              
              {/* Bubble Asking Hint */}
              <div className={`absolute -top-20 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center rotate-4 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <img src={BUBBLE_ASKING_ASSET} alt="Hint" className="w-14 h-14 object-contain filter drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
                <span className="mt-1 font-['Press_Start_2P',monospace] text-[8px] text-white bg-[#5e191b] px-2.5 py-1.5 shadow-[3px_3px_0_rgba(0,0,0,0.5)]">PRESS 'E'</span>
              </div>

              {/* Pixel-Art Label with ATMA & REИ */}
              <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 md:w-60 transform -rotate-3 z-10 drop-shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
                <img 
                  src="/assets/a_space_unbound/foto/ui/tulisan_coverbook.png" 
                  alt="ATMA & REИ" 
                  className="w-full h-auto object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT PAGE (Base) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1/2 z-10">
            <PageSurface side="right">
              <div className="w-full h-full p-3 md:p-6 pl-5 md:pl-10 relative flex flex-col z-10">
                <PageContent data={baseRightData} />
                <div className="mt-auto pt-2 self-end font-['Press_Start_2P',monospace] text-[7px] text-[#8a7a60] opacity-60">
                  {(isFlipping && flipDirection === 'prev' ? oldSpread : currentSpread) * 2 + 1}
                </div>
              </div>
            </PageSurface>
          </div>
          
          {/* THE FLIPPING PAGE */}
          {isOpen && isFlipping && (
            <div 
              className="absolute left-1/2 top-0 bottom-0 w-1/2 origin-left transition-transform duration-800 ease-in-out z-50 pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${flipDegree}deg)`,
              }}
            >
              {/* FRONT FACE */}
              <PageSurface side="right" style={{ transform: 'rotateY(0deg)' }}>
                <div className="w-full h-full p-3 md:p-6 pl-5 md:pl-10 relative flex flex-col z-10">
                  <PageContent data={flipDirection === 'next' ? oldRightPage : newRightPage} />
                  <div className="mt-auto pt-2 self-end font-['Press_Start_2P',monospace] text-[7px] text-[#8a7a60] opacity-60">
                    {flipDirection === 'next' ? oldSpread * 2 + 1 : currentSpread * 2 + 1}
                  </div>
                </div>
              </PageSurface>

              {/* BACK FACE */}
              <PageSurface side="left" className="z-10" style={{ transform: 'rotateY(180deg)' }}>
                <div className="w-full h-full p-3 md:p-6 pr-5 md:pr-10 relative flex flex-col z-10">
                  <PageContent data={flipDirection === 'next' ? newLeftPage : oldLeftPage} />
                  <div className="mt-auto pt-2 self-end font-['Press_Start_2P',monospace] text-[7px] text-[#8a7a60] opacity-60">
                    {flipDirection === 'next' ? currentSpread * 2 : oldSpread * 2}
                  </div>
                </div>
              </PageSurface>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
