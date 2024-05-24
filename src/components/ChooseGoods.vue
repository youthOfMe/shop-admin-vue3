<template>
  <el-dialog title="商品选择" v-model="dialogvisible" width="80%">
    <el-table ref="multiSelectionIds" @selection-change="handleSelectionChange" :data="tableData" stripe
      style="width: 100%" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="商品">
        <template #default="{ row }">
          <div class="flex">
            <el-image class="mr-3 rounded" :src="row.cover" fit="fill" :lazy="true"
              style="width: 50px; height: 50px;"></el-image>
            <div class="flex-1">
              <p>{{ row.title }}</p>
              <div>
                <span class="text-rose-500">￥{{ row.min_price }}</span>
                <el-divider direction="vertical"></el-divider>
                <span class="text-gry-500 text-xs">￥{{ row.min_price }}</span>
              </div>
              <p class="text-gray-400 text-xs mb-1">分类: {{ row.category ? row.category.name : '未分类' }}</p>
              <p class="text-gray-400 text-xs">创建时间: {{ row.create_time }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总库存" width="90" prop="stock" align="center"></el-table-column>
      <el-table-column label="价格 (元)" width="150" prop="stock" align="center">
        <template #default="{ row }">
          <span class="text-rose-500">￥{{ row.min_price }}</span>
          <el-divider direction="vertical"></el-divider>
          <span class="text-gray-500 text-xs">￥{{ row.min_oprice }}</span>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup>
import { ref } from 'vue'
import {
  getGoodsList
} from '@/api/goods'
import { useInitTable } from '@/composables/useCommon'

const dialogvisible = ref(false)

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleSelectionChange,
  handleMultiDelete,
  handleMultiStatusChange,
  multiSelectionIds,
  multipleTableRef
} = useInitTable({
  searchForm: {
    title: "",
    tab: "all",
    category_id: null,
  },
  getList: getGoodsList,
  onGetListSuccess: (res) => {
    tableData.value = res.list
    total.value = res.totalCount
  }
})

const submit = () => {

}

function close() {
  dialogvisible.value = false
}

const open = () => {
  dialogvisible.value = true
}

defineExpose({
  open
})
</script>