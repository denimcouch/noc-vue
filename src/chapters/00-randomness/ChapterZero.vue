<template>
  <div class="chapter-container">
    <h2>Chapter 0: Randomness</h2>
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
      p.setup = () => {
        p.createCanvas(800, 600)
        p.background(240)
      }

      p.draw = () => {
        // Random walker example
        // p.stroke(0, 50)
        // p.fill(255, 0, 0, 100)

        // const x = p.random(p.width)
        // const y = p.random(p.height)
        // p.circle(x, y, 10)
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
