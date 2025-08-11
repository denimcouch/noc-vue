<script setup lang="ts">
import { NConfigProvider, NGlobalStyle } from 'naive-ui'
import { useTheme } from './composables/useTheme'
import NavBar from './components/NavBar.vue'

const { naiveTheme, themeColors } = useTheme()
</script>

<template>
  <n-config-provider :theme="naiveTheme">
    <n-global-style />
    <div
      class="app-container"
      :style="{ backgroundColor: themeColors.background, color: themeColors.text }"
    >
      <NavBar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </n-config-provider>
</template>

<style scoped>
.app-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow: hidden;
}
</style>
