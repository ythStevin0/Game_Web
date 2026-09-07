import { useState } from 'react'

const stages = ['loading', 'intro', 'world']

export default function App() {
  const [stage, setStage] = useState('loading')
  const currentStage = stages.indexOf(stage)

  const advance = () => {
    setStage(stages[Math.min(currentStage + 1, stages.length - 1)])
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#10131a] px-6 text-stone-100">
      <section className="w-full max-w-xl border border-stone-700 bg-[#171b24] p-8 shadow-2xl">
        <p className="text-sm tracking-[0.18em] text-amber-300">A SPACE FOR THE UNBOUND</p>
        <h1 className="mt-5 text-3xl font-semibold">Frontend foundation ready</h1>
        <p className="mt-3 leading-7 text-stone-300">
          Stage: <span className="font-medium text-amber-200">{stage}</span>
        </p>
        <button
          className="mt-8 border border-amber-300 px-5 py-3 font-medium text-amber-100 transition hover:bg-amber-300 hover:text-[#10131a] disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={advance}
          disabled={stage === 'world'}
        >
          {stage === 'world' ? 'World ready' : 'Continue'}
        </button>
      </section>
    </main>
  )
}
