<template>
  <div class="aside-list" :class="{ 'active': active }">
    <span class="truncate">
      <slot></slot>
    </span>
    <el-button class="ml-auto" text type="primary" size="small" @click.stop="$emit('edit')">
      <el-icon :size="12">
        <Edit />
      </el-icon>
    </el-button>
    <!-- confirm.stop是没用的 只能在最外层嵌套一个span这样做才行 -->
    <span @click.stop="() => { }">
      <el-popconfirm title="是否要删除该分类?" confirmButtonText="确认" cancelButtonText="取消" @confirm.stop="$emit('delete')">
        <template #reference>
          <el-button text type="primary" size="small">
            <el-icon :size="12">
              <Close />
            </el-icon>
          </el-button>
        </template>
      </el-popconfirm>
    </span>
  </div>

</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;
}

.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>