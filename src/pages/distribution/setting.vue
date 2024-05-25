<template>
  <div v-loading="loading" class="bg-white p-4 rounded">
    <el-form :model="form" label-width="160px">

      <el-form-item>
        <el-button type="primary" size="default" @click="submit">保存</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getConfig, setConfig } from '@/api/distribution'
import { toast } from '@/composables/util'

const activeName = ref('first')

const form = reactive({
  "distribution_open": 1, //分销启用:0禁用1启用
  "store_first_rebate": 10, //一级返佣比例：0~100
  "store_second_rebate": 20, //二级返佣比例：0~100
  "spread_banners": [
    "http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/62710076cd93e.png"
  ], //分销海报图
  "is_self_brokerage": 1, //自购返佣:0否1是
  "settlement_days": 7, //结算时间（单位：天）
  "brokerage_method": "hand" //佣金到账方式:hand手动,wx微信
})

const loading = ref(false)
function getData() {
  loading.value = true
  getConfig().then(res => {
    for (const key in form) {
      form[key] = res[key]
    }
    form.password_encrypt = form.password_encrypt.split(",")
  }).finally(() => {
    loading.value = false
  })
}
getData()

const submit = () => {
  loading.value = true

  setConfig({
    ...form,
  }).then(res => {
    toast('修改成功')
    getData()
  }).finally(() => {
    loading.value = false
  })
}
</script>