<template>
  <n-dropdown
    trigger="click"
    :options="dropdownOptions"
    @select="handleThemeSelect"
    placement="bottom-start"
  >
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button class="canvas-control-button" text :bordered="false">
          <n-icon class="theme-button-icon" :size="24" :color="currentCanvasColors.stroke">
            <color-palette-icon />
          </n-icon>
        </n-button>
      </template>
      <span>Change theme</span>
    </n-tooltip>
  </n-dropdown>
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

<style scoped></style>
