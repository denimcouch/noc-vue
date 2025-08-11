<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import { setP5Background, setupP5Canvas } from '../../utils/p5-theme'
import P5Chapter from '../../components/P5Chapter.vue'
import type { ThemeColors } from '../../composables/useTheme'

const notes = new URL('./notes.md', import.meta.url).href

const sketch = (p: p5, canvasColors: ThemeColors['canvas'][string]) => {
  p.setup = () => {
    setupP5Canvas(p, 800, 600)
  }

  p.draw = () => {
    setP5Background(p, canvasColors.background)
  }
}
</script>
