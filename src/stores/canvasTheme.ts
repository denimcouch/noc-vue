import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type CanvasThemeOption =
  | 'primary'
  | 'secondary'
  | 'vibrant'
  | 'monochrome'
  | 'nature'
  | 'neon'

export interface CanvasThemeInfo {
  id: CanvasThemeOption
  name: string
  description: string
}

export const CANVAS_THEMES: CanvasThemeInfo[] = [
  { id: 'primary', name: 'Primary', description: 'Default theme colors' },
  { id: 'secondary', name: 'Secondary', description: 'Alternative color palette' },
  { id: 'vibrant', name: 'Vibrant', description: 'High contrast, bold colors' },
  { id: 'monochrome', name: 'Monochrome', description: 'Black and white aesthetic' },
  { id: 'nature', name: 'Nature', description: 'Earth tones and greens' },
  { id: 'neon', name: 'Neon', description: 'Bright electric colors' },
]

export const useCanvasThemeStore = defineStore('canvasTheme', () => {
  const currentTheme = ref<CanvasThemeOption>('primary')

  // Track theme preferences per chapter
  const chapterThemes = ref<Record<string, CanvasThemeOption>>({})

  const setTheme = (newTheme: CanvasThemeOption) => {
    currentTheme.value = newTheme
  }

  const setChapterTheme = (chapterId: string, theme: CanvasThemeOption) => {
    chapterThemes.value[chapterId] = theme
  }

  const getChapterTheme = (chapterId: string): CanvasThemeOption => {
    return chapterThemes.value[chapterId] || currentTheme.value
  }

  const currentThemeInfo = computed(
    () => CANVAS_THEMES.find((theme) => theme.id === currentTheme.value) || CANVAS_THEMES[0],
  )

  const availableThemes = computed(() => CANVAS_THEMES)

  return {
    currentTheme,
    chapterThemes,
    currentThemeInfo,
    availableThemes,
    setTheme,
    setChapterTheme,
    getChapterTheme,
  }
})
