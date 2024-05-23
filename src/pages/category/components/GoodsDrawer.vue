<template>
  <FormDrawer ref="formDrawerRef" title="推荐商品">
    <el-table :data="tableData" border stripe style="width: 100%;">
      <el-table-column prop="goods_id" label="ID" width="60" />
      <el-table-column label="商品封面" width="180">
        <template #default="{ row }">
          <div>
            <el-image :src="row.cover" fit="fill" :lazy="true" style="width: 64px; height: 64px;"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="primary" text size="small">删除</el-button>

        </template>
      </el-table-column>
    </el-table>

  </FormDrawer>
</template>

<script setup>
import { ref } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue'

import {
  getCategoryGoods
} from '@/api/category'

const formDrawerRef = ref(null)
const category_id = ref(0)
const tableData = ref([])

const open = (item) => {
  category_id.value = item.id
  getData().then(res => {
    formDrawerRef.value.open()
  })
}

function getData() {
  return getCategoryGoods(category_id.value).then(res => {
    tableData.value = res
  })
}

defineExpose({
  open
})
</script>