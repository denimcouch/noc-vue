import { describe, it, expect, vi } from 'vitest'
import type p5 from 'p5'
import {
  hexToP5Color,
  setP5Stroke,
  setP5Fill,
  setP5Background,
  setupP5Canvas,
} from '../../utils/p5-theme'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants/canvas'

describe('p5-theme utils', () => {
  it('hexToP5Color converts hex to rgb numbers', () => {
    expect(hexToP5Color('#ffffff')).toEqual([255, 255, 255])
    expect(hexToP5Color('#000000')).toEqual([0, 0, 0])
    expect(hexToP5Color('#18a058')).toEqual([24, 160, 88])
  })

  it('setP5Stroke calls p.stroke with rgb values', () => {
    const p = { stroke: vi.fn() } as unknown as p5
    setP5Stroke(p, '#18a058')
    expect(p.stroke).toHaveBeenCalledWith(24, 160, 88)
  })

  it('setP5Fill calls p.fill with rgb values', () => {
    const p = { fill: vi.fn() } as unknown as p5
    setP5Fill(p, '#18a058')
    expect(p.fill).toHaveBeenCalledWith(24, 160, 88)
  })

  it('setP5Background calls p.background with rgb values', () => {
    const p = { background: vi.fn() } as unknown as p5
    setP5Background(p, '#18a058')
    expect(p.background).toHaveBeenCalledWith(24, 160, 88)
  })

  it('setupP5Canvas respects window size and scales when needed', () => {
    const p = { createCanvas: vi.fn() } as unknown as p5

    const originalInnerWidth = window.innerWidth
    const originalInnerHeight = window.innerHeight

    Object.defineProperty(window, 'innerWidth', { value: CANVAS_WIDTH / 2, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: CANVAS_HEIGHT / 2, configurable: true })

    setupP5Canvas(p)
    expect(p.createCanvas).toHaveBeenCalled()
    const [w, h] = (p.createCanvas as unknown as { mock: { calls: unknown[][] } }).mock.calls[0]
    expect(w).toBeLessThanOrEqual(CANVAS_WIDTH)
    expect(h).toBeLessThanOrEqual(CANVAS_HEIGHT)

    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, configurable: true })
    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
      configurable: true,
    })
  })
})
