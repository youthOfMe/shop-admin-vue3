import { ref, nextTick } from 'vue'
import {
  createGoodsSkusCard,
  updateGoodsSkusCard,
  deleteGoodsSkusCard,
  sortGoodsSkusCard,
  createGoodsSkusCardValue,
  updateGoodsSkusCardValue,
  deleteGoodsSkusCardValue,
  chooseAndSetGoodsSkusCard
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

// 选择设置规格
export function handleChooseSetGoodsSkusCard(id, data) {
  const item = sku_card_list.value.find(o => o.id === id)
  item.loading = true
  chooseAndSetGoodsSkusCard(id, data).then(res => {
    item.name = item.text = res.goods_skus_card.name
    item.goodsSkusCardValue = res.goods_skus_card_value.map(o => {
      o.text = o.value || '属性值'
      return o
    })
  }).finally(() => {
    item.loading = false
  })
}

// 初始化规格的值
export function initSkusCardItem(id) {
  const item = sku_card_list.value.find(o => o.id === id)

  const inputValue = ref('')
  const inputVisible = ref(false)
  const InputRef = ref()

  const handleClose = (tag) => {
    loading.value = true
    deleteGoodsSkusCardValue(tag.id).then(res => {
      let index = item.goodsSkusCardValue.findIndex(o => o.id === tag.id)
      if (index != -1) {
        item.goodsSkusCardValue.splice(index, 1)
      }
    }).finally(() => {
      loading.value = false
    })
  }

  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value.input.focus()
    })
  }

  const loading = ref(false)
  const handleInputConfirm = () => {
    if (!inputValue.value) {
      inputVisible.value = false
      return
    }

    loading.value = true
    createGoodsSkusCardValue({
      goods_skus_card_id: id,
      name: item.name,
      order: 50,
      value: inputValue.value
    }).then(res => {
      item.goodsSkusCardValue.push({
        ...res,
        text: res.value
      })
    }).finally(() => {
      inputVisible.value = false
      inputValue.value = ''
      loading.value = false
    })

  }

  const handleChange = (value, tag) => {
    loading.value = true
    updateGoodsSkusCardValue(tag.id, {
      goods_skus_card_id: id,
      name: item.name,
      order: tag.order,
      value: value
    }).then(res => {
      tag.value = value
    }).catch(() => {
      tag.text = tag.value
    }).finally(() => {
      loading.value = false
    })
  }

  return {
    item,
    inputValue,
    inputVisible,
    InputRef,
    handleClose,
    showInput,
    handleInputConfirm,
    loading,
    handleChange
  }
}