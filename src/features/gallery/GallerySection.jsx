import { useState, useRef, useEffect } from 'react'

const GALLERY_DATA = [
  {
    id: 1,
    category: 'KEY ARTWORK',
    title: 'A Space for the Unbound',
    description: 'Visual utama permainan yang menampilkan Atmosfer Indonesia era 90-an.',
    image: '/assets/a_space_unbound/foto/thumnail/thumnail1.jpg',
    badgeColor: '#0c71c3'
  },
  {
    id: 2,
    category: 'ENVIRONMENT',
    title: 'Loka Town',
    description: 'Pemandangan kota Loka yang damai namun penuh misteri.',
    image: '/assets/a_space_unbound/foto/thumnail/thumnail2.webp',
    badgeColor: '#ff9800'
  },
  {
    id: 3,
    category: 'CHARACTERS',
    title: 'Warga & Sahabat Kota',
    description: 'Karakter-karakter unik dengan kisah, persahabatan, dan rahasia masing-masing.',
    image: '/assets/a_space_unbound/foto/characters/all_chars.jpg',
    badgeColor: '#0c71c3'
  },
  {
    id: 4,
    category: 'SPRITE ART',
    title: 'Karakter Pixel',
    description: 'Wujud pixel art bergaya retro dari para karakter A Space for the Unbound.',
    image: '/assets/a_space_unbound/foto/characters/all_char_pixel.jpg',
    badgeColor: '#bde200'
  },
  {
    id: 5,
    category: 'ANIMATION',
    title: 'Petualangan Bersama Raya',
    description: 'Eksplorasi magis penuh keajaiban supranatural yang mengikat takdir mereka berdua.',
    image: '/assets/a_space_unbound/foto/gif/a-space-for-the-unbound-raya.gif',
    badgeColor: '#bde200'
  },
  {
    id: 6,
    category: 'PACKSHOT',
    title: 'Versi Fisik',
    description: 'Sampul resmi dari rilis fisik permainan.',
    image: '/assets/a_space_unbound/foto/apaaja/NS-A-Space-fo-the-Unbound-Packshot-2D-187x300-1.png',
    badgeColor: '#e91e63'
  }
]

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isPaused, setIsPaused] = useState(false)
  const activeItem = GALLERY_DATA[activeIndex]

  // Auto slide functionality
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev === GALLERY_DATA.length - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => setActiveIndex(prev => (prev === GALLERY_DATA.length - 1 ? 0 : prev + 1))
  const prevSlide = () => setActiveIndex(prev => (prev === 0 ? GALLERY_DATA.length - 1 : prev - 1))

  return (
    <section 
      id="gallery" 
      className="relative min-h-screen w-full bg-white px-4 py-16 text-black select-none sm:px-8 sm:py-20 lg:px-12 pixel-dots-bg border-t-12 border-black"
    >
      <div className="mx-auto max-w-6xl w-full">
        
        {/* GALERI MAIN CONTAINER */}
        <div className="border-[3px] border-black bg-white shadow-[8px_8px_0px_#000] p-4 md:p-6 mb-6 relative">
          
          {/* HEADER TOP BAR */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b-2 border-black pb-4 gap-4">
            
            {/* Title Badges */}
            <div className="flex items-center gap-3 font-['Press_Start_2P',monospace] text-[10px] md:text-xs">
              <span className="bg-[#bde200] border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">ART GALLERY</span>
              <span className="hidden sm:inline">//</span>
              <span className="bg-[#0c71c3] text-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">{activeItem.category}</span>
            </div>

            {/* Slide Info & Pause */}
            <div className="flex items-center gap-4 font-['Press_Start_2P',monospace] text-[9px] md:text-[10px]">
              <div className="flex items-center gap-2">
                <span>SLIDE</span>
                <span className="bg-[#bde200] border border-black px-2 py-1">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span>/ {String(GALLERY_DATA.length).padStart(2, '0')}</span>
              </div>
              <span>|</span>
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-2 hover:opacity-70 transition-opacity ${isPaused ? 'text-red-500' : 'text-gray-500'}`}
              >
                <div className={`w-2 h-2 ${isPaused ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                {isPaused ? 'PAUSED' : 'PLAYING'}
              </button>
            </div>
          </div>

          {/* IMAGE VIEWPORT */}
          <div className="relative w-full aspect-video md:h-[60vh] border-2 border-black overflow-hidden bg-gray-100 group">
            
            <img 
              src={activeItem.image} 
              alt={activeItem.title} 
              className="absolute inset-0 w-full h-full object-cover"
              style={{ imageRendering: activeItem.category.includes('SPRITE') ? 'pixelated' : 'auto' }}
            />

            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white max-w-2xl pointer-events-none">
              <span 
                className="inline-block border-2 border-black px-2 py-1 font-['Press_Start_2P',monospace] text-[8px] md:text-[10px] text-black shadow-[2px_2px_0px_#000] mb-3"
                style={{ backgroundColor: activeItem.badgeColor }}
              >
                {activeItem.category}
              </span>
              <h2 className="font-serif font-bold text-2xl md:text-4xl mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                {activeItem.title}
              </h2>
              <p className="font-['Outfit',sans-serif] text-sm md:text-base text-gray-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                {activeItem.description}
              </p>
            </div>

            {/* Left/Right Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#bde200] border-2 border-black flex items-center justify-center text-black shadow-[3px_3px_0px_#000] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:-translate-x-1 active:translate-x-0"
            >
              <span className="font-['Press_Start_2P',monospace] text-[10px]">◀</span>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#bde200] border-2 border-black flex items-center justify-center text-black shadow-[3px_3px_0px_#000] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:translate-x-1 active:translate-x-0"
            >
              <span className="font-['Press_Start_2P',monospace] text-[10px]">▶</span>
            </button>

          </div>
        </div>

        {/* THUMBNAILS ROW */}
        <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {GALLERY_DATA.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIndex(index)
                  setIsPaused(true)
                }}
                className={`relative shrink-0 w-24 h-16 md:w-40 md:h-24 border-[3px] border-black snap-start transition-all duration-300 ${
                  isActive ? 'shadow-[4px_4px_0px_#0c71c3] -translate-y-1 border-[#0c71c3]' : 'opacity-60 hover:opacity-100 hover:shadow-[4px_4px_0px_#000]'
                }`}
              >
                {/* Thumb Header */}
                <div className={`absolute top-0 inset-x-0 px-1 py-0.5 border-b-2 border-black font-['Press_Start_2P',monospace] text-[5px] md:text-[6px] truncate ${isActive ? 'bg-[#0c71c3] text-white' : 'bg-gray-200 text-black'}`}>
                  {String(index + 1).padStart(2, '0')} {item.category}
                </div>
                {/* Thumb Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover pt-3"
                  style={{ imageRendering: item.category.includes('SPRITE') ? 'pixelated' : 'auto' }}
                />
              </button>
            )
          })}
        </div>

      </div>
    </section>
  )
}
