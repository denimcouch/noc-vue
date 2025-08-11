<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import { Walker } from '../../models/walker'
import { setP5Background } from '../../utils/p5-theme'
import P5Chapter from '../../components/P5Chapter.vue'
import type { ThemeColors } from '../../composables/useTheme'

const notes = '/src/chapters/00-randomness/notes.md'

const sketch = (p: p5, themeColors: ThemeColors) => {
  let walker: Walker

  p.setup = () => {
    p.createCanvas(800, 600)
    walker = new Walker(p.width / 2, p.height / 2, p, {
      strokeColor: themeColors.canvas.stroke,
    })
    setP5Background(p, themeColors.canvas.background)
  }

  p.draw = () => {
    walker.step()
    walker.show()
  }
}
</script>
