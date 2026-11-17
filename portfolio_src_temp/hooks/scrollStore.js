/**
 * Mutable scroll store — read by Three.js useFrame() every frame.
 * Tidak menggunakan React state agar tidak memicu re-render.
 */
export const scrollStore = {
  progress: 0,   // 0 → 1 across the whole page
  scrollY: 0,    // absolute pixel scroll position
}
