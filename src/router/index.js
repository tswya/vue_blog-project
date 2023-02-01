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
      path: '/',
      component: () => import('../views/Home.vue'),
      redirect: '/blog/list',
      children: [
        {
          path: '/blog/list',
          name: '博客管理',
          component: () => import('@/views/blog/Blog.vue')
        },
        {
          path: '/blog/category',
          name: '分类管理',
          component: () => import('@/views/blog/BlogCategory.vue')
        }
      ]
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
