<template>
  <n-layout class="home-page">
    <n-layout-content class="home-page-content">
      <n-flex vertical>
        <n-h2>Welcome!</n-h2>
        <n-p class="home-page-text">
          This is a collection of p5.js sketches that I've created while learning the book "The Nature of Code" by Daniel Shiffman.
        </n-p>
        <n-p class="home-page-text">
          The book is a great resource for learning how to create generative art by simulating natural systems with code.
        </n-p>
        <n-p class="home-page-text">
          I've created these sketches to help me understand the concepts and techniques used in the book, and have added some notes and explanations to help me understand the concepts and techniques covered in the book.
        </n-p>
        <n-p class="home-page-text">
          These sketches are broken down into the various chapters of the book, and are organized in the same order as the book.
          Each sketch is a standalone example of the concept or technique covered in the chapter.
        </n-p>
        <n-p class="home-page-text">
          For anybody who has landed on this site, I hope you find it useful.
          A site like this was not strictly required to work through this book, but it has been a fun way for me to learn and share my learning.
        </n-p>
      </n-flex>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { NH2, NLayout, NLayoutContent, NFlex } from 'naive-ui'

</script>

<style scoped>
.home-page {
  margin: 0 auto;
  margin-top: 1rem;
  max-width: calc(100% - 10rem);
}

.home-page-content {
  padding: 1rem;
  width: 70%
}

.home-page-content h2 {
  font-size: 2rem;
}

.home-page-text {
  font-size: 1.1rem;
}
</style>
