import VueCookies from 'vue-cookies'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      name: '登录',
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      name: '首页',
      path: '/home',
      component: () => import('../views/Home.vue')
    }
  ],
  history: createWebHistory()
})
/* router.beforeEach((to, from, next) => {
  const userInfo = VueCookies.get('userInfo')
  if (!userInfo && to.path !== 'login') {
    router.push('/login')
  }
  next()
}) */
export default router
