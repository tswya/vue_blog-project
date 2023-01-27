import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      name: '首页',
      path: '/home',
      component: () => import('../views/Home.vue')
    }
  ],
  history: createWebHistory()
})

export default router
