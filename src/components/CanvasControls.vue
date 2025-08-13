<template>
  <div class="canvas-controls">
    <canvas-theme-selector />
    <refresh-canvas-button @refresh-canvas="recreateSketch" />
  </div>
</template>

<script setup lang="ts">
import CanvasThemeSelector from '@/components/CanvasThemeSelector.vue'
import RefreshCanvasButton from '@/components/RefreshCanvasButton.vue'

const emit = defineEmits<{ (e: 'refreshCanvas'): void }>()

const recreateSketch = () => {
  emit('refreshCanvas')
}
</script>

<style scoped>
.canvas-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  position: absolute;
  top: 540px;
  left: 10px;
  z-index: 5;

  border-radius: 0.5rem;
  background-color: rgba(24, 24, 24, 0.9);
  padding: 0.5rem;
}

/* Shared styling for any control buttons placed inside canvas-controls */
.canvas-controls :deep(.canvas-control-button) {
  width: 36px !important;
  height: 36px !important;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  transition: transform 0.2s ease;
}

.canvas-controls :deep(.canvas-control-button:hover) {
  transform: scale(1.1);
}

.canvas-controls :deep(.canvas-control-button .n-icon) {
  display: block;
}

.canvas-controls :deep(.canvas-control-button .n-button__content) {
  line-height: 0;
}
</style>
