import { useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 900)
    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <main className="grid min-h-screen place-items-center bg-[#10131a] px-6 text-stone-100">
      <div className="w-full max-w-md">
        <p className="text-sm tracking-[0.18em] text-amber-300">PREPARING THE WORLD</p>
        <div className="mt-4 h-px overflow-hidden bg-stone-700">
          <div className="h-full w-2/3 bg-amber-300" />
        </div>
      </div>
    </main>
  )
}
