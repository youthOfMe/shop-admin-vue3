import axios from '@/axios'
import { queryParams } from '@/composables/util'

export function getGoodsCommentList(page, query = {}) {
  const r = queryParams(query)
  return axios.get(`/admin/manager/${page}${r}`)
}

export function updateGoodsCommentStatus(id, status) {
  return axios.post(`/admin/goods_comment/${id}/update_status`, { status })
}