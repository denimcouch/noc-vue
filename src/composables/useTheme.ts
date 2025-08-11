import { ref, computed, onMounted, onUnmounted } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

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
    background: string
    stroke: string
    fill: string
    accent: string
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
    stroke: '#ffffff',
    background: '#333333',
    fill: '#18a058',
    accent: '#2080f0',
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
    stroke: '#101014',
    background: '#ffffff',
    fill: '#63e2b7',
    accent: '#70c0e8',
  },
}

export function useTheme() {
  const isDark = ref(false)
  let mediaQuery: MediaQueryList | null = null

  // Computed theme values
  const naiveTheme = computed<GlobalTheme | null>(() => (isDark.value ? darkTheme : lightTheme))

  const themeColors = computed<ThemeColors>(() => (isDark.value ? darkColors : lightColors))

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
    toggleTheme,
    detectSystemTheme,
  }
}
