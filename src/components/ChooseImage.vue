<template>
  <div v-if="modelValue && preview">
    <el-image v-if="typeof modelValue === 'string'" :src="modelValue" fit="cover" :lazy="true"
      class="w-[100px] h-[100px] rounded mr-2 mt-3"></el-image>
    <div v-else class="flex flex-wrap h-[100px]">
      <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url, index) in modelValue" :key="index">
        <el-icon class="absolute right-[5px] top-[15px] cursor-pointer bg-white rounded-full" style="z-index: 10;"
          @click="removeImage(url)">
          <CircleClose></CircleClose>
        </el-icon>
        <el-image :src="url" fit="cover" :lazy="true" class="w-[100px] h-[100px] rounded mr-2"></el-image>
      </div>
    </div>
  </div>

  <div v-if="preview" class="choose-image-btn" @click="open">
    <el-icon :size="25" class="text-gray-500">
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
        <ImageMain :limit="limit" openChoose ref="ImageMainRef" @choose="handleChoose"></ImageMain>
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
import { toast } from '@/composables/util'

const dialogVisible = ref(false)

const callbackFunction = ref(null)
const open = (callback = null) => {
  callbackFunction.value = callback
  dialogVisible.value = true
}
const close = () => dialogVisible.value = false

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
  modelValue: [String, Array],
  limit: {
    type: Number,
    default: 1
  },
  preview: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(["update:modelValue"])

// 选中图库的图片
let urls = []
const handleChoose = (e) => {
  urls = e.map(o => o.url)
}

const submit = () => {
  let value = []
  if (props.limit === 1) {
    value = urls[0]
  } else {
    value = props.preview ? [...props.modelValue, ...urls] : [...urls]
    if (value.length > props.limit) {
      let limit = props.preview ? (props.limit - props.modelValue.length) : props.limit
      return toast('最多还能选择' + limit + '张')
    }
  }
  if (value && props.preview) {
    emit("update:modelValue", value)
  }
  if (!props.preview && typeof callbackFunction.value === 'function') {
    callbackFunction.value(value)
  }

  close()
}

const removeImage = (url) => {
  emit("update:modelValue", props.modelValue.filter(u => u !== url))
}

defineExpose({
  open
})
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