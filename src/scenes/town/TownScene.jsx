import ActionButton from '../../components/ui/ActionButton'
import { townContent } from '../../data/experience'

const atmaPixel = '/assets/a_space_unbound/foto/characters/Atma_pixel_sprite.webp'

export default function TownScene({ onReturnToIntro }) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-[#111722] via-[#161f2d] to-[#0c1017] px-6 text-stone-100 select-none overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,190,80,0.08),transparent_65%)]" />

      {/* Main Town Content Card */}
      <section className="relative z-10 w-full max-w-2xl border-2 border-amber-300/40 bg-[#121924]/90 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:p-10">
        {/* Pixel corner decors */}
        <div className="absolute -top-1 -left-1 h-2.5 w-2.5 bg-amber-300" />
        <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-amber-300" />
        <div className="absolute -bottom-1 -left-1 h-2.5 w-2.5 bg-amber-300" />
        <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 bg-amber-300" />

        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 bg-amber-400 animate-pulse" />
          <p className="font-['Press_Start_2P',monospace] text-[10px] tracking-widest text-amber-300">
            {townContent.location}
          </p>
        </div>

        <h1 className="mt-4 font-serif text-3xl font-bold tracking-wide text-stone-100 sm:text-4xl">
          Enter the Town
        </h1>

        <p className="mt-4 leading-relaxed text-stone-300 sm:text-base">
          {townContent.description}
        </p>

        <div className="mt-6 flex items-center gap-4 rounded border border-amber-400/20 bg-black/40 p-4">
          <img
            src={atmaPixel}
            alt="Atma"
            className="h-16 w-auto object-contain [image-rendering:pixelated]"
          />
          <div className="text-xs text-stone-400">
            <p className="font-semibold text-amber-200">Atma &amp; Nirmala</p>
            <p className="mt-1">
              "Kota ini menyimpan cerita yang hanya bisa ditemukan oleh mereka yang berjalan perlahan."
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ActionButton
            onClick={onReturnToIntro}
            className="cursor-pointer font-['Press_Start_2P',monospace] text-[11px] shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
          >
            ▲ Return to Intro
          </ActionButton>

          <span className="text-xs text-stone-400">
            atau scroll ke atas untuk kembali
          </span>
        </div>
      </section>
    </main>
  )
}
