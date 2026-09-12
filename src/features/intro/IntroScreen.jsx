import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// Assets in public/assets/ (accessed via URL)
const thumbnailAsset = '/assets/a_space_unbound/foto/thumnail/thumnail2.webp'
const logoAsset = '/assets/a_space_unbound/foto/logo/logo3.png'
const atmaPixel = '/assets/a_space_unbound/foto/characters/Atma_pixel_sprite.webp'

// Assets in src/ (imported via bundler)
import nirmalaPixel from '../../a_space_unbound/foto/characters/Nirmala_pixel_transparent.png'
import bubbleFrame from '../../a_space_unbound/environtment/bubble_text.png'
import bubbleTalk from '../../a_space_unbound/environtment/bubble_talk.png'
import bubbleAsking from '../../a_space_unbound/environtment/bubble_asking.png'
import bubblePeriksa from '../../a_space_unbound/environtment/bubble_periksa.png'
import bubbleLarangan from '../../a_space_unbound/environtment/bubble_larangan.png'
import grassForeground from '../../a_space_unbound/environtment/rumput.png'
import { introContent } from '../../data/experience'


const MOVEMENT_KEYS = new Set(['arrowleft', 'arrowright', 'a', 'd'])
const NIRMALA_POSITION = { x: 30, y: 96 }

function DialogBubble({ children, isOpen, label, onToggle, className = '', showPrompt = false, promptImage = null }) {
  if (!isOpen) {
    if (showPrompt && promptImage) {
      return (
        <button
          type="button"
          aria-label={`Buka dialog ${label}`}
          aria-expanded="false"
          className={`pointer-events-auto absolute bottom-[70%] left-1/2 z-20 -translate-x-1/2 transition hover:brightness-110 focus-visible:outline-none ${className}`}
          onClick={onToggle}
        >
          <img 
            src={promptImage} 
            alt="Interaction marker" 
            className="w-auto object-contain [image-rendering:pixelated]" 
            style={{ height: '90px' }}
          />
        </button>
      )
    }
    return null
  }

  return (
    <button
      type="button"
      aria-label={`Tutup dialog ${label}`}
      aria-expanded="true"
      className={`pointer-events-auto absolute bottom-[91%] left-1/2 z-20 h-[6.3rem] w-[min(78vw,27rem)] -translate-x-1/2 border-0 bg-transparent p-0 text-stone-100 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6d35a] sm:h-[7.4rem] sm:w-120 ${className}`}
      onClick={onToggle}
    >
      <img alt="" className="absolute inset-0 h-full w-full object-fill" src={bubbleFrame} />
      <span className="absolute left-[13%] right-[13%] top-[25%] flex h-[48%] items-center justify-center text-center text-sm leading-5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] sm:text-base">
        {children}
      </span>
      <kbd className="absolute bottom-[17%] right-[10%] border border-stone-100/60 bg-[#101925]/60 px-1.5 py-0.5 text-[9px] leading-none text-stone-100/90">
        E
      </kbd>
    </button>
  )
}

function HeroSection({ onStart }) {
  const rootRef = useRef(null)
  const logoRef = useRef(null)
  const buttonRef = useRef(null)
  const whiteFadeRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      // 1. Transisi fade in putih halus dan cepat
      gsap.fromTo(
        whiteFadeRef.current,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }
      )

      // 2. Animasi fade in untuk logo3.png selama 1 detik
      gsap.fromTo(
        logoRef.current,
        { autoAlpha: 0, scale: 0.95, y: 10 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.05 }
      )

      // 3. Tombol pixelated muncul halus setelah logo tampil
      gsap.fromTo(
        buttonRef.current,
        { autoAlpha: 0, y: 14, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, delay: 0.5, ease: 'power2.out' }
      )
    }, rootRef)

    return () => context.revert()
  }, [])

  // Dukungan tombol Spasi atau Enter untuk masuk
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        onStart?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onStart])

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-screen w-full select-none items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Gambar thumnail2.webp */}
      <img
        alt="A Space for the Unbound Artwork"
        className="absolute inset-0 h-full w-full object-cover object-center select-none"
        src={thumbnailAsset}
      />

      {/* Layer Vignette Halus agar Konten Lebih Kontras */}
      <div className="pointer-events-none absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />

      {/* Lapisan Fade In Putih Halus Cepat */}
      <div
        ref={whiteFadeRef}
        className="pointer-events-none absolute inset-0 z-30 bg-white will-change-[opacity]"
      />

      {/* Logo & Tombol Masuk di Tengah Layar */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
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
          onClick={() => onStart?.()}
          className="group relative mt-10 inline-flex cursor-pointer items-center justify-center border-2 border-amber-300 bg-[#141926]/90 px-7 py-3.5 font-['Press_Start_2P',monospace] text-[11px] uppercase tracking-wider text-amber-300 shadow-[4px_4px_0px_#000000] transition-all duration-150 select-none hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-300 hover:text-[#10141d] hover:shadow-[6px_6px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none sm:px-9 sm:py-4 sm:text-xs"
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
  )
}

function InteractiveIntro({ onEnter }) {
  const rootRef = useRef(null)
  const keysRef = useRef(new Set())
  const [isMoving, setIsMoving] = useState(false)
  const [position, setPosition] = useState({ x: 69, y: 96, facing: 1 })
  const [dialogTarget, setDialogTarget] = useState(null)

  const isNearNirmala = Math.abs(position.x - NIRMALA_POSITION.x) < 8 && Math.abs(position.y - NIRMALA_POSITION.y) < 16
  const isNearBoard = Math.abs(position.x - 52) < 5

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase()

      if (key === 'enter') {
        event.preventDefault()
        onEnter()
        return
      }

      if (key === 'e' && !event.repeat) {
        event.preventDefault()
        setDialogTarget((current) => {
          if (isNearBoard) return current === 'board' ? null : 'board'
          if (isNearNirmala) return current === 'nirmala' ? null : 'nirmala'
          return null
        })
        return
      }

      if (!MOVEMENT_KEYS.has(key)) return

      event.preventDefault()
      keysRef.current.add(key)
      setIsMoving(true)
    }

    const handleKeyUp = (event) => {
      keysRef.current.delete(event.key.toLowerCase())
      setIsMoving(keysRef.current.size > 0)
    }

    const clearKeys = () => {
      keysRef.current.clear()
      setIsMoving(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', clearKeys)

    let frameId
    const moveCharacter = () => {
      const keys = keysRef.current
      const left = keys.has('arrowleft') || keys.has('a')
      const right = keys.has('arrowright') || keys.has('d')
      const horizontal = Number(right) - Number(left)

      if (horizontal) {
        setPosition((current) => ({
          x: Math.min(96, Math.max(4, current.x + horizontal * 0.42)),
          y: current.y,
          facing: horizontal === 0 ? current.facing : horizontal,
        }))
      }

      frameId = window.requestAnimationFrame(moveCharacter)
    }

    frameId = window.requestAnimationFrame(moveCharacter)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', clearKeys)
      window.cancelAnimationFrame(frameId)
    }
  }, [isNearNirmala, isNearBoard, onEnter])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

        timeline
          .from('[data-hero-world]', { scale: 1.04, autoAlpha: 0, duration: 1.2 })
          .from('[data-hero-header]', { y: -16, autoAlpha: 0, duration: 0.55 }, '-=0.7')
          .from('[data-hero-bubble]', { autoAlpha: 0, y: 12, duration: 0.6 }, '-=0.25')
          .from('[data-hero-character-motion]', { x: 36, autoAlpha: 0, duration: 0.7 }, '-=0.4')
          .from('[data-hero-rail]', { y: 14, autoAlpha: 0, duration: 0.5 }, '-=0.35')
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-hero-world], [data-hero-header], [data-hero-bubble], [data-hero-character-motion], [data-hero-rail]', {
          clearProps: 'all',
        })
      })

      return () => media.revert()
    }, rootRef)

    return () => context.revert()
  }, [])

  const cameraPosition = `${50 + (position.x - 69) * 0.12}% ${80 + (position.y - 96) * 0.06}%`

  return (
    <div
      ref={rootRef}
      aria-label="Interactive town introduction"
      className="relative h-dvh min-h-0 overflow-hidden bg-[#17212a] text-stone-100"
      tabIndex="-1"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[-3%] bg-cover transition-[background-position] duration-150"
        data-hero-world
        style={{
          backgroundImage: "url('/assets/loading/gerbong.png')",
          backgroundPosition: cameraPosition,
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#101925]/38" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full z-25 [image-rendering:pixelated]"
        style={{
          height: '30vh',
          backgroundImage: `url(${grassForeground})`,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom left',
        }}
      />




      <section className="pointer-events-none absolute inset-0 z-20">
        {isNearBoard && dialogTarget !== 'board' && (
          <div
            className="pointer-events-auto absolute z-30"
            style={{
              left: '51.7%',
              top: '48%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <button
              type="button"
              className="pointer-events-auto border-0 bg-transparent p-0 cursor-pointer transition hover:brightness-110"
              onClick={() => setDialogTarget('board')}
            >
              <img 
                src={bubbleAsking} 
                alt="Periksa papan" 
                className="w-auto object-contain [image-rendering:pixelated] drop-shadow-md" 
                style={{ height: '90px' }}
              />
            </button>
          </div>
        )}
        {dialogTarget === 'board' && (
          <div
            className="pointer-events-auto absolute z-30"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <button
              type="button"
              className="pointer-events-auto relative flex flex-col items-center border-0 bg-transparent p-0 cursor-pointer"
              onClick={() => setDialogTarget(null)}
              style={{ width: '280px', height: '340px' }}
            >
              {/* Label Periksa with bubble_text.png */}
              <div
                className="relative flex items-center justify-center [image-rendering:pixelated]"
                style={{
                  width: '260px',
                  height: '75px',
                  backgroundImage: `url(${bubbleFrame})`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <span className="font-['Press_Start_2P',monospace] text-base text-stone-100 tracking-wide">
                  Periksa
                </span>
              </div>

              {/* Icons wrapping around Atma */}
              {/* Pentagon formation around Atma */}
              {/* Top row: larangan (left) - periksa eye (center, slightly lower) - larangan (right) */}
              <img src={bubbleLarangan} alt="" className="absolute object-contain [image-rendering:pixelated]" style={{ height: '38px', left: '50%', top: '48px', transform: 'translateX(calc(-50% - 48px))' }} />
              <img src={bubblePeriksa} alt="" className="absolute object-contain [image-rendering:pixelated]" style={{ height: '35px', left: '50%', top: '56px', transform: 'translateX(-50%)' }} />
              <img src={bubbleLarangan} alt="" className="absolute object-contain [image-rendering:pixelated]" style={{ height: '38px', left: '50%', top: '48px', transform: 'translateX(calc(-50% + 48px))' }} />

              {/* Bottom row: larangan pair, closer together */}
              <img src={bubbleLarangan} alt="" className="absolute object-contain [image-rendering:pixelated]" style={{ height: '38px', left: '50%', top: '88px', transform: 'translateX(calc(-50% - 32px))' }} />
              <img src={bubbleLarangan} alt="" className="absolute object-contain [image-rendering:pixelated]" style={{ height: '38px', left: '50%', top: '88px', transform: 'translateX(calc(-50% + 32px))' }} />
            </button>
          </div>
        )}
        {isNearNirmala && dialogTarget !== 'nirmala' && (
          <div
            className="pointer-events-none absolute z-15"
            style={{
              left: `${NIRMALA_POSITION.x}%`,
              top: '53%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <img 
              src={bubbleAsking} 
              alt="Interaction marker" 
              className="w-auto object-contain [image-rendering:pixelated] drop-shadow-md" 
              style={{ height: '90px' }}
            />
          </div>
        )}
        <div
          aria-label="Nirmala. Dekati dengan Atma untuk membuka dialog."
          className="pointer-events-none absolute z-10"
          style={{
            left: `${NIRMALA_POSITION.x}%`,
            top: `${NIRMALA_POSITION.y}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="relative hero-npc--idle">
            <DialogBubble
              isOpen={dialogTarget === 'nirmala'}
              label="Nirmala"
              onToggle={() => setDialogTarget((current) => (current === 'nirmala' ? null : 'nirmala'))}
            >
              {introContent.nirmalaGreeting}
            </DialogBubble>
            <img
              alt="Nirmala pixel character"
              className="h-75 w-auto translate-y-[7%] object-contain [image-rendering:pixelated]"
              src={nirmalaPixel}
            />
          </div>
        </div>

        <div
          aria-label="Atma. Use A and D or the left and right arrow keys to move."
          className="pointer-events-none absolute z-20"
          data-hero-character
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className={`relative ${isMoving ? 'hero-character--moving' : 'hero-character--idle'}`} data-hero-character-motion>

            {isMoving ? (
              <img
                alt="Atma running"
                className="h-76 w-auto object-contain [image-rendering:pixelated]"
                src="/assets/loading/atma_lari.webp?v=7"
                style={{ transform: `scaleX(${position.facing})` }}
              />
            ) : (
              <img
                alt="Atma pixel character"
                className="h-76 w-auto object-contain [image-rendering:pixelated]"
                src={atmaPixel}
                style={{ transform: `scaleX(${position.facing})` }}
              />
            )}
          </div>
        </div>
      </section>

    </div>
  )
}

export default function IntroScreen({ onEnter, showHero = false, onHeroStart }) {
  if (showHero) {
    return <HeroSection onStart={onHeroStart} />
  }

  return <InteractiveIntro onEnter={onEnter} />
}
