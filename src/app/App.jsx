import { useState } from 'react'
import LoadingScreen from '../systems/loading/LoadingScreen'
import StudioSplash from '../features/intro/StudioSplash'
import ScrollExperience from '../features/experience/ScrollExperience'

export default function App() {
  const [stage, setStage] = useState('loading')

  if (stage === 'loading') {
    return <LoadingScreen onComplete={() => setStage('splash')} />
  }

  if (stage === 'splash') {
    return <StudioSplash onComplete={() => setStage('experience')} />
  }

  return <ScrollExperience />
}
