<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NDropdown, NButton, NIcon, type MenuOption } from 'naive-ui'
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from '@vicons/ionicons5'

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
        <n-icon v-if="!showDropdown" :size="16" :color="themeColors.text">
          <ChevronDownIcon />
        </n-icon>
        <n-icon v-else :size="16" :color="themeColors.text">
          <ChevronUpIcon />
        </n-icon>
      </template>
    </n-button>
  </n-dropdown>
</template>

<style scoped></style>
