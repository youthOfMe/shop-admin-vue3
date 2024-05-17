<template>
  <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
      <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
    </el-header>
    <el-container>
      <ImageAside ref="ImageAsideRef" @change="handleAsideChange"></ImageAside>
      <ImageMain ref="ImageMainRef"></ImageMain>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'

const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40

const ImageAsideRef = ref(null)
const handleOpenCreate = () => {
  ImageAsideRef.value.handleOpenCreate()
}

const ImageMainRef = ref(null)
const handleAsideChange = (imageClassId) => {
  ImageMainRef.value.loadData(imageClassId)
}

const handleOpenUpload = () => ImageMainRef.value.openUploadFile()
</script>

<style scoped>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}

.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}
</style>