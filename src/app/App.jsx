import { useState } from 'react'
import ExperienceProgress from '../components/ui/ExperienceProgress'
import IntroScreen from '../features/intro/IntroScreen'
import TownScene from '../scenes/town/TownScene'
import LoadingScreen from '../systems/loading/LoadingScreen'

export default function App() {
  const [stage, setStage] = useState('loading')

  if (stage === 'loading') {
    return <LoadingScreen onComplete={() => setStage('intro')} />
  }

  if (stage === 'intro') {
    return <IntroScreen onEnter={() => setStage('world')} />
  }

  return (
    <>
      <ExperienceProgress currentStage={stage} />
      <TownScene onReturnToIntro={() => setStage('intro')} />
    </>
  )
}
