<template>
  <el-main class="image-main">
    <div class="top p-3">
      <!-- <div v-for="(item, index) in list" :key="index">{{ item.url }}</div> -->
      <el-row :gutter="10">
        <el-col :span="6" :offset="0" v-for="(item, index) in list" :key="index">
          <el-card shadow="hover" class="relative mb-3" :body-style="{ 'padding': 0 }">
            <el-image :src="item.url" fit="cover" class="w-full h-[150px]"></el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex items-center justify-center p-2">
              <el-button type="primary" size="small" text>重命名</el-button>
              <el-button type="primary" size="small" text>删除</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
    <div class="bottom">
      <el-pagination layout="prev, pager, next" background :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
  </el-main>
</template>

<script setup>
import { ref } from 'vue'
import {
  getImageList
} from '@/api/image'

// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
const list = ref([])
const loading = ref(false)
const imageClassId = ref(0)

// 获取数据
function getData(p) {
  if (typeof p === "number") {
    currentPage.value = p
  }

  loading.value = true
  getImageList(imageClassId.value, currentPage.value).then(res => {
    total.value = res.totalCount
    list.value = res.list
  }).finally(() => {
    loading.value = false
  })
}


// 根据分类ID重新加载图片列表
const loadData = (id) => {
  currentPage.value = 1
  imageClassId.value = id
  getData()
}

defineExpose({
  loadData
})

</script>

<style>
.image-main {
  position: relative;
}

.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}

::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

::-webkit-scrollbar-corner {
  display: block;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}

.image-title {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>