import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      name: '登录',
      path: '/login',
      component: () => import('../views/Login.vue')
    }
  ],
  history: createWebHistory()
})

export default router
