<template>
  <n-layout
    class="chapter-container"
    :has-sider="!isMobile"
    :sider-placement="isMobile ? undefined : 'right'"
  >
    <n-layout-content class="canvas-area" :style="{ backgroundColor: themeColors.background }">
      <div class="canvas-controls">
        <canvas-theme-selector />
      </div>
      <div ref="canvasContainer" class="canvas-container"></div>
    </n-layout-content>
    <n-layout-sider
      v-if="!isMobile"
      class="notes-sider"
      width="35%"
      :native-scrollbar="false"
      content-style="height: 100%; overflow-y: auto; padding: 20px;"
      :style="{ backgroundColor: themeColors.background }"
    >
      <div class="notes-section">
        <MarkdownRenderer :file-path="notes" />
      </div>
    </n-layout-sider>
    <!-- Mobile/Tablet notes section -->
    <div v-if="isMobile" class="notes-mobile" :style="{ backgroundColor: themeColors.background }">
      <div class="notes-section">
        <MarkdownRenderer :file-path="notes" />
      </div>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import p5 from 'p5'
import { ref, onMounted, onUnmounted, provide, watch } from 'vue'
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
import { useTheme } from '../composables/useTheme'
import MarkdownRenderer from './MarkdownRenderer.vue'
import CanvasThemeSelector from './CanvasThemeSelector.vue'

const { themeColors, currentCanvasColors, canvasThemeStore } = useTheme()

// Responsive breakpoint detection
const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768
}

const handleResize = () => {
  checkScreenSize()
}

// Provide theme colors to P5 sketches
provide('themeColors', themeColors)

import type { ThemeColors } from '../composables/useTheme'

type CanvasColors = ThemeColors['canvas'][string]

const props = defineProps<{
  sketch: (p: p5, canvasColors: CanvasColors) => void
  notes: string
}>()

const canvasContainer = ref<HTMLElement>()
let p5Instance: p5 | null = null

const createSketch = () => {
  if (canvasContainer.value) {
    // Create a wrapper function that passes current canvas colors to the sketch
    const sketchWithTheme = (p: p5) => {
      props.sketch(p, currentCanvasColors.value)
    }
    p5Instance = new p5(sketchWithTheme, canvasContainer.value)
  }
}

const recreateSketch = () => {
  if (p5Instance) {
    p5Instance.remove()
    p5Instance = null
  }
  createSketch()
}

// Watch for canvas theme changes and recreate the sketch
watch(
  () => canvasThemeStore.currentTheme,
  () => {
    recreateSketch()
  },
)

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', handleResize)
  createSketch()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (p5Instance) {
    p5Instance.remove()
    p5Instance = null
  }
})
</script>

<style scoped>
.chapter-container {
  height: 100%;
  overflow: hidden;
}

.canvas-area {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.canvas-controls {
  position: absolute;
  top: 5%;
  left: 10%;
  z-index: 5;
}

.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.notes-sider {
  height: 100%;
  overflow: hidden;
}

.notes-section {
  padding: 0;
  margin: 0;
  height: 100%;
}

.notes-mobile {
  padding: 20px;
  overflow-y: auto;
  height: 50vh;
  min-height: 300px;
}

.chapter-header {
  font-size: 0.75rem;
}

.chapter-header h2 {
  margin-bottom: 0;
}

h2 {
  margin-bottom: 30px;
  font-size: 2.5em;
}

/* Mobile and tablet responsive styles */
@media (max-width: 768px) {
  .chapter-container {
    flex-direction: column;
  }

  .canvas-area {
    height: 50vh;
    min-height: 300px;
  }

  .canvas-controls {
    position: absolute;
    top: 2%;
    left: 5%;
    z-index: 5;
  }

  .canvas-container {
    margin-top: 1rem;
  }

  .notes-mobile {
    flex: 1;
    height: auto;
    min-height: 200px;
  }
}

@media (max-width: 480px) {
  .canvas-controls {
    top: 1%;
    left: 2%;
  }

  .canvas-container {
    margin-top: 0.5rem;
  }

  h2 {
    font-size: 2em;
    margin-bottom: 20px;
  }
}
</style>
