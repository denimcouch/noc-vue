<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import P5Chapter from '@/components/P5Chapter.vue'
import { setP5Background, setupP5Canvas, type P5ThemeColors } from '@/utils/p5-theme'

const notes = new URL('./notes.md', import.meta.url).href

const sketch = (p: p5, canvasColors: P5ThemeColors) => {
  p.setup = () => {
    setupP5Canvas(p)
  }

  p.draw = () => {
    setP5Background(p, canvasColors.background)
  }
}
</script>
