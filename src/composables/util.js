import { ElNotification, ElMessageBox } from 'element-plus'

// 成功提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000
  })
}

export function showModal(content = "提示内容", type = "warning", title = "") {
  return ElMessageBox.confirm(
    title,
    content,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type
    }
  )
}