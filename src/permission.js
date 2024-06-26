import { router, addRoutes } from '@/router'
import store from './store'
import { getToken } from '@/composables/auth'
import { toast, showFullLoading, hideFullLoading } from './composables/util'

// 全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
  // 显示loading
  showFullLoading()

  const token = getToken()

  // 没有登录, 强制跳转回登录页
  if (!token && to.path != "/login") {
    toast("请先登录", "error")
    return next({ path: "/login" })
  }

  // 防止重复登录
  if (token && to.path === "/login") {
    toast("请勿重复登录", "error")
    return next({ path: from.path ?? "/" })
  }

  // 如果用户登录了, 就自动获取用户信息, 并存储在vuex中
  let hasNewRoutes = false
  if (token && !hasGetInfo) {
    const { menus } = await store.dispatch('getInfo')
    hasGetInfo = true
    // 动态添加路由
    hasNewRoutes = addRoutes(menus)
  }

  // 设置页面标题
  let title = (to.meta.title ?? "") + "-风花雪月"
  document.title = title

  hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach((to, from) => hideFullLoading())