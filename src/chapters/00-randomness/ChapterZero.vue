<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import { Walker } from '../../models/walker'
import { setP5Background } from '../../utils/p5-theme'
import P5Chapter from '../../components/P5Chapter.vue'
interface CanvasColors {
  background: string
  stroke: string
  fill: string
  accent: string
}

const notes = new URL('./notes.md', import.meta.url).href

const sketch = (p: p5, canvasColors: CanvasColors) => {
  let walker: Walker

  p.setup = () => {
    p.createCanvas(800, 600)
    walker = new Walker(p.width / 2, p.height / 2, p, {
      strokeColor: canvasColors.stroke,
      fillColor: canvasColors.fill,
    })
    setP5Background(p, canvasColors.background)
  }

  p.draw = () => {
    walker.step()
    walker.show()
  }
}
</script>
