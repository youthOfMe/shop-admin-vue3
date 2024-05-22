import { ref } from 'vue'
import {
  createGoodsSkusCard,
  updateGoodsSkusCard,
  deleteGoodsSkusCard,
  sortGoodsSkusCard
} from '@/api/goods'
import {
  useArrayMoveUp,
  useArrayMoveDown
} from '@/composables/util'

// 当前商品ID
export const goodsId = ref(0)

// 规格选项列表
export const sku_card_list = ref([])

// 初始化规格选项列表
export function initSkuCardList(d) {
  sku_card_list.value = d.goodsSkusCard.map(item => {
    item.text = item.name
    item.loading = false
    item.goodsSkusCardValue.map(v => {
      v.text = v.value || '属性值'
      return v
    })
    return item
  })
}

// 添加规格选项
export const btnLoading = ref(false)
export function addSkuCardEvent() {
  btnLoading.value = true
  createGoodsSkusCard({
    goods_id: goodsId.value,
    name: '规格选项',
    order: 50,
    type: 0
  }).then(res => {
    sku_card_list.value.push({
      ...res,
      text: res.name,
      loading: false,
      goodsSkusCardValue: []
    })
  }).finally(() => {
    btnLoading.value = false
  })
}

// 修改规格选项
export function handleUpdate(item) {
  item.loading = true
  updateGoodsSkusCard(item.id, {
    goods_id: item.goods_id,
    name: item.text,
    order: item.order,
    type: 0
  }).then(res => {
    item.name = item.text
  }).catch(err => {
    item.text = item.name
  }).finally(() => {
    item.loading = false
  })
}

// 删除规格选项
export function handleDelete(item) {
  item.loading = true
  deleteGoodsSkusCard(item.id).then(res => {
    const index = sku_card_list.value.findIndex(o => o.id === item.id)
    if (index !== -1) {
      sku_card_list.value.splice(index, 1)
    }
  })
}

// 排序规格选项
export const bodyLoading = ref(false)
export function sortCard(action, index) {
  let oList = JSON.parse(JSON.stringify(sku_card_list.value))
  const func = action === "up" ? useArrayMoveUp : useArrayMoveDown
  func(oList, index)

  const sortData = oList.map((object, index) => {
    return {
      id: object.id,
      order: index + 1
    }
  })

  bodyLoading.value = true
  sortGoodsSkusCard({
    sortdata: sortData
  }).then(res => {
    func(sku_card_list.value, index)
  }).finally(() => {
    bodyLoading.value = false
  })
}

// 初始化规格的值
export function initSkusCardItem(id) {
  const item = sku_card_list.value.find(o => o.id === id)
  return {
    item
  }
}