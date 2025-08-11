<template>
  <n-layout class="chapter-container" has-sider sider-placement="right">
    <n-layout-content
      class="canvas-area"
      :style="{ backgroundColor: themeColors.background }"
    >
      <div ref="canvasContainer" class="canvas-container"></div>
    </n-layout-content>
    <n-layout-sider
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
  </n-layout>
</template>

<script setup lang="ts">
import p5 from 'p5'
import { ref, onMounted, onUnmounted, provide } from 'vue'
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
import { useTheme, type ThemeColors } from '../composables/useTheme'
import MarkdownRenderer from './MarkdownRenderer.vue'

const { themeColors } = useTheme()

// Provide theme colors to P5 sketches
provide('themeColors', themeColors)

const props = defineProps<{
  sketch: (p: p5, themeColors: ThemeColors) => void
  notes: string
}>()

const canvasContainer = ref<HTMLElement>()
let p5Instance: p5 | null = null

onMounted(() => {
  if (canvasContainer.value) {
    // Create a wrapper function that passes theme colors to the sketch
    const sketchWithTheme = (p: p5) => {
      props.sketch(p, themeColors.value)
    }
    p5Instance = new p5(sketchWithTheme, canvasContainer.value)
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
  height: 100%;
  overflow: hidden;
}

.canvas-area {
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
