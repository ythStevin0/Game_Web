export function Footer() {
  return (
    <footer className="glass-panel" style={{ 
      position: 'relative', 
      zIndex: 100, 
      borderRadius: '0',
      borderBottom: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '2rem 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '4rem'
    }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
        &copy; {new Date().getFullYear()} STEVINO ADI NUGROHO
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <a href="#" className="hover-neon-cyan text-mono" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.8rem' }}>GITHUB</a>
        <a href="#" className="hover-neon-cyan text-mono" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.8rem' }}>LINKEDIN</a>
        <a href="#" className="hover-neon-cyan text-mono" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.8rem' }}>TWITTER</a>
      </div>
    </footer>
  )
}
