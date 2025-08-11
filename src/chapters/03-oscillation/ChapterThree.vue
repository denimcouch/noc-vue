<template>
  <div class="chapter-container">
    <h2>Chapter 3: Oscillation</h2>
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
      // let angle = 0
      // let angleVel = 0
      // let angleAcc = 0

      p.setup = () => {
        p.createCanvas(800, 600)
      }

      p.draw = () => {
        p.background(240)
        // p.translate(p.width / 2, 0)

        // // Simple pendulum physics
        // const gravity = 0.4
        // const length = 200
        // angleAcc = ((-1 * gravity) / length) * p.sin(angle)
        // angleVel += angleAcc
        // angle += angleVel
        // angleVel *= 0.995 // Add some damping

        // // Draw pendulum
        // p.stroke(0)
        // p.strokeWeight(2)
        // p.line(0, 0, length * p.sin(angle), length * p.cos(angle))

        // // Draw pendulum bob
        // p.fill(100, 100, 255)
        // p.noStroke()
        // const bobX = length * p.sin(angle)
        // const bobY = length * p.cos(angle)
        // p.circle(bobX, bobY, 40)

        // // Draw additional oscillating elements
        // for (let i = 1; i <= 5; i++) {
        //   const x = i * 120 - 300
        //   const y = 200 + 100 * p.sin(angle * i + p.frameCount * 0.02)
        //   p.fill(255, 100, 100, 150)
        //   p.circle(x, y, 20)
        // }
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
