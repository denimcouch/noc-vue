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
  let position: p5.Vector
  let velocity: p5.Vector
  let acceleration: p5.Vector

  p.setup = () => {
    setupP5Canvas(p, 800, 600)
    position = p.createVector(50, 50)
    velocity = p.createVector(0, 0)
    acceleration = p.createVector(0, 0)
  }

  p.draw = () => {
    setP5Background(p, canvasColors.background)

    // Apply gravity force
    const gravity = p.createVector(0, 0.2)
    acceleration.add(gravity)

    // Wind force when mouse is pressed
    if (p.mouseIsPressed) {
      const wind = p.createVector(0.1, 0)
      acceleration.add(wind)
    }

    // Update physics
    velocity.add(acceleration)
    position.add(velocity)
    acceleration.mult(0) // Reset acceleration

    // Bounce off edges
    if (position.x > p.width) {
      velocity.x *= -0.8
      position.x = p.width
    }
    if (position.x < 0) {
      velocity.x *= -0.8
      position.x = 0
    }
    if (position.y > p.height) {
      velocity.y *= -0.8
      position.y = p.height
    }

    // Draw the ball
    p.fill(canvasColors.fill)
    p.noStroke()
    p.circle(position.x, position.y, 40)

    // Instructions
    p.fill(canvasColors.accent)
    p.text('Click and hold to apply wind force', 10, 20)
  }
}
</script>

<style scoped>
.chapter-container {
  height: 100%;
  overflow: hidden;
}

.canvas-area {
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem; /* Move canvas down by 2rem */
}

.notes-sider {
  height: 100%;
  overflow: hidden;
}

.notes-section {
  padding: 0;
  margin: 0;
  height: 100%;
}

.chapter-header {
  font-size: 0.75rem;
}

.chapter-header h2 {
  margin-bottom: 0;
}

h2 {
  margin-bottom: 30px;
  font-size: 2.5em;
}
</style>
