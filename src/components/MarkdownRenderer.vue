<template>
  <div
    class="markdown-content"
    v-html="renderedMarkdown"
    :style="{
      backgroundColor: themeColors.surface,
      color: themeColors.text,
      borderColor: themeColors.border,
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'
import { useTheme } from '../composables/useTheme'

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
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
  border: 1px solid;
}

/* Markdown styling */
.markdown-content :deep(h1) {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 0.5em;
  border-bottom: 2px solid;
  border-bottom-color: var(--border-color, #eee);
  padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown-content :deep(h3) {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.markdown-content :deep(p) {
  margin-bottom: 1em;
  opacity: 0.9;
}

.markdown-content :deep(strong) {
  font-weight: bold;
}

.markdown-content :deep(em) {
  font-style: italic;
  opacity: 0.8;
}

.markdown-content :deep(ul) {
  margin-bottom: 1em;
  padding-left: 2em;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5em;
  opacity: 0.9;
}

.markdown-content :deep(code) {
  background-color: rgba(128, 128, 128, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background-color: rgba(128, 128, 128, 0.1);
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
  margin-bottom: 1em;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid rgba(128, 128, 128, 0.3);
  margin: 1em 0;
  padding-left: 1em;
  opacity: 0.8;
  font-style: italic;
}
</style>
