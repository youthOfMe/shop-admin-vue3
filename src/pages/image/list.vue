<template>
  <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
    <el-header class="image-header">Header</el-header>
    <el-container>
      <el-aside width="220px" class="image-aside">
        <div class="top">
          <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <div class="bottom">
          分页区域
        </div>
      </el-aside>
      <el-main class="image-main">
        <!-- <div class="top">
          <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <div class="bottom">
          分页区域
        </div> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40
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

.image-main {
  position: relative;
}

.image-aside .top,
.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom,
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
</style>