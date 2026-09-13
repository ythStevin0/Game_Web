import { useState } from 'react'
import LoadingScreen from '../systems/loading/LoadingScreen'
import ScrollExperience from '../features/experience/ScrollExperience'
import IntroScreen from '../features/intro/IntroScreen'

export default function App() {
  const [stage, setStage] = useState('loading')

  if (stage === 'loading') {
    return <LoadingScreen onComplete={() => setStage('main')} />
  }

  if (stage === 'intro') {
    return <IntroScreen onBack={() => setStage('main')} />
  }

  return <ScrollExperience onEnterTown={() => setStage('intro')} />
}
