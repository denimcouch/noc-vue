<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import { setP5Background, setP5Stroke, setP5Fill } from '../../utils/p5-theme'
import P5Chapter from '../../components/P5Chapter.vue'
import type { ThemeColors } from '../../composables/useTheme'

const notes = '/src/chapters/03-oscillation/notes.md'

const sketch = (p: p5, themeColors: ThemeColors) => {
  let angle = 0
  const angularVelocity = 0.05

  p.setup = () => {
    p.createCanvas(800, 600)
  }

  p.draw = () => {
    setP5Background(p, themeColors.canvas.background)
    const amplitude = 300
    const x = amplitude * p.cos(angle)

    angle += angularVelocity

    setP5Stroke(p, themeColors.canvas.stroke)
    setP5Fill(p, themeColors.canvas.fill)
    p.translate(p.width / 2, p.height / 2)
    p.line(0, 0, x, 0)
    p.ellipse(x, 0, 20, 20)
  }
}
</script>
