<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NDropdown, NButton } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

import { useTheme } from '@/composables/useTheme'
import { CHAPTERS } from '@/constants/chapters'

const router = useRouter()

const chapters: MenuOption[] = CHAPTERS.map((chapter) => ({
  label: `Chapter ${chapter.id}: ${chapter.name}`,
  key: `chapter-${chapter.id}`,
  props: {
    onClick: () => router.push(chapter.path),
  },
}))

const showDropdown = ref(false)

const { themeColors } = useTheme()
</script>

<template>
  <n-dropdown
    trigger="click"
    :options="chapters"
    :show="showDropdown"
    @update:show="showDropdown = $event"
    @select="showDropdown = false"
  >
    <n-button ghost :bordered="false" :style="{ color: themeColors.text }">
      Chapters
      <template #icon>
        <svg viewBox="0 0 16 16" style="width: 1em; height: 1em">
          <path fill="currentColor" d="M4.5 6L8 9.5L11.5 6H4.5Z" />
        </svg>
      </template>
    </n-button>
  </n-dropdown>
</template>

<style scoped></style>
