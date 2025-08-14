<template>
  <div class="canvas-controls">
    <n-float-button
      position="relative"
      menu-trigger="click"
      type="primary"
      :show-menu="showMenu"
      @update:show-menu="showMenu = $event"
    >
      <n-icon>
        <SettingsIcon />
      </n-icon>
      <template #menu>
        <n-float-button>
          <canvas-theme-selector @show-menu="showMenu = $event" />
        </n-float-button>
        <n-float-button>
          <refresh-canvas-button @refresh-canvas="recreateSketch" @show-menu="showMenu = $event" />
        </n-float-button>
      </template>
    </n-float-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NFloatButton, NIcon } from 'naive-ui'
import { Settings as SettingsIcon } from '@vicons/ionicons5'
import CanvasThemeSelector from '@/components/CanvasThemeSelector.vue'
import RefreshCanvasButton from '@/components/RefreshCanvasButton.vue'

const showMenu = ref(false)

const emit = defineEmits<{ (e: 'refreshCanvas'): void }>()

const recreateSketch = () => {
  emit('refreshCanvas')
}
</script>

<style scoped>
.canvas-controls {
  position: absolute;
  top: 540px;
  left: 10px;
  z-index: 5;
}

@media (max-width: 768px) {
  .canvas-controls {
    top: 85%;
    left: 2%;
  }
}
</style>
