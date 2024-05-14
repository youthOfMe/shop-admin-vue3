import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Admin from '@/layouts/admin.vue'
import Index from '@/pages/index.vue'
import About from '../pages/about.vue'
import NotFound from '@/pages/404.vue'

const routes = [
  {
    path: '/',
    component: Admin,
    // 子路由
    children: [{
      path: '/',
      component: Index,
      meta: {
        title: "后台首页"
      }
    }]
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
    meta: {
      title: "登录页"
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router