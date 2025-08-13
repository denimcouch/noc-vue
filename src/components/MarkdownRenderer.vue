<template>
  <div
    v-if="!isLoading"
    class="markdown-content"
    v-html="renderedMarkdown"
    :style="{
      '--theme-background': themeColors.background,
      '--theme-surface': themeColors.surface,
      '--theme-text': themeColors.text,
      '--theme-border': themeColors.border,
      '--theme-accent': themeColors.accent,
      '--theme-primary': themeColors.primary,
      '--theme-secondary': themeColors.secondary,
    }"
  />
  <MarkdownSkeleton v-else />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'

import MarkdownSkeleton from '@/components/skeletons/MarkdownSkeleton.vue'
import { useTheme } from '@/composables/useTheme'

const { themeColors } = useTheme()

interface Props {
  filePath: string
}

const props = defineProps<Props>()
const markdownContent = ref<string>('')
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

const renderedMarkdown = computed(() => {
  if (!markdownContent.value) return ''
  return marked(markdownContent.value)
})

const loadMarkdownFile = async () => {
  try {
    isLoading.value = true
    error.value = null

    // In a Vite environment, we need to import the markdown file as a raw string
    const response = await fetch(props.filePath)
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.statusText}`)
    }

    markdownContent.value = await response.text()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load markdown file'
    console.error('Error loading markdown:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadMarkdownFile()
})
</script>

<style scoped>
.markdown-content {
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

/* Markdown styling */
.markdown-content :deep(h1) {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 0.5em;
  border-bottom: 2px solid var(--theme-accent);
  padding-bottom: 0.3em;
  color: var(--theme-text);
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: var(--theme-primary);
}

.markdown-content :deep(h3) {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: var(--theme-secondary);
}

.markdown-content :deep(p) {
  margin-bottom: 1em;
  color: var(--theme-text);
}

.markdown-content :deep(strong) {
  font-weight: bold;
  color: var(--theme-accent);
}

.markdown-content :deep(em) {
  font-style: italic;
  color: var(--theme-secondary);
}

.markdown-content :deep(ul) {
  margin-bottom: 1em;
  padding-left: 2em;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5em;
  color: var(--theme-accent);
}

.markdown-content :deep(code) {
  background-color: var(--theme-surface);
  color: var(--theme-accent);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  border: 1px solid var(--theme-border);
}

.markdown-content :deep(pre) {
  background-color: var(--theme-surface);
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
  margin-bottom: 1em;
  border: 1px solid var(--theme-border);
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  border: none;
  padding: 0;
  color: var(--theme-text);
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--theme-accent);
  margin: 1em 0;
  padding-left: 1em;
  font-style: italic;
  color: var(--theme-text);
}
</style>
