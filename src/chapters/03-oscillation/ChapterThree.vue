<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import { setP5Background, setP5Stroke, setP5Fill, setupP5Canvas, type P5ThemeColors } from '@/utils/p5-theme'
import P5Chapter from '@/components/P5Chapter.vue'

const notes = new URL('./notes.md', import.meta.url).href

const sketch = (p: p5, canvasColors: P5ThemeColors) => {
  let angle = 0
  const angularVelocity = 0.05

  p.setup = () => {
    setupP5Canvas(p)
  }

  p.draw = () => {
    setP5Background(p, canvasColors.background)
    const amplitude = 300
    const x = amplitude * p.cos(angle)

    angle += angularVelocity

    setP5Stroke(p, canvasColors.stroke)
    setP5Fill(p, canvasColors.fill)
    p.translate(p.width / 2, p.height / 2)
    p.line(0, 0, x, 0)
    p.ellipse(x, 0, 20, 20)
  }
}
</script>
