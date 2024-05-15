<template>
  <div class="f-menu">
    <el-menu default-active="2" class="border-0" @select="handleSelect">
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
            {{ item2.name }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const asideMenus = [{
  name: "后台面板",
  icon: "help",
  child: [{
    name: "主控台",
    icon: "home-filled",
    frontpath: "/1"
  }]
}]

const router = useRouter()
const handleSelect = (e) => {
  router.push(e)
}
</script>

<style>
.f-menu {
  width: 250px;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow: auto;
  @apply shadow-md fixed bg-light-50;
}
</style>