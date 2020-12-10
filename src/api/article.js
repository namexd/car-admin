import request from '@/utils/request'

export function getArticles(params) {
  return request({
    url: '/admin/article',
    method: 'get',
    params
  })
}
export function updateArticle(id,data) {
  return request({
    url: `/admin/article/${id}`,
    method: 'put',
    data
  })
}
export function addArticle(data) {
  return request({
    url: '/admin/article',
    method: 'post',
    data
  })
}
export function showArticle(id) {
  return request({
    url: `/admin/article/${id}`,
    method: 'get',
  })
}
export function deleteArticle(data) {
  return request({
    url: `/admin/article`,
    method: 'delete',
    data
  })
}
