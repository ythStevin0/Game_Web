import ActionButton from '../../components/ui/ActionButton'
import { townContent } from '../../data/experience'

export default function TownScene({ onReturnToIntro }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#1a2024] px-6 text-stone-100">
      <section className="w-full max-w-3xl border border-stone-700 bg-[#12171b] p-8 shadow-2xl">
        <p className="text-sm tracking-[0.18em] text-amber-300">{townContent.location}</p>
        <h1 className="mt-5 text-3xl font-semibold">{townContent.title}</h1>
        <p className="mt-4 max-w-xl leading-7 text-stone-300">{townContent.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ActionButton onClick={onReturnToIntro}>Return to intro</ActionButton>
          <button className="border border-stone-600 px-5 py-3 text-stone-300" type="button">
            Interaction slot
          </button>
        </div>
      </section>
    </main>
  )
}
