import request from '@/utils/request'

export function getProducts(params) {
  return request({
    url: '/admin/product',
    method: 'get',
    params
  })
}
export function updateProduct(id,data) {
  return request({
    url: `/admin/product/${id}`,
    method: 'put',
    data
  })
}
export function productShow(id) {
  return request({
    url: `/admin/product/${id}/show`,
    method: 'put',
  })
}
export function addProduct(data) {
  return request({
    url: '/admin/product',
    method: 'post',
    data
  })
}
export function showProduct(id) {
  return request({
    url: `/admin/product/${id}`,
    method: 'get',
  })
}
export function deleteProduct(id) {
  return request({
    url: `/admin/product/${id}`,
    method: 'delete',
  })
}
