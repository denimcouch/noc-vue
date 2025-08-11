<script setup lang="ts">
import { NButton, NFlex } from 'naive-ui'
import { useTheme } from '../composables/useTheme'
import ChaptersMenu from './ChaptersMenu.vue'

const { themeColors } = useTheme()
</script>

<template>
  <header
    class="navbar-container"
    :style="{ backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }"
  >
    <nav>
      <n-flex justify="space-between" align="center" class="navbar">
        <h1 class="navbar-title" :style="{ color: themeColors.text }">Nature of Code</h1>
        <n-flex>
          <n-button ghost :bordered="false">
            <router-link class="navbar-link" to="/" :style="{ color: themeColors.text }"
              >Home</router-link
            >
          </n-button>
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
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid;
}

.navbar-container nav {
  max-width: 1200px;
  margin: 0 auto;
}

.navbar {
  padding: 0.5rem 1.5rem;
}

.navbar-link {
  text-decoration: none;
}
</style>
