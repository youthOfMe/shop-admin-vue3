<script setup>
</script>

<template>
  <!-- <button class="btn">按钮</button> -->
  <router-view></router-view>
</template>

<style>
/* .btn {
  @apply bg-purple-500 text-indigo-50 px-4 py-2 rounded-full 
  transition-all duration-500 hover:(bg-purple-900) focus:(ring-8 ring-purple-900);
} */
body {
  @apply bg-gray-100;
}

#nprogress .bar {
  background-color: #f4f4f4 !important;
  height: 3px !important;
}
</style>