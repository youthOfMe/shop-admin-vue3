<template>
  <el-drawer title="物流信息" v-model="dialogVisible" size="40%">
    <el-card shadow="never" class="border-0 mb-3">
      <div class="flex items-center">
        <el-image :src="info.logo" fit="fill" :lazy="true" style="width: 60px;" class="rounded border"></el-image>
        <div>
          <p>物流公司: {{ info.typename }}</p>
          <P>物流单号: {{ info.number }}</P>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" class="border-0 border-t">
      <el-timeline class="ml-[-40px]">
        <el-timeline-item :timestamp="item.time" placement="top" v-for="(item, index) in info.list" :key="index">
          {{ item.status }}
        </el-timeline-item>
      </el-timeline>
    </el-card>

  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import {
  getShipInfo
} from '@/api/order'
import { toast } from '@/composables/util'

const dialogVisible = ref(false)
const info = ref({})
const open = (id) => {
  return getShipInfo(id).then(res => {
    if (res.status != 0) {
      return toast(res.msg, 'error')
    }
    info.value = res.result
    dialogVisible.value = true
  })
}

defineExpose({
  open
})
</script>