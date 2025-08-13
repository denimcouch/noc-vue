<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import { Walker, walkerBiases } from '@/models/walker'
import { setP5Background, setupP5Canvas, type P5ThemeColors } from '@/utils/p5-theme'
import P5Chapter from '@/components/P5Chapter.vue'

const notes = new URL('./notes.md', import.meta.url).href

const sketch = (p: p5, canvasColors: P5ThemeColors) => {
  const walkers: Walker[] = []
  const maxWalkers = 20
  const minWalkers = 2

  p.setup = () => {
    setupP5Canvas(p)
    setP5Background(p, canvasColors.background)
    walkers.push(
      new Walker(p.width / 2, p.height / 2, p, 'random', {
        strokeColor: canvasColors.stroke,
        fillColor: canvasColors.fill,
      }),
      new Walker(p.random(p.width), p.random(p.height), p, 'towardsMouse', {
        strokeColor: canvasColors.stroke,
        fillColor: canvasColors.fill,
      }),
    )
  }

  p.draw = () => {
    const random = p.random(1)

    if (random < 0.1 && walkers.length < maxWalkers) {
      const bias = walkerBiases[Math.floor(p.random(walkerBiases.length))]
      walkers.push(
        new Walker(p.random(p.width), p.random(p.height), p, bias, {
          strokeColor: canvasColors.stroke,
          fillColor: canvasColors.fill,
        }),
      )
    } else if (random < 0.2 && walkers.length > minWalkers) {
      walkers.pop()
    }

    walkers.forEach((walker) => {
      walker.step()
      walker.show()
    })
  }
}
</script>
