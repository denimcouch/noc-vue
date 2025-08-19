import { createRouter, createWebHistory } from 'vue-router'
import { CHAPTERS } from '@/constants/chapters'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/HomePage.vue'),
    },
      ...CHAPTERS.map((chapter) => ({
      path: chapter.path,
      name: chapter.name,
      component: chapter.component,
    })),
    {
      path: '/:pathMatch(.*)*',
      redirect: CHAPTERS[0].path,
    },
  ],
})

export default router
