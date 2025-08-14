import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach } from 'vitest'
import { config, shallowMount, mount } from '@vue/test-utils'

// Ensure a fresh Pinia for each test
beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(() => {
  // Reset Vue Test Utils global stubs/mocks between tests
  config.global.stubs = {}
  config.global.mocks = {}
})

export function mountWithPinia(
  component: Parameters<typeof mount>[0],
  options: Parameters<typeof mount>[1] = {},
): ReturnType<typeof mount> {
  return mount(component, {
    ...options,
    global: {
      ...(options.global || {}),
      plugins: [...(options.global?.plugins || []), createPinia()],
    },
  })
}

export function shallowMountWithPinia(
  component: Parameters<typeof shallowMount>[0],
  options: Parameters<typeof shallowMount>[1] = {},
): ReturnType<typeof shallowMount> {
  return shallowMount(component, {
    ...options,
    global: {
      ...(options.global || {}),
      plugins: [...(options.global?.plugins || []), createPinia()],
    },
  })
}
