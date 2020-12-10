import request from '@/utils/request'

export function getBanners(params) {
  return request({
    url: '/admin/banner',
    method: 'get',
    params
  })
}
export function updateBanner(id,data) {
  return request({
    url: `/admin/banner/${id}`,
    method: 'put',
    data
  })
}
export function addBanner(data) {
  return request({
    url: '/admin/banner',
    method: 'post',
    data
  })
}
export function showBanner(id) {
  return request({
    url: `/admin/banner/${id}`,
    method: 'get',
  })
}
export function deleteBanner(data) {
  return request({
    url: `/admin/banner`,
    method: 'delete',
    data
  })
}
