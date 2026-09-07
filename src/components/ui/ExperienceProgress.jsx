import { experienceStages } from '../../data/experience'

export default function ExperienceProgress({ currentStage }) {
  return (
    <nav aria-label="Experience progress" className="absolute left-6 top-6 z-10">
      <ol className="flex gap-2">
        {experienceStages.map(({ id, label }) => (
          <li
            className={`border px-3 py-1 text-xs tracking-[0.12em] ${id === currentStage ? 'border-amber-300 text-amber-200' : 'border-stone-700 text-stone-500'}`}
            key={id}
          >
            {label}
          </li>
        ))}
      </ol>
    </nav>
  )
}
