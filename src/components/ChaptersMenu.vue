<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NDropdown, NButton } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { useTheme } from '../composables/useTheme'

const router = useRouter()

const chapters: MenuOption[] = [
  {
    label: 'Chapter 0: Randomness',
    key: 'chapter-0',
    props: {
      onClick: () => router.push('/chapter/0'),
    },
  },
  {
    label: 'Chapter 1: Vectors',
    key: 'chapter-1',
    props: {
      onClick: () => router.push('/chapter/1'),
    },
  },
  {
    label: 'Chapter 2: Forces',
    key: 'chapter-2',
    props: {
      onClick: () => router.push('/chapter/2'),
    },
  },
  {
    label: 'Chapter 3: Oscillation',
    key: 'chapter-3',
    props: {
      onClick: () => router.push('/chapter/3'),
    },
  },
  {
    label: 'Chapter 4: Particle Systems',
    key: 'chapter-4',
    props: {
      onClick: () => router.push('/chapter/4'),
    },
  },
  {
    label: 'Chapter 5: Autonomous Agents',
    key: 'chapter-5',
    props: {
      onClick: () => router.push('/chapter/5'),
    },
  },
]

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
