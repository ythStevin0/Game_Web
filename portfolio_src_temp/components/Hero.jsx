export function Hero() {
  return (
    <section 
      id="hero" 
      className="section-container"
      style={{ 
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '20vh'
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <span className="text-mono text-neon-cyan" style={{ fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Welcome to the Neo-Kyoto Protocol
        </span>
      </div>
      
      <h1 className="heading-hero">
        STEVINO ADI NUGROHO
      </h1>
      
      <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: '400', color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginBottom: '3rem' }}>
        CREATIVE DEVELOPER // 3D WEB ARTIST
      </h2>
      
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <a href="#projects" className="btn-neon">VIEW PROJECTS</a>
        <a href="#contact" className="btn-neon" style={{ background: 'rgba(255,255,255,0.05)' }}>CONTACT ME</a>
      </div>
    </section>
  )
}
