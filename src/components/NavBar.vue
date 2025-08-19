<script setup lang="ts">
import { NFlex, NH1, NIcon } from 'naive-ui'
import { Leaf as LeafIcon } from '@vicons/ionicons5'
import ChaptersMenu from '@/components/ChaptersMenu.vue'
import { useTheme } from '@/composables/useTheme'

const { themeColors } = useTheme()
</script>

<template>
  <header
    class="navbar-container"
    :style="{ backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }"
  >
    <nav>
      <n-flex justify="space-between" align="center" class="navbar">
        <router-link to="/" class="navbar-link">
          <n-h1 class="navbar-title" :style="{ color: themeColors.text }">
            <n-icon :size="32" :color="themeColors.primary">
              <LeafIcon />
            </n-icon>
            <span>Nature of Code</span>
          </n-h1>
        </router-link>
        <n-flex>
          <chapters-menu />
        </n-flex>
      </n-flex>
    </nav>
  </header>
</template>

<style scoped>
.navbar-container {
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid;
}

.navbar-container nav {
  max-width: calc(100% - 6rem);
  margin: 0 auto;
}

.navbar {
  padding: 0.5rem 1.5rem;
}

.navbar-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0;
}

.navbar-title span {
  font-size: 1.25rem;
}

.navbar-link {
  text-decoration: none;
}
</style>
