import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import gameLogo from '../../a_space_unbound/foto/logo/logo3.png'

const SEGMENTS = Array.from({ length: 14 }, (_, index) => index)
const PARTICLES = [
  { left: '8%', top: '18%', size: 3, duration: '4.6s', delay: '-1.2s' },
  { left: '17%', top: '35%', size: 2, duration: '5.8s', delay: '-3.4s' },
  { left: '28%', top: '12%', size: 2, duration: '4.2s', delay: '-2.1s' },
  { left: '39%', top: '26%', size: 3, duration: '6.4s', delay: '-4.8s' },
  { left: '51%', top: '17%', size: 2, duration: '5.1s', delay: '-0.7s' },
  { left: '64%', top: '30%', size: 3, duration: '4.9s', delay: '-2.8s' },
  { left: '78%', top: '14%', size: 2, duration: '6.1s', delay: '-1.9s' },
  { left: '91%', top: '38%', size: 3, duration: '5.5s', delay: '-3.7s' },
  { left: '6%', top: '62%', size: 2, duration: '5.2s', delay: '-2.5s' },
  { left: '23%', top: '73%', size: 3, duration: '6.7s', delay: '-5.1s' },
  { left: '34%', top: '55%', size: 2, duration: '4.4s', delay: '-1.5s' },
  { left: '69%', top: '68%', size: 2, duration: '5.9s', delay: '-3.1s' },
  { left: '84%', top: '79%', size: 3, duration: '4.8s', delay: '-0.9s' },
]

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '00:00'

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

export default function LoadingScreen({ onComplete }) {
  const rootRef = useRef(null)
  const finishingRef = useRef(false)
  const [progress, setProgress] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const finishLoading = useCallback(() => {
    if (finishingRef.current) return
    finishingRef.current = true

    gsap
      .timeline({ defaults: { ease: 'power2.inOut' }, onComplete })
      .to('[data-loader-meta]', { autoAlpha: 0, y: 8, duration: 0.25 })
      .to('[data-loader]', { autoAlpha: 0, y: -20, duration: 0.45 }, '<')
      .to(rootRef.current, { autoAlpha: 0, duration: 0.65 }, '-=0.08')
  }, [onComplete])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-atma-video]', { autoAlpha: 0, scale: 1.06, duration: 1.1 })
        .from('[data-loader]', { autoAlpha: 0, y: 18, duration: 0.8 }, '-=0.55')
        .from('[data-loader-meta]', { autoAlpha: 0, duration: 0.6 }, '-=0.3')
    }, rootRef)

    return () => context.revert()
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(finishLoading, 15000)
    return () => window.clearTimeout(timer)
  }, [finishLoading])

  const handleTimeUpdate = (event) => {
    const { currentTime, duration } = event.currentTarget

    setElapsedTime(currentTime)
    if (duration > 0) {
      setProgress(Math.min(currentTime / duration, 1))
    }
  }

  const filledSegments = Math.ceil(progress * SEGMENTS.length)

  return (
    <main
      ref={rootRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#212121] text-[#f5f1e8]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {PARTICLES.map((particle, index) => (
          <span
            className="loading-particle absolute bg-[#4778b8]"
            key={index}
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              '--particle-duration': particle.duration,
              '--particle-delay': particle.delay,
            }}
          />
        ))}
      </div>

      <header className="absolute left-6 top-6 z-10 sm:left-10 sm:top-8">
        <img
          alt="A Space for the Unbound"
          className="w-28 opacity-90 sm:w-36"
          src={gameLogo}
        />
      </header>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-end px-6 pb-[12vh]">
        <div data-loader className="flex w-full max-w-[31rem] flex-col items-center">
          <div className="mb-2 flex items-end justify-center">
            <video
              aria-hidden="true"
              autoPlay
              className="h-32 w-32 object-contain object-center opacity-95 sm:h-36 sm:w-36"
              data-atma-video
              muted
              onEnded={finishLoading}
              onError={finishLoading}
              onTimeUpdate={handleTimeUpdate}
              playsInline
              preload="auto"
            >
              <source src="/assets/loading/atma_lari.mp4" type="video/mp4" />
            </video>
          </div>

          <div
            aria-label={`${Math.round(progress * 100)} percent loaded`}
            className="flex h-[4.1rem] w-full items-center gap-1 rounded-[1.35rem] border-[4px] border-[#fffaf0] bg-[#fffaf0] px-2 py-1 shadow-[0_8px_0_rgba(24,30,50,0.42)]"
            role="progressbar"
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow={Math.round(progress * 100)}
          >
            {SEGMENTS.map((segment) => (
              <span
                className={`h-full min-w-0 flex-1 border-r border-[#e4e4df] last:border-r-0 ${segment < filledSegments ? 'bg-[#252d43]' : 'bg-[#fffaf0]'}`}
                key={segment}
              />
            ))}
          </div>

          <p className="mt-4 font-serif text-3xl italic leading-none text-[#fffaf0] drop-shadow-[0_3px_0_rgba(20,26,40,0.7)]">
            loading...
          </p>
        </div>

        <div data-loader-meta className="mt-7 flex w-full max-w-[31rem] items-center justify-between text-[10px] tracking-[0.18em] text-[#fffaf0]/75">
            <span>ATMA / RUN CYCLE</span>
          <span>{formatTime(elapsedTime)}</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </main>
  )
}
