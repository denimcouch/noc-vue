<template>
  <div
    class="markdown-skeleton"
    :style="{
      '--theme-background': themeColors.background,
      '--theme-surface': themeColors.surface,
      '--theme-text': themeColors.text,
      '--theme-border': themeColors.border,
    }"
  >
    <n-skeleton text :height="40" />
    <n-skeleton text :repeat="2" />
    <n-skeleton text width="60%" />
    <br />
    <br />
    <n-skeleton text :height="24" />
    <n-skeleton text :repeat="2" />
    <n-skeleton text width="60%" />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../../composables/useTheme'

const { themeColors } = useTheme()

import { NSkeleton } from 'naive-ui'
</script>

<style scoped>
.markdown-skeleton {
  background-color: var(--theme-surface);
  color: var(--theme-text);
  border-color: var(--theme-border);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
  border: 1px solid var(--theme-border);
}
</style>
