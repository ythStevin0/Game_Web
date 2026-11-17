import { useEffect, useState } from 'react'
import gsap from 'gsap'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export function useScrambleText(finalText, delay = 0) {
  const [text, setText] = useState('')
  
  useEffect(() => {
    let obj = { value: 0 }
    
    gsap.to(obj, {
      value: 1,
      duration: 1.5,
      delay: delay,
      ease: 'power2.inOut',
      onUpdate: () => {
        const progress = obj.value
        const length = finalText.length
        const currentLength = Math.max(1, Math.floor(length * progress))
        
        let scrambled = ''
        for (let i = 0; i < length; i++) {
          const charProgress = i / length
          // If we are past the reveal threshold for this char, show the real char
          if (progress > charProgress + 0.2) {
            scrambled += finalText[i]
          } else if (progress > charProgress) {
            // Otherwise show a random hacker char
            // Preserve spaces
            if (finalText[i] === ' ') scrambled += ' '
            else scrambled += CHARS[Math.floor(Math.random() * CHARS.length)]
          } else {
            scrambled += ''
          }
        }
        setText(scrambled)
      },
      onComplete: () => {
        setText(finalText)
      }
    })
  }, [finalText, delay])
  
  return text || CHARS[0]
}
