/**
 * Loads an image and generates particle positions based on pixel data.
 * 
 * @param {string} src - URL of the image
 * @param {number} numParticles - Target number of particles (determines grid density)
 * @returns {Promise<Object>} - Object containing particles array
 */
export const imageToParticles = (src, numParticles = 14000) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Use a denser grid to keep the photo clear
      const targetGridPoints = 11000
      const ratio = img.height / img.width
      const cols = Math.floor(Math.sqrt(targetGridPoints / ratio))
      const rows = Math.floor(cols * ratio)
      
      canvas.width = cols
      canvas.height = rows
      
      // Draw image scaled down to the grid size
      ctx.drawImage(img, 0, 0, cols, rows)
      
      const imgData = ctx.getImageData(0, 0, cols, rows).data
      const particles = []
      
      // Fix image width in 3D space to 12 units
      const imageWidth = 12
      const scale = imageWidth / cols
      const offsetX = (cols * scale) / 2
      const offsetY = (rows * scale) / 2
      
      // Center coordinates for vignette / circle crop
      const centerX = cols / 2
      const centerY = rows / 2
      // Maximum radius before dropping (creates an oval/circle instead of rectangle frame)
      const maxDistX = cols / 2 * 0.95
      const maxDistY = rows / 2 * 0.95
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const r = imgData[i]
          const g = imgData[i + 1]
          const b = imgData[i + 2]
          const a = imgData[i + 3]
          
          let brightness = 255 // Default to white (bright)
          if (a > 10) {
            brightness = 0.299 * r + 0.587 * g + 0.114 * b
          }
          
          // Remove the "rectangle frame" by dropping pixels outside an oval/circle
          const distX = Math.abs(x - centerX)
          const distY = Math.abs(y - centerY)
          // Oval equation: (x^2 / a^2) + (y^2 / b^2) <= 1
          const distToCenter = Math.pow(distX / maxDistX, 2) + Math.pow(distY / maxDistY, 2)
          
          if (distToCenter > 1) continue; // Drop corners to remove frame
          
          const darkness = 1 - (brightness / 255)
          
          // White background becomes targetSize = 0 (invisible).
          // Dark parts become small dots (up to 0.15).
          const finalSize = darkness > 0.05 ? darkness * 0.15 : 0;
          
          if (finalSize > 0) {
            // Very soft jitter so it feels organic but doesn't destroy the photo clarity
            const jitterX = (Math.random() - 0.5) * 0.25
            const jitterY = (Math.random() - 0.5) * 0.25
            
            particles.push({
              x: ((x + jitterX) * scale) - offsetX,
              y: -((y + jitterY) * scale) + offsetY,
              targetSize: finalSize,
              originalGridX: x,
              originalGridY: y
            })
          }
        }
      }
      
      resolve({ particles, cols, rows })
    }
    
    img.onerror = (err) => {
      console.error('Error loading image for particles:', err)
      reject(err)
    }
    
    img.src = src
  })
}
