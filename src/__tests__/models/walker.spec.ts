import { describe, it, expect, vi } from 'vitest'
import p5 from 'p5'
import { Walker } from '../../models/walker'

// Mock p5 instance
const mockP5 = {
  stroke: vi.fn(),
  point: vi.fn(),
  random: vi.fn(),
  fill: vi.fn(),
}

const mockTheme = {
  strokeColor: '#000000',
  fillColor: '#000000',
}

describe('Walker', () => {
  it('should create a walker with the given position', () => {
    const walker = new Walker(10, 20, mockP5 as unknown as p5, mockTheme)

    expect(walker.x).toBe(10)
    expect(walker.y).toBe(20)
    expect(walker.p).toBe(mockP5)
  })

  it('should create a walker at origin when coordinates are zero', () => {
    const walker = new Walker(0, 0, mockP5 as unknown as p5, mockTheme)

    expect(walker.x).toBe(0)
    expect(walker.y).toBe(0)
  })

  it('should handle negative coordinates', () => {
    const walker = new Walker(-5, -10, mockP5 as unknown as p5, mockTheme)

    expect(walker.x).toBe(-5)
    expect(walker.y).toBe(-10)
  })

  it('should handle floating point coordinates', () => {
    const walker = new Walker(3.14, 2.71, mockP5 as unknown as p5, mockTheme)

    expect(walker.x).toBe(3.14)
    expect(walker.y).toBe(2.71)
  })

  it('should call p5 stroke and point methods when showing', () => {
    const walker = new Walker(10, 20, mockP5 as unknown as p5, mockTheme)

    walker.show()

    expect(mockP5.stroke).toHaveBeenCalledWith(0, 0, 0)
    expect(mockP5.fill).toHaveBeenCalledWith(0, 0, 0)
    expect(mockP5.point).toHaveBeenCalledWith(10, 20)
  })

  it('should move randomly when stepping', () => {
    mockP5.random.mockReturnValue(0.5) // Will give us choice 2 (y++)
    const walker = new Walker(10, 20, mockP5 as unknown as p5, mockTheme)
    const initialY = walker.y

    walker.step()

    expect(walker.y).toBe(initialY + 0.5)
  })
})
