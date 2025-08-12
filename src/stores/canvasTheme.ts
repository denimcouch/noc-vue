import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const canvasThemeOptions = [
  'primary',
  'secondary',
  'vibrant',
  'monochrome',
  'nature',
  'neon',
] as const

export type CanvasThemeOption = (typeof canvasThemeOptions)[number]

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
  // Initialize with saved theme or default to 'primary'
  const savedTheme = localStorage.getItem('canvasTheme') as CanvasThemeOption | null
  const currentTheme = ref<CanvasThemeOption>(savedTheme ?? 'primary')

  // Load saved chapter themes or initialize empty
  const savedChapterThemes = localStorage.getItem('chapterThemes')
  const chapterThemes = ref<Record<string, CanvasThemeOption>>(
    savedChapterThemes ? JSON.parse(savedChapterThemes) : {},
  )

  const setTheme = (newTheme: CanvasThemeOption) => {
    currentTheme.value = newTheme
    localStorage.setItem('canvasTheme', newTheme)
  }

  const setChapterTheme = (chapterId: string, theme: CanvasThemeOption) => {
    chapterThemes.value[chapterId] = theme
    localStorage.setItem('chapterThemes', JSON.stringify(chapterThemes.value))
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
