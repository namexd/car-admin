import request from '@/utils/request'

export function getCommissionConfig(params) {
  return request({
    url: '/admin/commission-config',
    method: 'get',
    params
  })
}
export function updateCommissionConfig(data) {
  return request({
    url: '/admin/commission-config',
    method: 'put',
    data
  })
}
export function getCommissionOrders(params) {
  return request({
    url: '/admin/commission/order',
    method: 'get',
    params
  })
}
export function getCommissionWithdraw(params) {
  return request({
    url: '/admin/commission/withdraw',
    method: 'get',
    params
  })
}
export function updateCommissionWithdraw(id,data) {
  return request({
    url: '/admin/commission/withdraw/'+id,
    method: 'put',
    data
  })
}
