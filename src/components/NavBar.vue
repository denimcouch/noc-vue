<script setup lang="ts">
import { NButton, NFlex } from 'naive-ui'
import ChaptersMenu from './ChaptersMenu.vue'
</script>

<template>
  <header>
    <n-flex justify="space-between" align="center" class="navbar">
      <h1 class="navbar-title">Nature of Code</h1>
      <n-flex>
        <n-button ghost>
          <router-link class="navbar-link" to="/">Home</router-link>
        </n-button>
        <chapters-menu />
      </n-flex>
    </n-flex>
  </header>
</template>

<style scoped>
.navbar {
  padding: 0.5rem 2rem;
}

.navbar-link {
  color: #1d1f1f;
  text-decoration: none;
}
</style>
