import ActionButton from '../../components/ui/ActionButton'
import { introContent } from '../../data/experience'

export default function IntroScreen({ onEnter }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#10131a] px-6 text-stone-100">
      <section className="max-w-2xl border-l-2 border-amber-300 pl-6">
        <p className="text-sm tracking-[0.18em] text-amber-300">{introContent.eyebrow}</p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight">{introContent.title}</h1>
        <p className="mt-5 max-w-xl leading-7 text-stone-300">{introContent.description}</p>
        <ActionButton className="mt-8" onClick={onEnter}>
          Enter the town
        </ActionButton>
      </section>
    </main>
  )
}
