export function About() {
  return (
    <section id="about" className="section-container px-layout">
      <h2 className="heading-section">ABOUT ME</h2>
      
      <div className="grid-container">
        {/* Left Side: Profile Glass Card */}
        <div style={{ gridColumn: '1 / 5' }} className="glass-panel">
          <div style={{ 
            width: '100%', 
            aspectRatio: '1/1', 
            borderRadius: '12px',
            background: 'linear-gradient(45deg, rgba(0,243,255,0.1), rgba(255,0,60,0.1))',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Holographic Border Accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '2px', background: 'var(--color-neon-cyan)', boxShadow: '0 0 10px var(--color-neon-cyan)' }}></div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '2px', background: 'var(--color-neon-pink)', boxShadow: '0 0 10px var(--color-neon-pink)' }}></div>
            
            <span className="text-mono" style={{ color: 'var(--color-text-muted)' }}>[ PROFILE IMAGE ]</span>
          </div>
          
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>STevino</h3>
          <p className="text-mono" style={{ color: 'var(--color-neon-cyan)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>// BASE: INDONESIA</p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="hover-neon-cyan" style={{ color: '#fff', fontSize: '1.2rem' }}><i className="fab fa-github"></i></a>
            <a href="#" className="hover-neon-cyan" style={{ color: '#fff', fontSize: '1.2rem' }}><i className="fab fa-linkedin"></i></a>
            <a href="#" className="hover-neon-cyan" style={{ color: '#fff', fontSize: '1.2rem' }}><i className="fab fa-twitter"></i></a>
          </div>
        </div>
        
        {/* Right Side: Bio */}
        <div style={{ gridColumn: '6 / 13', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ background: 'rgba(15, 15, 20, 0.4)' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Bridging Code and Art</h3>
            <p style={{ fontSize: '1.1rem', color: '#cccccc', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              I am a passionate frontend developer specializing in immersive 3D web experiences. 
              My work focuses on pushing the boundaries of what's possible in the browser by combining 
              modern web frameworks with WebGL and advanced animation techniques.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#cccccc', lineHeight: '1.8' }}>
              Whether it's building a minimalist corporate landing page or a highly interactive Cyberpunk 
              3D portfolio, I strive to create digital experiences that leave a lasting impression.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
