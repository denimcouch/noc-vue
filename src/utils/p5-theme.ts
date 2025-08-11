import type p5 from 'p5'
import type { ThemeColors } from '../composables/useTheme'

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

/**
 * Sets up theme colors for P5.js sketch
 */
export function setupP5Theme(p: p5, themeColors: ThemeColors): P5ThemeColors {
  const p5Colors = {
    background: themeColors.canvas.background,
    stroke: themeColors.canvas.stroke,
    fill: themeColors.canvas.fill,
    accent: themeColors.canvas.accent,
  }

  return p5Colors
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
