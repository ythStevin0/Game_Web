export function Skills() {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'] },
    { category: '3D & Motion', items: ['Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion', 'WebGL'] },
    { category: 'Backend & Tools', items: ['Node.js', 'Express', 'Git', 'Figma', 'REST APIs'] }
  ]

  return (
    <section id="skills" className="section-container px-layout">
      <h2 className="heading-section">TECHNICAL ARSENAL</h2>
      
      <div className="grid-container">
        {skills.map((skillGroup, idx) => (
          <div key={idx} style={{ gridColumn: 'span 4' }} className="glass-panel">
            <h3 className="text-mono" style={{ 
              color: 'var(--color-neon-cyan)', 
              fontSize: '0.9rem', 
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '0.5rem'
            }}>
              // {skillGroup.category.toUpperCase()}
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {skillGroup.items.map((item, i) => (
                <div 
                  key={i} 
                  className="glass-card" 
                  style={{ 
                    padding: '0.5rem 1rem', 
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'default'
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
