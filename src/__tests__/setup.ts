import { vi } from 'vitest'

// Polyfill matchMedia for jsdom
if (!('matchMedia' in window)) {
  // @ts-expect-error jsdom missing API in tests
  window.matchMedia = (query: string) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
  }
}

// Polyfill ResizeObserver for components/composables that might rely on it
if (!('ResizeObserver' in window)) {
  // @ts-expect-error jsdom missing API in tests
  window.ResizeObserver = class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
  }
}

// Some environments need canvas.getContext stubbed; keep it harmless
if (!HTMLCanvasElement.prototype.getContext) {
  // @ts-expect-error jsdom missing API in tests
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    // minimal API surface if ever accessed
    canvas: {},
  }))
}

vi.mock('p5', async () => {
  const mod = await import('./__mocks__/p5')
  return { default: mod.default }
})
