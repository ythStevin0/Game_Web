import { useEffect, useRef } from 'react'

export function Navbar() {
  const navRef = useRef(null)

  return (
    <nav ref={navRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      padding: '1rem 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }} className="glass-panel" style={{
      borderRadius: '0', 
      borderTop: 'none', 
      borderLeft: 'none', 
      borderRight: 'none',
      position: 'fixed',
      top: 0, left: 0, width: '100%', zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 5%',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-neon-cyan)', boxShadow: '0 0 10px var(--color-neon-cyan)' }}></div>
        <div style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.05em' }}>
          STevino<span style={{ color: 'var(--color-neon-cyan)' }}>.</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2.5rem' }}>
        {['About', 'Projects', 'Skills', 'Contact'].map(item => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="hover-neon-cyan"
            style={{ 
              color: '#ccc', 
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}
