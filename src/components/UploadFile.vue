<template>
  <el-upload class="upload-demo" drag :action="uploadImageAction" multiple :headers="{
    token
  }" name="img" :data="data" :on-success="uploadSuccess" :on-error="uploadError">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { uploadImageAction } from '@/api/image'
import { getToken } from "@/composables/auth"
const token = getToken()

defineProps({
  data: Object
})

const emit = defineEmits(["success"])

const uploadSuccess = (response, uploadFile, uploadFiles) => {
  emit('success', {
    response, uploadFile, uploadFiles
  })
}

const uploadError = (error, uploadFile, uploadFiles) => {

}
</script>