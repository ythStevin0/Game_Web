/**
 * Renders multiline text to a canvas and samples it to create particle positions.
 * 
 * @returns {Array} - Array of particle data {x, y, size}
 */
export const textToParticles = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  
  // Set an arbitrary large canvas size to get good resolution
  const w = 1200
  const h = 600
  canvas.width = w
  canvas.height = h
  
  // Draw text
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, w, h)
  
  ctx.fillStyle = 'white'
  ctx.font = 'bold 80px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // Draw two lines of text
  ctx.fillText("CREATIVE", w / 2, h / 2 - 40)
  ctx.fillText("DEVELOPER", w / 2, h / 2 + 50)
  
  const imgData = ctx.getImageData(0, 0, w, h).data
  
  // Find all white pixels
  const activePixels = []
  for (let y = 0; y < h; y += 3) {
    for (let x = 0; x < w; x += 3) {
      const i = (y * w + x) * 4
      const r = imgData[i]
      // If pixel is mostly white
      if (r > 128) {
        activePixels.push({ x, y })
      }
    }
  }
  
  const particles = []
  const scale = 0.03
  const offsetX = (w * scale) / 2
  const offsetY = (h * scale) / 2
  
  // Create a particle for every active pixel
  for (let i = 0; i < activePixels.length; i++) {
    const pixel = activePixels[i]
    
    // Add a tiny bit of random jitter
    const jitterX = (Math.random() - 0.5) * 1.5
    const jitterY = (Math.random() - 0.5) * 1.5
    
    particles.push({
      x: ((pixel.x + jitterX) * scale) - offsetX,
      y: -((pixel.y + jitterY) * scale) + offsetY,
      size: 0.12 + Math.random() * 0.08, // Random sizes for text particles
    })
  }
  
  return particles
}
