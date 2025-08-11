<template>
  <div class="chapter-container">
    <h2>Chapter 4: Particle Systems</h2>
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
      // class Particle {
      //   position: p5.Vector
      //   velocity: p5.Vector
      //   acceleration: p5.Vector
      //   lifespan: number

      //   constructor(x: number, y: number) {
      //     this.position = p.createVector(x, y)
      //     this.velocity = p5.Vector.random2D()
      //     this.velocity.mult(p.random(1, 3))
      //     this.acceleration = p.createVector(0, 0.05)
      //     this.lifespan = 255
      //   }

      //   update() {
      //     this.velocity.add(this.acceleration)
      //     this.position.add(this.velocity)
      //     this.lifespan -= 2
      //   }

      //   display() {
      //     p.stroke(0, this.lifespan)
      //     p.strokeWeight(2)
      //     p.fill(255, 100, 150, this.lifespan)
      //     p.circle(this.position.x, this.position.y, 12)
      //   }

      //   isDead() {
      //     return this.lifespan < 0
      //   }
      // }

      // const particles: Particle[] = []

      p.setup = () => {
        p.createCanvas(800, 600)
      }

      p.draw = () => {
        p.background(240, 50)

        // // Add new particles
        // particles.push(new Particle(p.width / 2, p.height / 2))

        // // Update and display particles
        // for (let i = particles.length - 1; i >= 0; i--) {
        //   const particle = particles[i]
        //   particle.update()
        //   particle.display()

        //   if (particle.isDead()) {
        //     particles.splice(i, 1)
        //   }
        // }

        // // Display particle count
        // p.fill(0)
        // p.noStroke()
        // p.text(`Particles: ${particles.length}`, 10, 20)
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
