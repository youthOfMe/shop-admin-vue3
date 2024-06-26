import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Admin from '@/layouts/admin.vue'
import Index from '@/pages/index.vue'
import NotFound from '@/pages/404.vue'

// 这是默认路由 所有用户共享
const routes = [
  {
    path: '/',
    name: "admin",
    component: Admin,
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

// 动态路由, 用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: "/",
    name: "/",
    component: Index,
    meta: {
      title: "后台首页"
    }
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: () => import("@/pages/goods/list.vue"),
    meta: {
      title: "商品管理"
    }
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: () => import("@/pages/category/list.vue"),
    meta: {
      title: "分类列表"
    }
  },
  {
    path: "/user/list",
    name: "/user/list",
    component: () => import("@/pages/user/list.vue"),
    meta: {
      title: "用户列表"
    }
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: () => import("@/pages/order/list.vue"),
    meta: {
      title: "订单列表"
    }
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: () => import("@/pages/comment/list.vue"),
    meta: {
      title: "评价列表"
    }
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: () => import("@/pages/image/list.vue"),
    meta: {
      title: "图库列表"
    }
  },
  {
    path: "/notice/list",
    name: "/notice/list",
    component: () => import("@/pages/notice/list.vue"),
    meta: {
      title: "公告列表"
    }
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: () => import("@/pages/setting/base.vue"),
    meta: {
      title: "配置列表"
    }
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: () => import("@/pages/coupon/list.vue"),
    meta: {
      title: "优惠券列表"
    }
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    component: () => import('@/pages/manager/list.vue'),
    meta: {
      title: '管理员管理'
    }
  },
  {
    path: '/access/list',
    name: '/access/list',
    component: () => import('@/pages/access/list.vue'),
    meta: {
      title: '菜单权限管理'
    }
  },
  {
    path: '/role/list',
    name: '/role/list',
    component: () => import('@/pages/role/list.vue'),
    meta: {
      title: '角色管理'
    }
  },
  {
    path: '/skus/list',
    name: '/skus/list',
    component: () => import('@/pages/skus/list.vue'),
    meta: {
      title: '规格管理'
    }
  },
  {
    path: '/level/list',
    name: '/level/list',
    component: () => import('@/pages/level/list.vue'),
    meta: {
      title: '会员等级'
    }
  },
  {
    path: '/setting/buy',
    name: '/setting/buy',
    component: () => import('@/pages/setting/buy.vue'),
    meta: {
      title: '支付设置'
    }
  },
  {
    path: '/setting/ship',
    name: '/setting/ship',
    component: () => import('@/pages/setting/ship.vue'),
    meta: {
      title: '支付设置'
    }
  },
  {
    path: '/distribution/index',
    name: '/distribution/index',
    component: () => import('@/pages/distribution/index.vue'),
    meta: {
      title: '分销员设置'
    }
  },
  {
    path: '/distribution/setting',
    name: '/distribution/setting',
    component: () => import('@/pages/distribution/setting.vue'),
    meta: {
      title: '分销设置'
    }
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false

  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach(e => {
      const item = asyncRoutes.find(o => o.path === e.frontpath)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute("admin", item)
        hasNewRoutes = true
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child)
      }
    })
  }

  findAndAddRoutesByMenus(menus)

  return hasNewRoutes
}