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

/**
 * Sets up theme colors for P5.js sketch
 */
export function setupP5Theme(
  themeColors: ThemeColors,
  canvasTheme: CanvasThemeOption,
): P5ThemeColors {
  const p5Colors = {
    background: themeColors.canvas[canvasTheme].background,
    stroke: themeColors.canvas[canvasTheme].stroke,
    fill: themeColors.canvas[canvasTheme].fill,
    accent: themeColors.canvas[canvasTheme].accent,
  }

  return p5Colors
}

export function setupP5Canvas(p: p5, width = CANVAS_WIDTH, height = CANVAS_HEIGHT) {
  p.createCanvas(width, height)
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
