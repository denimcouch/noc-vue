<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import { setP5Background, setupP5Canvas, type P5ThemeColors } from '@/utils/p5-theme'
import P5Chapter from '@/components/P5Chapter.vue'

const notes = new URL('./notes.md', import.meta.url).href

const sketch = (p: p5, canvasColors: P5ThemeColors) => {
  let position: p5.Vector
  let velocity: p5.Vector

  p.setup = () => {
    setupP5Canvas(p)
    position = p.createVector(p.width / 2, p.height / 2)
    velocity = p.createVector(2, 1)
  }

  p.draw = () => {
    setP5Background(p, canvasColors.background)
    // Update position with velocity
    position.add(velocity)

    // Bounce off edges
    if (position.x > p.width || position.x < 0) {
      velocity.x *= -1
    }
    if (position.y > p.height || position.y < 0) {
      velocity.y *= -1
    }

    // Draw the moving circle
    p.fill(canvasColors.fill)
    p.noStroke()
    p.circle(position.x, position.y, 30)
  }
}
</script>
