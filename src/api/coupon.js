import request from '@/utils/request'

export function getCoupons(params) {
  return request({
    url: '/admin/coupon',
    method: 'get',
    params
  })
}
export function updateCoupon(id,data) {
  return request({
    url: `/admin/coupon/${id}`,
    method: 'put',
    data
  })
}
export function addCoupon(data) {
  return request({
    url: '/admin/coupon',
    method: 'post',
    data
  })
}
export function showCoupon(id) {
  return request({
    url: `/admin/coupon/${id}`,
    method: 'get',
  })
}
export function deleteCoupon(data) {
  return request({
    url: `/admin/coupon`,
    method: 'delete',
    data
  })
}
