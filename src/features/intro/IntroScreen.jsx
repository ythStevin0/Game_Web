import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ActionButton from '../../components/ui/ActionButton'
import { introContent } from '../../data/experience'

export default function IntroScreen({ onEnter }) {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-intro-rule]', { scaleY: 0, transformOrigin: 'top center', duration: 0.6 })
        .from('[data-intro-eyebrow]', { autoAlpha: 0, x: -18, duration: 0.45 }, '-=0.2')
        .from('[data-intro-title]', { autoAlpha: 0, y: 22, duration: 0.7 }, '-=0.15')
        .from('[data-intro-description]', { autoAlpha: 0, y: 14, duration: 0.5 }, '-=0.35')
        .from('[data-intro-action]', { autoAlpha: 0, y: 14, duration: 0.45 }, '-=0.2')
    }, rootRef)

    return () => context.revert()
  }, [])

  return (
    <main ref={rootRef} className="grid min-h-screen place-items-center overflow-hidden bg-[#10131a] px-6 text-stone-100">
      <section className="relative max-w-2xl pl-6">
        <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-amber-300" data-intro-rule />
        <p className="text-sm tracking-[0.18em] text-amber-300" data-intro-eyebrow>{introContent.eyebrow}</p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight" data-intro-title>{introContent.title}</h1>
        <p className="mt-5 max-w-xl leading-7 text-stone-300" data-intro-description>{introContent.description}</p>
        <ActionButton className="mt-8" data-intro-action onClick={onEnter}>
          Enter the town
        </ActionButton>
      </section>
    </main>
  )
}
