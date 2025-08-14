export const CHAPTERS = [
  {
    id: 0,
    name: 'Randomness',
    path: '/chapter/0',
    component: () => import('@/chapters/00-randomness/ChapterZero.vue'),
  },
  {
    id: 1,
    name: 'Vectors',
    path: '/chapter/1',
    component: () => import('@/chapters/01-vectors/ChapterOne.vue'),
  },
  {
    id: 2,
    name: 'Forces',
    path: '/chapter/2',
    component: () => import('@/chapters/02-forces/ChapterTwo.vue'),
  },
  {
    id: 3,
    name: 'Oscillation',
    path: '/chapter/3',
    component: () => import('@/chapters/03-oscillation/ChapterThree.vue'),
  },
  {
    id: 4,
    name: 'Particle Systems',
    path: '/chapter/4',
    component: () => import('@/chapters/04-particle-systems/ChapterFour.vue'),
  },
  {
    id: 5,
    name: 'Autonomous Agents',
    path: '/chapter/5',
    component: () => import('@/chapters/05-autonomous-agents/ChapterFive.vue'),
  },
] as const
