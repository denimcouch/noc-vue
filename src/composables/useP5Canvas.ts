import p5 from 'p5'
import { onMounted, onUnmounted, ref, type Ref } from 'vue'

import type { P5ThemeColors } from '@/utils/p5-theme'

/**
 * Creates a p5.js instance and returns it and a set of functions for working with it
 * @param sketch - The p5.js sketch function to run
 * @param container - The ref to the HTML element to attach the canvas to
 * @returns p5Instance: p5 | null, recreateSketch: () => void
 */
export function useP5Canvas(
  sketch: (p: p5, themeColors: P5ThemeColors) => void,
  container?: Ref<HTMLElement | null>,
) {
  const p5Instance = ref<p5 | null>(null)

  const createSketch = () => {
    if (container?.value) {
      p5Instance.value = new p5(sketch, container.value)
    } else {
      p5Instance.value = new p5(sketch)
    }
  }

  const recreateSketch = () => {
    p5Instance.value?.remove()
    p5Instance.value = null
    createSketch()
  }

  onMounted(() => {
    createSketch()
  })

  onUnmounted(() => {
    p5Instance.value?.remove()
    p5Instance.value = null
  })

  return {
    p5Instance,
    recreateSketch,
  }
}
