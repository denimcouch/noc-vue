import { ref, computed, onMounted, onUnmounted } from 'vue'
import { darkTheme, lightTheme, useOsTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import { useCanvasThemeStore, type CanvasThemeOption } from '../stores/canvasTheme'

export interface ThemeColors {
  background: string
  surface: string
  primary: string
  secondary: string
  accent: string
  text: string
  textSecondary: string
  border: string
  // P5.js specific colors
  canvas: {
    [key: string]: {
      stroke: string
      background: string
      fill: string
      accent: string
    }
  }
}

const lightColors: ThemeColors = {
  background: '#ffffff',
  surface: '#f9f9f9',
  primary: '#18a058',
  secondary: '#2080f0',
  accent: '#f0a020',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  canvas: {
    primary: {
      stroke: '#333333',
      background: '#fafafa',
      fill: '#18a058',
      accent: '#2080f0',
    },
    secondary: {
      stroke: '#ff6b6b',
      background: '#fff9e6',
      fill: '#4ecdc4',
      accent: '#ffe66d',
    },
    vibrant: {
      stroke: '#e74c3c',
      background: '#fff5f5',
      fill: '#f39c12',
      accent: '#9b59b6',
    },
    monochrome: {
      stroke: '#2c3e50',
      background: '#ecf0f1',
      fill: '#34495e',
      accent: '#7f8c8d',
    },
    nature: {
      stroke: '#27ae60',
      background: '#f8fffe',
      fill: '#2ecc71',
      accent: '#f39c12',
    },
    neon: {
      stroke: '#ff006e',
      background: '#fffbff',
      fill: '#8338ec',
      accent: '#3a86ff',
    },
  },
}

const darkColors: ThemeColors = {
  background: '#101014',
  surface: '#18181c',
  primary: '#63e2b7',
  secondary: '#70c0e8',
  accent: '#f2c97d',
  text: '#ffffff',
  textSecondary: '#c2c2c2',
  border: '#262626',
  canvas: {
    primary: {
      stroke: '#ffffff',
      background: '#333333',
      fill: '#63e2b7',
      accent: '#70c0e8',
    },
    secondary: {
      stroke: '#e74c3c',
      background: '#1a1a2e',
      fill: '#9b59b6',
      accent: '#f39c12',
    },
    vibrant: {
      stroke: '#ff6b6b',
      background: '#2c1810',
      fill: '#feca57',
      accent: '#ff9ff3',
    },
    monochrome: {
      stroke: '#ecf0f1',
      background: '#2c3e50',
      fill: '#bdc3c7',
      accent: '#95a5a6',
    },
    nature: {
      stroke: '#58d68d',
      background: '#1b2631',
      fill: '#52c41a',
      accent: '#faad14',
    },
    neon: {
      stroke: '#ff0080',
      background: '#0d1117',
      fill: '#b400ff',
      accent: '#00d4ff',
    },
  },
}

export function useTheme() {
  const osTheme = useOsTheme()
  const isDark = ref(osTheme.value === 'dark')
  let mediaQuery: MediaQueryList | null = null
  const canvasThemeStore = useCanvasThemeStore()

  // Computed theme values
  const naiveTheme = computed<GlobalTheme | null>(() => (isDark.value ? darkTheme : lightTheme))

  const themeColors = computed<ThemeColors>(() => (isDark.value ? darkColors : lightColors))

  // Get canvas colors for a specific theme
  const getCanvasColors = (themeId: CanvasThemeOption) => {
    return themeColors.value.canvas[themeId]
  }

  // Get current active canvas colors
  const currentCanvasColors = computed(() => {
    return getCanvasColors(canvasThemeStore.currentTheme)
  })

  // Theme detection functions
  const detectSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }

  const updateTheme = (matches: boolean) => {
    isDark.value = matches
  }

  const setupThemeListener = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      isDark.value = mediaQuery.matches

      // Add listener for theme changes
      mediaQuery.addEventListener('change', (e) => updateTheme(e.matches))
    }
  }

  const cleanup = () => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', (e) => updateTheme(e.matches))
    }
  }

  // Manual theme toggle (optional)
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  onMounted(() => {
    setupThemeListener()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    isDark,
    naiveTheme,
    themeColors,
    currentCanvasColors,
    getCanvasColors,
    toggleTheme,
    detectSystemTheme,
    canvasThemeStore,
  }
}
