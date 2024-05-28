<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增|刷新 -->
    <ListHeader layout="create,delete,refresh" @create="handleCreate" @refresh="getData" @delete="handleMultiDelete">
    </ListHeader>

    <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe
      style="width: 100%" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="规格名称" />
      <el-table-column prop="default" label="规格值" width="380" />
      <el-table-column prop="order" label="排序" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
            @change="handleStatusChange($event, row)" :loading="row.statusLoading" :disabled="row.super === 1">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <el-popconfirm title="是否要删除该规格?" confirmButtonText="确认" cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)">
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

    <FormDrawer destroyOnClose ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="form.name" placeholder="规格名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" placeholder="排序" type="textarea" :rows="5"></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="desc">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="规格值" prop="default">
          <TagInput v-model="form.default"></TagInput>
        </el-form-item>
      </el-form>

    </FormDrawer>

  </el-card>

</template>

<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import TagInput from '@/components/TagInput.vue'
import ListHeader from '@/components/ListHeader.vue'
import {
  getSkusList,
  createSkus,
  updateSkus,
  deleteSkus,
  updateSkusStatus,
} from '@/api/skus'

import {
  useInitTable,
  useInitForm
} from '@/composables/useCommon'

// 列表数据
const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange,
  handleSelectionChange,
  multipleTableRef,
  handleMultiDelete
} = useInitTable({
  getList: getSkusList,
  delete: deleteSkus,
  updateStatus: updateSkusStatus
})

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {
    name: '',
    status: 1,
    default: '',
    order: 50
  },
  rules: {
    name: [
      {
        required: true,
        message: '角色名称不能为空',
        trigger: 'blur'
      }
    ],
  },
  getData,
  update: updateSkus,
  create: createSkus
})


</script>