import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useP5Canvas } from '../../composables/useP5Canvas'
import type p5 from 'p5'

describe('useP5Canvas', () => {
  it('creates and recreates p5 instance', () => {
    const container = ref<HTMLElement | null>(document.createElement('div'))
    const sketch = vi.fn()
    const { p5Instance, recreateSketch } = useP5Canvas(
      sketch as unknown as (p: p5, t: unknown) => void,
      container,
    )

    // Initially null before mounted lifecycle; simulate mounted by calling recreateSketch
    expect(p5Instance.value).toBeNull()
    recreateSketch()
    expect(p5Instance.value).not.toBeNull()

    const firstInstance = p5Instance.value
    recreateSketch()
    expect(p5Instance.value).not.toBeNull()
    expect(p5Instance.value).not.toBe(firstInstance)
  })
})
