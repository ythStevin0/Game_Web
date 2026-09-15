const fs = require('fs')

const filePath = 'c:\\webdev\\src\\features\\experience\\GameDescriptionSection.jsx'
let content = fs.readFileSync(filePath, 'utf8')

// 1. Remove GAME_ART_SLIDES and hooks
const chunk1Start = "// Game art slides\nexport const GAME_ART_SLIDES = ["
const chunk1End = "    setTouchStart(0)\n    setTouchEnd(0)\n  }\n"

const startIdx1 = content.indexOf(chunk1Start)
const endIdx1 = content.indexOf(chunk1End) + chunk1End.length

if (startIdx1 !== -1 && endIdx1 !== -1) {
  content = content.substring(0, startIdx1) + content.substring(endIdx1)
} else {
  console.log("Chunk 1 not found")
}

// 2. Remove EXPLORE GALLERY text
const chunk2Text = `<div className="flex items-center gap-1.5 text-[#0c71c3]">
                    <span className="hidden sm:inline">EXPLORE GALLERY</span>
                    <span className="pixel-blink text-base font-bold text-[#bde200]">▼</span>
                  </div>`
content = content.replace(chunk2Text, "")

// 3. Remove .about-anim-gallery from elements array
const chunk3Text = `        '.about-anim-badges',\n        '.about-anim-gallery',\n      ]`
content = content.replace(chunk3Text, `        '.about-anim-badges',\n      ]`)

// 4. Remove the embedded gallery block
const chunk4Start = "{/* ========================================================================= */}\n        {/* BAGIAN BAWAH: ART GALLERY DENGAN RETRO ARCADE MONITOR / CRT PIXEL FRAME   */}"
const chunk4End = "</div>\n        </div>\n      </div>\n    </section>"
const startIdx4 = content.indexOf(chunk4Start)
const endIdx4 = content.indexOf(chunk4End)

if (startIdx4 !== -1 && endIdx4 !== -1) {
  content = content.substring(0, startIdx4) + content.substring(endIdx4)
} else {
  console.log("Chunk 4 not found")
}

fs.writeFileSync(filePath, content)
console.log("Done carefully")
