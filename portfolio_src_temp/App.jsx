import { useScrollAnimation } from './hooks/useScrollAnimation'
import { CustomCursor } from './components/CustomCursor'
import { SceneCanvas } from './scene/SceneCanvas'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { LoadingScreen } from './components/LoadingScreen'
import './index.css'

function App() {
  // Initialize Lenis smooth scroll and GSAP scroll triggers
  useScrollAnimation()

  return (
    <>
      {/* Loading Screen Overlay */}
      <LoadingScreen />

      {/* 3D Scene fixed in the background */}
      <SceneCanvas />
      
      {/* Swiss Elements */}
      <CustomCursor />

      {/* HTML Overlay Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        
        <main>
          <Hero />
          
          {/* A spacer to allow the scroll morphing to happen visually before content overlaps it */}
          <div style={{ height: '30vh', pointerEvents: 'none' }}></div>
          
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default App
