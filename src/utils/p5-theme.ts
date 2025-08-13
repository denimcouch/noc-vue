import type p5 from 'p5'
import type { ThemeColors } from '@/composables/useTheme'
import type { CanvasThemeOption } from '@/stores/canvasTheme'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/canvas'

export interface P5ThemeColors {
  background: string
  stroke: string
  fill: string
  accent: string
}

/**
 * Converts hex color to p5.js color values (0-255)
 */
export function hexToP5Color(hex: string): number[] {
  // Remove # if present
  const cleanHex = hex.replace('#', '')

  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)

  return [r, g, b]
}

export function setupP5Canvas(p: p5, width = CANVAS_WIDTH, height = CANVAS_HEIGHT) {
  if (typeof window !== 'undefined') {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight

    if (innerWidth < width || innerHeight < height) {
      // Calculate scale factors for width and height
      const scaleX = innerWidth / width
      const scaleY = innerHeight / height

      // Use the smaller scale to maintain aspect ratio
      const scale = Math.min(scaleX, scaleY)

      // Calculate new dimensions that maintain aspect ratio
      const scaledWidth = width * scale
      const scaledHeight = height * scale

      p.createCanvas(scaledWidth, scaledHeight)
    } else {
      p.createCanvas(width, height)
    }
  } else {
    p.createCanvas(width, height)
  }
}

/**
 * Applies background color to P5.js canvas
 */
export function setP5Background(p: p5, color: string) {
  const [r, g, b] = hexToP5Color(color)
  p.background(r, g, b)
}

/**
 * Applies stroke color to P5.js canvas
 */
export function setP5Stroke(p: p5, color: string) {
  const [r, g, b] = hexToP5Color(color)
  p.stroke(r, g, b)
}

/**
 * Applies fill color to P5.js canvas
 */
export function setP5Fill(p: p5, color: string) {
  const [r, g, b] = hexToP5Color(color)
  p.fill(r, g, b)
}
