import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/chapter/0',
    },
    {
      path: '/chapter/0',
      name: 'chapter-0',
      component: () => import('../chapters/00-randomness/ChapterZero.vue'),
    },
    {
      path: '/chapter/1',
      name: 'chapter-1',
      component: () => import('../chapters/01-vectors/ChapterOne.vue'),
    },
    {
      path: '/chapter/2',
      name: 'chapter-2',
      component: () => import('../chapters/02-forces/ChapterTwo.vue'),
    },
    {
      path: '/chapter/3',
      name: 'chapter-3',
      component: () => import('../chapters/03-oscillation/ChapterThree.vue'),
    },
    {
      path: '/chapter/4',
      name: 'chapter-4',
      component: () => import('../chapters/04-particle-systems/ChapterFour.vue'),
    },
    {
      path: '/chapter/5',
      name: 'chapter-5',
      component: () => import('../chapters/05-autonomous-agents/ChapterFive.vue'),
    },
  ],
})

export default router
