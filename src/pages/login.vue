<template>
  <el-row style="min-height: 100vh;" class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>你真牛逼</div>
        <div>我牛逼 你牛逼 大家都牛逼 付方亮最牛逼 赵宇轩更牛逼 牛逼牛逼很牛逼</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon">
                <user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password>
            <template #prefix>
              <el-icon class="el-input__icon">
                <lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit"
            :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { login, getInfo } from '@/api/manager'
import { toast } from '@/composables/util'
import {
  setToken,
} from '@/composables/auth'

const router = useRouter()

// 表单数据
const form = reactive({
  username: '',
  password: ''
})

// 校验规则
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
  ]
}

const formRef = ref(null)
const loading = ref(false)
const onSubmit = () => {
  formRef.value?.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    login(form.username, form.password).then(res => {
      // 提示成功
      toast("登录成功")

      // 存储token和用户相关信息
      setToken(res.token)

      // 获取用户相关信息
      getInfo().then(res2 => {
        console.log(res2);
      })

      // 跳转到后台首页
      router.push('/')
    }).finally(() => {
      loading.value = false
    })
  })
}
</script>

<style scoped>
.login-container {
  @apply bg-indigo-500;
}

.login-container .left,
.login-container .right {
  @apply flex items-center justify-center flex-col;
}

.login-container .right {
  @apply bg-light-50 flex-col;
}

.left>div>div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
  @apply text-gray-200 text-sm;
}

.right .title {
  @apply font-bold text-3xl text-gray-800;
}

.right>div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>