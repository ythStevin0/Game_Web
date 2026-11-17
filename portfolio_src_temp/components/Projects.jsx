export function Projects() {
  const projects = [
    {
      title: 'Neon Odyssey',
      description: 'A WebGL based interactive experience exploring a cyberpunk city. Built with Three.js and React.',
      tags: ['React', 'Three.js', 'GLSL'],
      image: 'project1'
    },
    {
      title: 'Zenith E-Commerce',
      description: 'Modern headless e-commerce platform with ultra-smooth GSAP page transitions and a minimal UI.',
      tags: ['Next.js', 'GSAP', 'Tailwind'],
      image: 'project2'
    },
    {
      title: 'Holographic Dashboard',
      description: 'Data visualization dashboard for crypto analytics featuring glassmorphism UI and real-time WebSockets.',
      tags: ['React', 'D3.js', 'Node.js'],
      image: 'project3'
    }
  ]

  return (
    <section id="projects" className="section-container px-layout">
      <h2 className="heading-section" style={{ justifyContent: 'flex-end', flexDirection: 'row-reverse' }}>FEATURED WORK</h2>
      
      <div className="grid-container">
        {projects.map((project, idx) => (
          <div key={idx} style={{ gridColumn: 'span 4' }} className="glass-card">
            <div style={{ 
              width: '100%', 
              height: '200px', 
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span className="text-mono" style={{ color: '#444' }}>[ IMG: {project.image} ]</span>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{project.title}</h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {project.description}
            </p>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {project.tags.map(tag => (
                <span key={tag} className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--color-neon-cyan)', background: 'rgba(0, 243, 255, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {tag}
                </span>
              ))}
            </div>
            
            <a href="#" className="hover-neon-cyan text-mono" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              VIEW LIVE <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
