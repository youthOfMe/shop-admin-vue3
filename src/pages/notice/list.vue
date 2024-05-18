<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增|刷新 -->
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small">新增</el-button>
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text @click="getData()">
          <el-icon :size="20">
            <Refresh></Refresh>
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="create_time" label="发布时间" width="380" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" text>修改</el-button>
          <el-popconfirm title="是否要删除该公告?" confirmButtonText="确认" cancelButtonText="取消"
            @confirm="handleDelete(item.id)">
            <template #reference>
              <el-button type="primary" size="small" text>删除</el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination layout="prev, pager, next" background :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
  </el-card>

</template>

<script setup>
import { ref } from 'vue'
import {
  getNoticeList
} from '@/api/notice'

const tableData = ref([])

// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

const getData = (p) => {
  if (typeof p === "number") {
    currentPage.value = p
  }
  getNoticeList(currentPage.value).then(res => {
    tableData.value = res.list
    total.value = res.totalCount
    if (item) {
      handleChangeActiveId(item.id)
    }
  }).finally(() => {
  })
}

getData()
</script>