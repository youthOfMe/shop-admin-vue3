import axios from '@/axios'

export function login(username, password) {
  return axios.post('/admin/login', {
    username,
    password
  })
}

export function getInfo() {
  return axios.post('/admin/getInfo')
}

export function logout() {
  return axios.post("/admin/logout")
}

export function updatePassword(data) {
  return axios.post('/admin/updatepassword', data)
}

export function getManagerList(page, query = {}) {
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join('&')
  r = r ? ("?" + r) : ""

  return axios.get(`/admin/manager/${page}${r}`)
}