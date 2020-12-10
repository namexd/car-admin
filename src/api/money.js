import request from '@/utils/request'

export function getMoneyOrders(params) {
  return request({
    url: '/admin/money-manage/order',
    method: 'get',
    params
  })
}
export function getMoneyReturns(params) {
  return request({
    url: '/admin/money-manage/return',
    method: 'get',
    params
  })
}
export function putMoneyReturn(id) {
  return request({
    url: '/admin/money-manage/return/'+id,
    method: 'put',
  })
}
export function getMoneyLogs(params) {
  return request({
    url: '/admin/money-manage/log',
    method: 'get',
    params
  })
}
