import { vi } from 'vitest'

class MockP5 {
  mouseX = 0
  mouseY = 0

  private __container: HTMLElement | null = null

  constructor(fn?: (p: unknown) => void, _container?: HTMLElement) {
    // retain reference to avoid unused param lint
    this.__container = _container ?? null
    if (typeof fn === 'function') fn(this)
  }

  createCanvas = vi.fn((_w?: number, _h?: number) => ({ width: _w, height: _h }))
  remove = vi.fn()
  background = vi.fn()
  stroke = vi.fn()
  fill = vi.fn()
  point = vi.fn()

  random = vi.fn((a?: number, b?: number) => {
    if (typeof a === 'number' && typeof b === 'number') return (a + b) / 2
    if (typeof a === 'number') return a / 2
    return 0.5
  })
}

export default MockP5
