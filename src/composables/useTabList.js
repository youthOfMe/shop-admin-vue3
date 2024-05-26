import { ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

export function useTabList() {
  const route = useRoute()
  const router = useRouter()

  const cookie = useCookies()

  const activeTab = ref(route.path)
  const tabList = ref([
    {
      title: '后台首页',
      path: '/'
    },
    {
      title: '商城管理',
      path: '/goods/list'
    }
  ])

  // 添加标签导航
  const addTab = (tab) => {
    const noTab = tabList.value.findIndex(t => t.path === tab.path) === -1
    if (noTab) {
      tabList.value.push(tab)
    }

    cookie.set("tabList", tabList.value)
  }

  // 初始化标签导航列表
  const initTabList = () => {
    const tbs = cookie.get("tabList")
    if (tbs) {
      tabList.value = tbs
    }
  }

  initTabList()

  onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path
    addTab({
      title: to.meta.title,
      path: to.path
    })
  })

  const changeTab = (t) => {
    console.log(t)
    activeTab.value = t.props.name
    router.push(t.props.name)
  }

  const removeTab = (t) => {
    const tabs = tabList.value
    let a = activeTab.value
    if (a === t) {
      tabs.forEach((tab, index) => {
        if (tab.path === t) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            a = nextTab.path
          }
        }
      })
    }

    activeTab.value = a
    tabList.value = tabList.value.filter(tab => tab.path != t)

    cookie.set("tabList", tabList.value)
  }

  // 关闭
  const handleClose = (command) => {
    if (command === "clearAll") {
      // 切换回首页
      activeTab.value = "/"
      // 过滤只剩下首页
      tabList.value = [{
        title: '后台首页',
        path: '/'
      },]
    } else {
      // 过滤只剩下首页和当前激活的
      tabList.value = tabList.value.filter(tab => tab.path === "/" || tab.path === activeTab.value)
    }
    cookie.set("tabList", tabList.value)
  }

  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
  }
}