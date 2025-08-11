<template>
  <div class="canvas-theme-selector">
    <n-dropdown
      trigger="click"
      :options="dropdownOptions"
      @select="handleThemeSelect"
      placement="bottom-start"
    >
      <!-- <n-button class="theme-button" size="large" :bordered="false" circle>
        <template #icon>
          <n-icon class="theme-button-icon" :size="24">
            <color-palette-icon />
          </n-icon>
        </template>
      </n-button> -->
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button class="theme-button" text size="large" :bordered="false">
            <n-icon class="theme-button-icon" :size="28" :color="currentCanvasColors.stroke">
              <color-palette-icon />
            </n-icon>
          </n-button>
        </template>
        <span>Change theme</span>
      </n-tooltip>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NDropdown, NButton, NIcon, NTooltip } from 'naive-ui'
import { ColorPalette as ColorPaletteIcon } from '@vicons/ionicons5'
import { useTheme } from '../composables/useTheme'
import type { CanvasThemeOption } from '../stores/canvasTheme'

const { canvasThemeStore, currentCanvasColors } = useTheme()

const dropdownOptions = computed(() =>
  canvasThemeStore.availableThemes.map((theme) => ({
    label: theme.name,
    key: theme.id,
    props: {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      },
    },
  })),
)

const handleThemeSelect = (key: CanvasThemeOption) => canvasThemeStore.setTheme(key)
</script>

<style scoped>
.canvas-theme-selector {
  display: inline-block;
}

.theme-button {
  transition: all 0.2s ease;
}

.theme-button:hover {
  transform: scale(1.1);
}
</style>
