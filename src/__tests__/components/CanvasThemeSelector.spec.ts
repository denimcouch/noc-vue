import { describe, it, expect } from 'vitest'
import CanvasThemeSelector from '../../components/CanvasThemeSelector.vue'
import { mountWithPinia } from '../test-utils'
import { useCanvasThemeStore } from '../../stores/canvasTheme'

describe('CanvasThemeSelector', () => {
  it('renders and allows selecting a theme', async () => {
    const wrapper = mountWithPinia(CanvasThemeSelector, {
      global: {
        stubs: {
          // Stub Naive UI components
          'n-dropdown': {
            template: '<div><slot /></div>',
          },
          'n-button': {
            template: '<button><slot /></button>',
          },
          'n-icon': {
            template: '<i><slot /></i>',
          },
          'n-tooltip': {
            template: '<div><slot /><slot name="trigger" /></div>',
          },
        },
      },
    })

    const store = useCanvasThemeStore()
    // Simulate selecting a theme via exposed handler
    ;(wrapper.vm as unknown as { handleThemeSelect: (theme: string) => void }).handleThemeSelect(
      'neon',
    )
    expect(store.currentTheme).toBe('neon')
  })
})
