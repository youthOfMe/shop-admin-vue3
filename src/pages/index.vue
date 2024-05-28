<template>
  <div>
    <el-row :gutter="20">
      <template v-if="panels.length === 0">
        <el-col :span="6" v-for="i in 4">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%" />
                <el-divider />
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
              <el-skeleton-item variant="text" style="width: 30%" />
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <template v-if="panels.length !== 0">
        <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
          <el-card shadow="hover" :body-style="{ padding: '20px' }">
            <template #header>
              <div class="flex justify-between">
                <span class="text-sm">{{ item.title }}</span>
                <el-tag :type="item.unitColor || 'success'" effect="plain">
                  {{ item.unit }}
                </el-tag>
              </div>
            </template>
            <span class="text-3xl font-bold text-gray-500">
              <CountTo :value="item.value" />
            </span>
            <el-divider />
            <div class="flex justify-between text-sm text-gray-500">
              <span>{{ item.subTitle }}</span>
              <span>{{ item.subValue }}</span>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>

    <IndexNavs></IndexNavs>

    <el-row :gutter="20" class="mt-[20px]">
      <el-col :span="12" :offset="0">
        <IndexChart></IndexChart>
      </el-col>
      <el-col :span="12" :offset="0">
        <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods"></IndexCard>
        <IndexCard title="交易提示" tip="交易提示" :btns="order"></IndexCard>
      </el-col>
    </el-row>

    <div :style="{ color: color, width: outputWidth + 'px' }" style="background-color: #000000;">{{ output }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CountTo from '@/components/CountTo.vue'
import IndexNavs from '@/components/IndexNavs.vue'
import IndexCard from '@/layouts/components/IndexCard.vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import {
  getStatistics1,
  getStatistics2
} from '@/api/index'
import IndexChart from '../components/IndexChart.vue';

const panels = ref([])
getStatistics1().then(res => {
  panels.value = res.panels
})

const goods = ref([])
const order = ref([])
getStatistics2().then(res => {
  goods.value = res.goods
  order.value = res.order
})

// 测试
const source = ref(0)
const output = useTransition(source, {
  duration: 2000,
  transition: TransitionPresets.easeInOutCubic,
})
source.value = 999

const colorValue = ref([0, 0, 0])

// 使用三次贝塞尔曲线动画缓动
// const outputColor = useTransition(colorValue, {
//   duration: 5000,
//   transition: [0.75, 1, 1, 1],
// })

// 可以进行自定义动画缓动数学推导公式
function easeOutElastic(n) {
  return n === 0
    ? 0
    : n === 1
      ? 1
      : (2 ** (-10 * n)) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
}
const outputColor = useTransition(colorValue, {
  duration: 2000,
  transition: () => easeOutElastic(1),
  onStarted() {
    console.log('开始过渡')
  },
  onFinished() {
    console.log('结束过渡')
  }
})

colorValue.value = [255, 255, 255]

const color = computed(() => {
  const [r, g, b] = outputColor.value
  return `rgb(${r}, ${g}, ${b})`
})

// 使用三次贝塞尔曲线定义复杂的动画效果
const widthValue = ref(50)

const outputWidth = useTransition(widthValue, {
  duration: 2000,
  transition: [.33, 2.57, .7, -0.08],
})
widthValue.value = 500
</script>