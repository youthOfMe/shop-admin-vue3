<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1">
        <eleme-filled></eleme-filled>
      </el-icon>
      方亮学习系统
    </span>
    <el-tooltip effect="dark" content="折叠" placement="bottom">
      <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
        <fold v-if="$store.state.asideWidth === '250px'"></fold>
        <Expand v-else />
      </el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <refresh></refresh>
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen"></full-screen>
          <aim v-else></aim>
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"></el-avatar>
          {{ $store.state.user.username }}
          <el-icon class="mr-2 el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!-- <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">

  </el-drawer> -->

  <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码" type="password" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input v-model="form.repassword" placeholder="请输入确认密码" type="password" show-password>
        </el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import { useRepassword, useLogout } from '@/composables/useManager'
import formDrawer from '@/components/FormDrawer.vue'

const {
  // 全屏状态
  isFullscreen,
  // 切换全屏状态
  toggle
} = useFullscreen()
const {
  formDrawerRef, form, rules, formRef, onSubmit, openRePasswordForm
} = useRepassword()
const {
  handleLogout
} = useLogout()

const handleCommand = (e) => {
  switch (e) {
    case "logout":
      handleLogout()
      break;
    case "rePassword":
      openRePasswordForm()
      break;
  }
}

// 刷新
const handleRefresh = () => {
  location.reload()
}
</script>

<style scoped>
.f-header {
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
  z-index: 1000;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center text-light-50;
}
</style>