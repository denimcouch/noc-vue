<template>
  <n-tooltip trigger="hover" placement="right">
    <template #trigger>
      <n-button class="canvas-control-button" text :bordered="false" @click="handleClick">
        <n-icon class="refresh-button-icon" :size="24" :color="currentCanvasColors.stroke">
          <refresh-icon />
        </n-icon>
      </n-button>
    </template>
    <span>Refresh Canvas</span>
  </n-tooltip>
</template>

<script setup lang="ts">
import { Refresh as RefreshIcon } from '@vicons/ionicons5'
import { NButton, NIcon, NTooltip } from 'naive-ui'
import { useTheme } from '@/composables/useTheme'

const { currentCanvasColors } = useTheme()

const emit = defineEmits<{ (e: 'refreshCanvas'): void }>()

const handleClick = () => {
  emit('refreshCanvas')
}
</script>

<style scoped></style>
