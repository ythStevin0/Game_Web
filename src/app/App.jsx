import { useState } from 'react'
import LoadingScreen from '../systems/loading/LoadingScreen'
import IntroScreen from '../features/intro/IntroScreen'
import ScrollExperience from '../features/experience/ScrollExperience'

export default function App() {
  const [stage, setStage] = useState('hero')

  if (stage === 'hero') {
    return <IntroScreen showHero onHeroStart={() => setStage('loading')} />
  }

  if (stage === 'loading') {
    return <LoadingScreen onComplete={() => setStage('intro')} />
  }

  if (stage === 'intro') {
    return <IntroScreen onEnter={() => setStage('experience')} />
  }

  return <ScrollExperience />
}
