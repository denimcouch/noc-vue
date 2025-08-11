<template>
  <div class="chapter-container">
    <h2>Chapter 2: Forces</h2>
    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import p5 from 'p5'

const canvasContainer = ref<HTMLElement>()
let p5Instance: p5 | null = null

onMounted(() => {
  if (canvasContainer.value) {
    const sketch = (p: p5) => {
      // let position: p5.Vector
      // let velocity: p5.Vector
      // let acceleration: p5.Vector

      p.setup = () => {
        p.createCanvas(800, 600)
        // position = p.createVector(50, 50)
        // velocity = p.createVector(0, 0)
        // acceleration = p.createVector(0, 0)
      }

      p.draw = () => {
        p.background(240)

        // Apply gravity force
        // const gravity = p.createVector(0, 0.2)
        // acceleration.add(gravity)

        // Wind force when mouse is pressed
        // if (p.mouseIsPressed) {
        //   const wind = p.createVector(0.1, 0)
        //   acceleration.add(wind)
        // }

        // Update physics
        // velocity.add(acceleration)
        // position.add(velocity)
        // acceleration.mult(0) // Reset acceleration

        // Bounce off edges
        // if (position.x > p.width) {
        //   velocity.x *= -0.8
        //   position.x = p.width
        // }
        // if (position.x < 0) {
        //   velocity.x *= -0.8
        //   position.x = 0
        // }
        // if (position.y > p.height) {
        //   velocity.y *= -0.8
        //   position.y = p.height
        // }

        // Draw the ball
        // p.fill(255, 100, 100)
        // p.noStroke()
        // p.circle(position.x, position.y, 40)

        // Instructions
        // p.fill(0)
        // p.text('Click and hold to apply wind force', 10, 20)
      }
    }

    p5Instance = new p5(sketch, canvasContainer.value)
  }
})

onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove()
    p5Instance = null
  }
})
</script>

<style scoped>
.chapter-container {
  padding: 20px;
  text-align: center;
}

.canvas-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}
</style>
