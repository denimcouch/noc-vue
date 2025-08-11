<template>
  <div class="chapter-container">
    <h2>Chapter 5: Autonomous Agents</h2>
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
      // class Vehicle {
      //   position: p5.Vector
      //   velocity: p5.Vector
      //   acceleration: p5.Vector
      //   maxSpeed: number
      //   maxForce: number

      //   constructor(x: number, y: number) {
      //     this.position = p.createVector(x, y)
      //     this.velocity = p.createVector(0, 0)
      //     this.acceleration = p.createVector(0, 0)
      //     this.maxSpeed = 3
      //     this.maxForce = 0.03
      //   }

      //   seek(target: p5.Vector) {
      //     const desired = p5.Vector.sub(target, this.position)
      //     desired.normalize()
      //     desired.mult(this.maxSpeed)

      //     const steer = p5.Vector.sub(desired, this.velocity)
      //     steer.limit(this.maxForce)

      //     this.acceleration.add(steer)
      //   }

      //   update() {
      //     this.velocity.add(this.acceleration)
      //     this.velocity.limit(this.maxSpeed)
      //     this.position.add(this.velocity)
      //     this.acceleration.mult(0)
      //   }

      //   display() {
      //     const theta = this.velocity.heading() + p.PI / 2
      //     p.fill(127)
      //     p.stroke(0)
      //     p.push()
      //     p.translate(this.position.x, this.position.y)
      //     p.rotate(theta)
      //     p.beginShape()
      //     p.vertex(0, -12)
      //     p.vertex(-6, 12)
      //     p.vertex(6, 12)
      //     p.endShape(p.CLOSE)
      //     p.pop()
      //   }
      // }

      // let vehicle: Vehicle
      // let target: p5.Vector

      p.setup = () => {
        p.createCanvas(800, 600)
        // vehicle = new Vehicle(p.width / 2, p.height / 2)
        // target = p.createVector(p.mouseX, p.mouseY)
      }

      p.draw = () => {
        p.background(240)

        // Update target to mouse position
        // target.set(p.mouseX, p.mouseY)

        // // Vehicle seeks target
        // vehicle.seek(target)
        // vehicle.update()
        // vehicle.display()

        // // Draw target
        // p.fill(255, 0, 0)
        // p.noStroke()
        // p.circle(target.x, target.y, 20)

        // // Instructions
        // p.fill(0)
        // p.text('Move mouse to control the target', 10, 20)
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
