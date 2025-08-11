<template>
  <p5-chapter :sketch="sketch" :notes="notes" />
</template>

<script setup lang="ts">
import p5 from 'p5'
import P5Chapter from '../../components/P5Chapter.vue'

const notes = new URL('./notes.md', import.meta.url).href

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(800, 600)
  }

  p.draw = () => {
    p.background(240)
  }
}
</script>
