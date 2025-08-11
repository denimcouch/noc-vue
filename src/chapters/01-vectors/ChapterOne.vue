<template>
  <div class="chapter-container">
    <h2>Chapter 1: Vectors</h2>
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

      p.setup = () => {
        p.createCanvas(800, 600)
        // position = p.createVector(p.width / 2, p.height / 2)
        // velocity = p.createVector(2, 1)
      }

      p.draw = () => {
        p.background(240)

        // Update position with velocity
        // position.add(velocity)

        // Bounce off edges
        // if (position.x > p.width || position.x < 0) {
        //   velocity.x *= -1
        // }
        // if (position.y > p.height || position.y < 0) {
        //   velocity.y *= -1
        // }

        // Draw the moving circle
        // p.fill(0, 150, 255)
        // p.noStroke()
        // p.circle(position.x, position.y, 30)
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
