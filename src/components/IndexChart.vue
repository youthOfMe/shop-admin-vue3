<template>
  <el-card shadow="never" :body-style="{ padding: '20px' }">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">订单统计</span>
        <div>
          <el-check-tag v-for="(item, index) in options" :key="index" :checked="current === item.value"
            style="margin-right: 8px;" @click="handleChoose(item.value)">{{ item.text
            }}</el-check-tag>
        </div>
      </div>
    </template>
    <div ref="el" id="chart" style="width: 100%; height: 300px;"></div>

  </el-card>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { useResizeObserver } from '@vueuse/core'

import {
  getStatistics3
} from '@/api/index'

const current = ref("week")
const options = [
  {
    text: "近1个月",
    value: "month"
  },
  {
    text: "近1周",
    value: "week"
  },
  {
    text: "近24小时",
    value: "hour"
  },
]

const handleChoose = (type) => {
  current.value = type
  getData()
}

let myChart = null
onMounted(() => {
  const chartDom = document.getElementById('chart')
  if (chartDom) {
    myChart = echarts.init(chartDom)
    getData()
  }
})

onBeforeUnmount(() => {
  if (myChart) {
    echarts.dispose(myChart)
  }
})

function getData() {
  let option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar'
      }
    ]
  }

  myChart.showLoading()
  getStatistics3(current.value).then(res => {
    option.xAxis.data = res.x
    option.series[0].data = res.y
    myChart.setOption(option)
  }).finally(() => {
    myChart.hideLoading()
  })

}

const el = ref(null)
useResizeObserver(el, (entries) => {
  if (myChart) {
    myChart.resize()
  }
})
</script>