<template>
  <el-form-item label="规格选项">
    <el-card shadow="never" class="w-full mb-3" v-for="(item, index) in sku_card_list" :key="item.id">
      <template #header>
        <div class="flex items-center">
          <el-input v-model="item.text" placeholder="规格名称" style="width: 200px;">
            <template #append>
              <el-icon>
                <more />
              </el-icon>
            </template>
          </el-input>
          <el-button size="small">
            <el-icon>
              <Top></Top>
            </el-icon>
          </el-button>
          <el-button size="small"><el-icon>
              <Bottom />
            </el-icon></el-button>
          <el-button size="small"><el-icon>
              <Delete />
            </el-icon></el-button>
        </div>
      </template>
      <SkuCardItem :skuCardId="item.id" />
    </el-card>
    <el-button type="success">添加规格</el-button>
  </el-form-item>
</template>

<script setup>
import SkuCardItem from './SkuCardItem.vue'
import {
  sku_card_list
} from '@/composables/useSku'
</script>