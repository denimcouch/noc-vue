<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import { Walker } from '@/models/walker'
import { setP5Background, setupP5Canvas } from '@/utils/p5-theme'
import P5Chapter from '@/components/P5Chapter.vue'

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
    setupP5Canvas(p)
    setP5Background(p, canvasColors.background)
    walker = new Walker(p.width / 2, p.height / 2, p, {
      strokeColor: canvasColors.stroke,
      fillColor: canvasColors.fill,
    })
  }

  p.draw = () => {
    walker.step()
    walker.show()
  }
}
</script>
