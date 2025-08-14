import { beforeEach, describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCanvasThemeStore, CANVAS_THEMES } from '../../stores/canvasTheme'

describe('canvasTheme store', () => {
  beforeEach(() => {
    // Clean localStorage and fresh pinia each test
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('initializes with default theme when no saved theme', () => {
    const store = useCanvasThemeStore()
    expect(store.currentTheme).toBe('primary')
    expect(store.availableThemes.map((t) => t.id)).toEqual(CANVAS_THEMES.map((t) => t.id))
  })

  it('persists theme changes to localStorage', () => {
    const store = useCanvasThemeStore()
    store.setTheme('neon')
    expect(localStorage.getItem('canvasTheme')).toBe('neon')
    expect(store.currentTheme).toBe('neon')
  })

  it('set/get chapter theme falls back to current theme', () => {
    const store = useCanvasThemeStore()
    store.setTheme('vibrant')
    expect(store.getChapterTheme('unknown')).toBe('vibrant')
    store.setChapterTheme('chapter-1', 'monochrome')
    expect(store.getChapterTheme('chapter-1')).toBe('monochrome')
  })
})
