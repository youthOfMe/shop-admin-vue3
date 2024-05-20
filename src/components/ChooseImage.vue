<template>
  <div v-if="modelValue">
    <el-image :src="modelValue" fit="cover" :lazy="true" class="w-[100px] h-[100px] rounded mr-2 mt-3"></el-image>
  </div>

  <div class="choose-image-btn" @click="open">
    <el-icon>
      <Plus />
    </el-icon>
  </div>
  <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
    <el-container class="bg-white rounded" style="height: 70vh;">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
        <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
      </el-header>
      <el-container>
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange"></ImageAside>
        <ImageMain openChoose ref="ImageMainRef" @choose="handleChoose"></ImageMain>
      </el-container>
    </el-container>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup>
import { ref } from 'vue'
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'


const dialogVisible = ref(false)

const open = () => {
  dialogVisible.value = true
}

const ImageAsideRef = ref(null)
const handleOpenCreate = () => {
  ImageAsideRef.value.handleOpenCreate()
}

const ImageMainRef = ref(null)
const handleAsideChange = (imageClassId) => {
  ImageMainRef.value.loadData(imageClassId)
}

const handleOpenUpload = () => ImageMainRef.value.openUploadFile()

// 实现v-model的功能
const props = defineProps({
  modelValue: [String, Array]
})
const emit = defineEmits(["update:modelValue"])

// 选中图库的图片
let urls = []
const handleChoose = (e) => {
  urls = e.map(o => o.url)
}

const submit = () => {
  if (urls.length) {
    emit("update:modelValue", urls[0])
  }

}

</script>

<style>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}

.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}

.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}
</style>