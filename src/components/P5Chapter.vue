<template>
  <n-layout
    class="chapter-container"
    :has-sider="!isMobile"
    :sider-placement="isMobile ? undefined : 'right'"
  >
    <n-layout-content class="canvas-area" :style="{ backgroundColor: themeColors.background }">
      <div ref="canvasContainer" class="canvas-container">
        <canvas-controls @refresh-canvas="recreateSketch" />
      </div>
    </n-layout-content>
    <n-layout-sider
      v-if="!isMobile"
      class="notes-sider"
      width="35%"
      :native-scrollbar="false"
      content-style="height: 100%; overflow-y: auto; padding: 20px 40px 20px 0;"
      :style="{ backgroundColor: themeColors.background }"
    >
      <div class="notes-section">
        <markdown-renderer :file-path="notes" />
      </div>
    </n-layout-sider>
    <!-- Mobile/Tablet notes section -->
    <div v-if="isMobile" class="notes-mobile" :style="{ backgroundColor: themeColors.background }">
      <div class="notes-section">
        <markdown-renderer :file-path="notes" />
      </div>
    </div>
  </n-layout>
</template>

<script setup lang="ts">
import p5 from 'p5'
import { ref, onMounted, onUnmounted, provide, watch } from 'vue'
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
import { useP5Canvas } from '../composables/useP5Canvas'
import type { P5ThemeColors } from '../utils/p5-theme'
import { useTheme } from '../composables/useTheme'
import MarkdownRenderer from './MarkdownRenderer.vue'
import CanvasControls from './CanvasControls.vue'

const props = defineProps<{
  sketch: (p: p5, canvasColors: P5ThemeColors) => void
  notes: string
}>()

const sketchWithTheme = (p: p5) => {
  props.sketch(p, currentCanvasColors.value)
}

const { themeColors, currentCanvasColors, canvasThemeStore } = useTheme()

const isMobile = ref(false)
const canvasContainer = ref<HTMLElement | null>(null)
const { p5Instance, recreateSketch } = useP5Canvas(sketchWithTheme, canvasContainer)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768
}

const handleResize = () => {
  checkScreenSize()
  recreateSketch()
}

// Provide theme colors to P5 sketches
provide('themeColors', themeColors)

// Watch for canvas theme changes and recreate the sketch when the theme changes
watch(
  () => canvasThemeStore.currentTheme,
  () => {
    recreateSketch()
  },
)

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  p5Instance.value?.remove()
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
}

.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  position: relative;
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

/* Mobile and tablet responsive styles */
@media (max-width: 768px) {
  .chapter-container {
    flex-direction: column;
  }

  .canvas-area {
    height: unset;
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
