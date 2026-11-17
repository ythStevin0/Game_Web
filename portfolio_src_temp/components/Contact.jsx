export function Contact() {
  return (
    <section id="contact" className="section-container px-layout" style={{ minHeight: '80vh' }}>
      <div className="grid-container" style={{ alignItems: 'center' }}>
        
        <div style={{ gridColumn: '1 / 6' }}>
          <h2 className="heading-hero" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
            LET'S <span className="text-neon-pink">CONNECT</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#aaaaaa', marginBottom: '2rem' }}>
            Currently open for new opportunities. Whether you have a question or just want to say hi, 
            I'll try my best to get back to you!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="mailto:hello@example.com" className="hover-neon-cyan text-mono" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>
              // HELLO@STEVINO.DEV
            </a>
            <span className="text-mono" style={{ color: '#666', fontSize: '0.9rem' }}>
              SYS.OP.COORD: JAKARTA, ID
            </span>
          </div>
        </div>

        <div style={{ gridColumn: '7 / 13' }} className="glass-panel">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--color-neon-cyan)' }}>NAME</label>
              <input 
                type="text" 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid rgba(255,255,255,0.2)', 
                  color: '#fff', 
                  padding: '0.5rem 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  outline: 'none'
                }} 
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--color-neon-cyan)' }}>EMAIL</label>
              <input 
                type="email" 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid rgba(255,255,255,0.2)', 
                  color: '#fff', 
                  padding: '0.5rem 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  outline: 'none'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <label className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--color-neon-cyan)' }}>MESSAGE</label>
              <textarea 
                rows="4"
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid rgba(255,255,255,0.2)', 
                  color: '#fff', 
                  padding: '0.5rem 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'none'
                }} 
              />
            </div>

            <button type="button" className="btn-neon" style={{ alignSelf: 'flex-start' }}>
              TRANSMIT MESSAGE
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
