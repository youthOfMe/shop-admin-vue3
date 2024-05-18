<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增|刷新 -->
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small">新增</el-button>
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text>
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
  </el-card>

</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([])

const getData = () => {

}
</script>